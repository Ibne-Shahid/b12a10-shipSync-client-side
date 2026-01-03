import React, { useState, useEffect } from 'react'
import { use } from 'react'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast } from 'react-toastify'
import { FaInbox, FaBell, FaCheckDouble, FaTrash, FaExternalLinkAlt } from 'react-icons/fa'

const InboxPage = () => {
    const { user } = use(AuthContext)
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        if (user?.email) {
            fetchNotifications()
            const interval = setInterval(fetchNotifications, 30000)
            return () => clearInterval(interval)
        }
    }, [user])

    const fetchNotifications = async () => {
        try {
            const productsRes = await fetch('https://ship-synce-api-server.vercel.app/products')
            const productsData = await productsRes.json()
            
            const othersProducts = productsData.filter(p => p.exporter_email !== user.email)
            
            const userNotifications = othersProducts.map(product => ({
                id: product._id,
                type: 'NEW_PRODUCT',
                title: 'New Product Available',
                message: `${product.product_name} is now available for import`,
                productId: product._id,
                productImage: product.product_image,
                productName: product.product_name,
                exporterEmail: product.exporter_email,
                price: product.price,
                originCountry: product.origin_country,
                timestamp: product.created_at || product.updated_at,
                read: false
            }))

            const storedNotifications = JSON.parse(localStorage.getItem(`shipSync_notifications_${user.email}`)) || []
            
            const newNotifications = userNotifications.filter(newNotif => 
                !storedNotifications.some(stored => stored.id === newNotif.id)
            )
            
            const allNotifications = [...newNotifications, ...storedNotifications]
            
            allNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            
            setNotifications(allNotifications)
            setUnreadCount(allNotifications.filter(n => !n.read).length)
            
            if (newNotifications.length > 0) {
                toast.info(`You have ${newNotifications.length} new products!`)
                localStorage.setItem(`shipSync_notifications_${user.email}`, JSON.stringify(allNotifications))
            }
            
        } catch (error) {
            console.error('Error fetching notifications:', error)
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = (id) => {
        const updatedNotifications = notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
        )
        setNotifications(updatedNotifications)
        setUnreadCount(updatedNotifications.filter(n => !n.read).length)
        localStorage.setItem(`shipSync_notifications_${user.email}`, JSON.stringify(updatedNotifications))
    }

    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }))
        setNotifications(updatedNotifications)
        setUnreadCount(0)
        localStorage.setItem(`shipSync_notifications_${user.email}`, JSON.stringify(updatedNotifications))
        toast.success('All notifications marked as read')
    }

    const deleteNotification = (id) => {
        const updatedNotifications = notifications.filter(notif => notif.id !== id)
        setNotifications(updatedNotifications)
        setUnreadCount(updatedNotifications.filter(n => !n.read).length)
        localStorage.setItem(`shipSync_notifications_${user.email}`, JSON.stringify(updatedNotifications))
        toast.info('Notification deleted')
    }

    const getTimeAgo = (timestamp) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now - date
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 60) {
            return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
        } else if (diffHours < 24) {
            return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
        } else if (diffDays < 30) {
            return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
        } else {
            return date.toLocaleDateString()
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex justify-center items-center pt-20">
                <div className="loading loading-spinner loading-lg text-info"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 pt-20 px-4 lg:px-8">
            <title>Notifications || ShipSync</title>
            
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 lg:mb-12">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8 mb-6">
                        <div className="flex items-center gap-4 lg:gap-6">
                            <div className="relative">
                                <FaInbox className="text-3xl lg:text-4xl text-info" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-2 -right-2 badge badge-error badge-sm lg:badge-md">
                                        {unreadCount}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent">
                                    Inbox & Notifications
                                </h1>
                                <p className="text-sm lg:text-base text-base-content/70 mt-1 lg:mt-2">Stay updated with new products from global exporters</p>
                            </div>
                        </div>
                        
                        {unreadCount > 0 && (
                            <div className="lg:self-start">
                                <button 
                                    onClick={markAllAsRead}
                                    className="btn btn-info btn-sm lg:btn-md w-full lg:w-auto"
                                >
                                    <FaCheckDouble className="mr-2" />
                                    Mark All Read
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
                    <div className="card bg-base-100 shadow-lg lg:shadow-xl">
                        <div className="card-body p-4 lg:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs lg:text-sm text-base-content/70">Total Notifications</p>
                                    <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-info">{notifications.length}</p>
                                </div>
                                <div className="rounded-full bg-info/20 p-2 lg:p-3">
                                    <FaInbox className="text-info text-lg lg:text-xl xl:text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg lg:shadow-xl">
                        <div className="card-body p-4 lg:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs lg:text-sm text-base-content/70">Unread</p>
                                    <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-warning">{unreadCount}</p>
                                </div>
                                <div className="rounded-full bg-warning/20 p-2 lg:p-3">
                                    <FaBell className="text-warning text-lg lg:text-xl xl:text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg lg:shadow-xl">
                        <div className="card-body p-4 lg:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs lg:text-sm text-base-content/70">Latest Update</p>
                                    <p className="text-lg lg:text-xl xl:text-2xl font-bold truncate">
                                        {notifications.length > 0 
                                            ? getTimeAgo(notifications[0].timestamp) 
                                            : 'No updates'
                                        }
                                    </p>
                                </div>
                                <div className="rounded-full bg-success/20 p-2 lg:p-3">
                                    <FaCheckDouble className="text-success text-lg lg:text-xl xl:text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl lg:shadow-2xl overflow-hidden">
                    <div className="card-body p-0">
                        {notifications.length === 0 ? (
                            <div className="text-center py-12 lg:py-20">
                                <div className="mb-4 lg:mb-6">
                                    <FaInbox className="text-5xl lg:text-6xl xl:text-7xl mx-auto text-base-300" />
                                </div>
                                <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3">Inbox Empty</h3>
                                <p className="text-base-content/70 mb-4 lg:mb-6 px-4">No notifications yet</p>
                                <p className="text-xs lg:text-sm text-base-content/60 px-4 max-w-md mx-auto">
                                    New products from global exporters will appear here automatically
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-base-300">
                                {notifications.map((notification) => (
                                    <div 
                                        key={notification.id} 
                                        className={`p-4 lg:p-6 xl:p-8 hover:bg-base-200 transition-colors ${!notification.read ? 'bg-info/5 border-l-4 border-info' : ''}`}
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                                            <div className="flex items-start gap-4 lg:gap-6">
                                                <div className="avatar flex-shrink-0">
                                                    <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-lg lg:rounded-xl overflow-hidden">
                                                        <img 
                                                            src={notification.productImage} 
                                                            alt={notification.productName}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="lg:hidden flex-1">
                                                    <div className="mb-2">
                                                        <h3 className="font-bold text-base lg:text-lg xl:text-xl line-clamp-1">
                                                            {notification.productName}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                                            <span className="badge badge-info badge-xs lg:badge-sm">
                                                                {notification.originCountry}
                                                            </span>
                                                            <span className="badge badge-success badge-xs lg:badge-sm">
                                                                ৳{notification.price}
                                                            </span>
                                                            <span className="text-xs lg:text-sm text-base-content/60">
                                                                {getTimeAgo(notification.timestamp)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-base-content/80 mb-3">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="hidden lg:block flex-1">
                                                <div className="flex justify-between items-start mb-2 lg:mb-3">
                                                    <div>
                                                        <h3 className="font-bold text-lg lg:text-xl xl:text-2xl">
                                                            {notification.productName}
                                                        </h3>
                                                        <div className="flex items-center gap-3 mt-1 lg:mt-2">
                                                            <span className="badge badge-info badge-sm lg:badge-md">
                                                                {notification.originCountry}
                                                            </span>
                                                            <span className="badge badge-success badge-sm lg:badge-md">
                                                                ৳{notification.price}
                                                            </span>
                                                            <span className="text-xs lg:text-sm text-base-content/60">
                                                                {getTimeAgo(notification.timestamp)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {!notification.read && (
                                                        <span className="badge badge-info badge-sm lg:badge-md">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-base-content/80 text-sm lg:text-base mb-4">
                                                    {notification.message}
                                                </p>
                                            </div>

                                            <div className="w-full lg:w-auto lg:self-center">
                                                <div className="flex flex-wrap gap-2 lg:gap-3">
                                                    <a 
                                                        href={`/productDetails/${notification.productId}`}
                                                        className="btn btn-info btn-xs lg:btn-sm xl:btn-md flex-1 lg:flex-none min-w-[120px] lg:min-w-[140px]"
                                                    >
                                                        <FaExternalLinkAlt className="mr-1 lg:mr-2" />
                                                        <span className="lg:hidden">View Product</span>
                                                        <span className="hidden lg:inline">View Details</span>
                                                    </a>
                                                    
                                                    {!notification.read && (
                                                        <button 
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="btn btn-ghost btn-xs lg:btn-sm xl:btn-md flex-1 lg:flex-none"
                                                        >
                                                            <span className="lg:hidden">Mark Read</span>
                                                            <span className="hidden lg:inline">Mark as Read</span>
                                                        </button>
                                                    )}
                                                    
                                                    <button 
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="btn btn-ghost btn-xs lg:btn-sm xl:btn-md text-error hover:text-error flex-1 lg:flex-none"
                                                    >
                                                        <FaTrash className="mr-1 lg:mr-2" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 lg:mt-8 xl:mt-12 p-4 lg:p-6 xl:p-8 bg-base-100 rounded-xl lg:rounded-2xl">
                    <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mb-3 lg:mb-4 flex items-center">
                        <FaBell className="mr-2 lg:mr-3 text-info text-base lg:text-lg" />
                        How It Works
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                        <div className="flex items-start p-3 lg:p-4 rounded-lg bg-base-200">
                            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-info rounded-full mt-1.5 lg:mt-2 mr-3 lg:mr-4 flex-shrink-0"></div>
                            <div>
                                <p className="font-medium text-sm lg:text-base mb-1">Real-time Detection</p>
                                <p className="text-xs lg:text-sm text-base-content/70">Automatically detects new products from other exporters</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 lg:p-4 rounded-lg bg-base-200">
                            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-info rounded-full mt-1.5 lg:mt-2 mr-3 lg:mr-4 flex-shrink-0"></div>
                            <div>
                                <p className="font-medium text-sm lg:text-base mb-1">Automatic Updates</p>
                                <p className="text-xs lg:text-sm text-base-content/70">Checks for updates every 30 seconds in real-time</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 lg:p-4 rounded-lg bg-base-200">
                            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-info rounded-full mt-1.5 lg:mt-2 mr-3 lg:mr-4 flex-shrink-0"></div>
                            <div>
                                <p className="font-medium text-sm lg:text-base mb-1">Smart Filtering</p>
                                <p className="text-xs lg:text-sm text-base-content/70">Your own products are intelligently filtered out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InboxPage