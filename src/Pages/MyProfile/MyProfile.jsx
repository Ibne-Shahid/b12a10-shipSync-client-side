import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../Provider/AuthProvider'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Link } from 'react-router'

const MyProfile = () => {
    const { user, updateUser } = use(AuthContext)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [userData, setUserData] = useState({
        displayName: '',
        email: '',
        phone: '',
        address: '',
        photoURL: ''
    })
    const [userProducts, setUserProducts] = useState([])
    const [userImports, setUserImports] = useState([])

    useEffect(() => {
        if (user) {
            setUserData({
                displayName: user.displayName || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
                address: '',
                photoURL: user.photoURL || ''
            })
            fetchUserData()
        }
    }, [user])

    const fetchUserData = async () => {
        try {
            const productsRes = await fetch(`https://ship-synce-api-server.vercel.app/products?email=${user.email}`)
            const productsData = await productsRes.json()
            setUserProducts(productsData)

            const importsRes = await fetch(`https://ship-synce-api-server.vercel.app/imports?email=${user.email}`)
            const importsData = await importsRes.json()
            
            const allProductsRes = await fetch('https://ship-synce-api-server.vercel.app/products')
            const allProducts = await allProductsRes.json()
            
            const mergedImports = importsData.map(importItem => {
                const product = allProducts.find(p => p._id === importItem.product)
                return {
                    ...importItem,
                    productDetails: product
                }
            })
            setUserImports(mergedImports)
            
        } catch (error) {
            console.error('Error fetching user data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSaveProfile = async () => {
        try {
            await updateUser({
                displayName: userData.displayName,
                photoURL: userData.photoURL
            })
            toast.success('Profile updated successfully!')
            setIsEditing(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-info"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please login to view your profile</h2>
                    <a href="/login" className="btn btn-info">Login</a>
                </div>
            </div>
        )
    }

    const totalExportValue = userProducts.reduce((sum, product) => 
        sum + (parseFloat(product.price) || 0) * (parseInt(product.available_quantity) || 0), 0
    )

    const totalImportValue = userImports.reduce((sum, item) => 
        item.productDetails ? 
        sum + (parseFloat(item.productDetails.price) || 0) * (parseInt(item.importing_quantity) || 0) : 
        sum, 0
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="h-1 w-8 bg-info rounded-full"></div>
                        <span className="text-info font-medium">User Profile</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent">
                        My Profile
                    </h1>
                    <p className="text-base-content/70">Manage your personal information and track your activities</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Card */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="card-title text-2xl font-bold">Personal Information</h2>
                                    <button 
                                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                        className="btn btn-info btn-sm"
                                    >
                                        {isEditing ? (
                                            <>
                                                <FaSave className="mr-2" />
                                                Save Changes
                                            </>
                                        ) : (
                                            <>
                                                <FaEdit className="mr-2" />
                                                Edit Profile
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* Profile Picture */}
                                    <div className="relative">
                                        <div className="avatar">
                                            <div className="w-32 h-32 rounded-full border-4 border-base-300">
                                                {userData.photoURL ? (
                                                    <img src={userData.photoURL} alt="Profile" />
                                                ) : (
                                                    <div className="flex items-center justify-center w-full h-full bg-info/20">
                                                        <FaUser className="text-4xl text-info" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {isEditing && (
                                            <input
                                                type="text"
                                                name="photoURL"
                                                value={userData.photoURL}
                                                onChange={handleInputChange}
                                                placeholder="Enter image URL"
                                                className="input input-bordered input-sm mt-2 w-full"
                                            />
                                        )}
                                    </div>

                                    {/* Profile Details */}
                                    <div className="flex-1 space-y-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold flex items-center">
                                                    <FaUser className="mr-2" />
                                                    Full Name
                                                </span>
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="displayName"
                                                    value={userData.displayName}
                                                    onChange={handleInputChange}
                                                    className="input input-bordered"
                                                    placeholder="Enter your name"
                                                />
                                            ) : (
                                                <p className="text-lg font-medium">{userData.displayName || 'Not set'}</p>
                                            )}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold flex items-center">
                                                    <FaEnvelope className="mr-2" />
                                                    Email Address
                                                </span>
                                            </label>
                                            <p className="text-lg font-medium">{userData.email}</p>
                                            <p className="text-sm text-base-content/60">Email cannot be changed</p>
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold flex items-center">
                                                    <FaPhone className="mr-2" />
                                                    Phone Number
                                                </span>
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={userData.phone}
                                                    onChange={handleInputChange}
                                                    className="input input-bordered"
                                                    placeholder="Enter phone number"
                                                />
                                            ) : (
                                                <p className="text-lg font-medium">{userData.phone || 'Not set'}</p>
                                            )}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold flex items-center">
                                                    <FaMapMarkerAlt className="mr-2" />
                                                    Address
                                                </span>
                                            </label>
                                            {isEditing ? (
                                                <textarea
                                                    name="address"
                                                    value={userData.address}
                                                    onChange={handleInputChange}
                                                    className="textarea textarea-bordered"
                                                    placeholder="Enter your address"
                                                    rows="3"
                                                />
                                            ) : (
                                                <p className="text-lg font-medium">{userData.address || 'Not set'}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activity Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Exports Card */}
                            <div className="card bg-gradient-to-br from-info/10 to-base-100 border border-info/20">
                                <div className="card-body">
                                    <h3 className="card-title text-lg font-bold text-info mb-4">Export Statistics</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/70">Total Products</span>
                                            <span className="font-bold text-info text-xl">{userProducts.length}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/70">Total Value</span>
                                            <span className="font-bold text-success text-xl">
                                                ৳{totalExportValue.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/70">Avg. Rating</span>
                                            <span className="font-bold text-warning text-xl">
                                                {userProducts.length > 0 
                                                    ? (userProducts.reduce((sum, p) => sum + (parseFloat(p.rating) || 0), 0) / userProducts.length).toFixed(1)
                                                    : '0.0'
                                                } ⭐
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-actions mt-4">
                                        <a href="/my-export" className="btn btn-info btn-sm w-full">
                                            View All Exports
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Imports Card */}
                            <div className="card bg-gradient-to-br from-success/10 to-base-100 border border-success/20">
                                <div className="card-body">
                                    <h3 className="card-title text-lg font-bold text-success mb-4">Import Statistics</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/70">Total Imports</span>
                                            <span className="font-bold text-success text-xl">{userImports.length}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/70">Total Value</span>
                                            <span className="font-bold text-success text-xl">
                                                ৳{totalImportValue.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/70">Countries</span>
                                            <span className="font-bold text-accent text-xl">
                                                {[...new Set(userImports.filter(i => i.productDetails).map(i => i.productDetails.origin_country))].length}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-actions mt-4">
                                        <a href="/my-import" className="btn btn-success btn-sm w-full">
                                            View All Imports
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Quick Info */}
                    <div className="space-y-8">
                        {/* Account Status */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-lg font-bold mb-4">Account Status</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-base-content/70">Member Since</span>
                                        <span className="font-medium">
                                            {user.metadata?.creationTime 
                                                ? new Date(user.metadata.creationTime).toLocaleDateString()
                                                : 'Recently'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-base-content/70">Last Login</span>
                                        <span className="font-medium">
                                            {user.metadata?.lastSignInTime 
                                                ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                                                : 'Today'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-base-content/70">Email Verified</span>
                                        <span className={`badge ${user.emailVerified ? 'badge-success' : 'badge-warning'}`}>
                                            {user.emailVerified ? 'Verified' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-lg font-bold mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {userProducts.slice(0, 3).map((product, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded">
                                                    <img src={product.product_image} alt={product.product_name} />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm line-clamp-1">{product.product_name}</p>
                                                <p className="text-xs text-base-content/60">Exported</p>
                                            </div>
                                        </div>
                                    ))}
                                    {userProducts.length === 0 && (
                                        <p className="text-base-content/60 text-center py-4">No recent activity</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="card bg-gradient-to-br from-info/10 to-accent/10 border border-info/20">
                            <div className="card-body">
                                <h3 className="card-title text-lg font-bold mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Link to="/dashboard/exportProducts" className="btn btn-info btn-block">Export New Product</Link>
                                    <Link to="/allProducts" className="btn btn-outline btn-info btn-block">Browse Products</Link>
                                    <Link to="/dashboard" className="btn btn-accent btn-block">Go to Dashboard</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Products Table */}
                {userProducts.length > 0 && (
                    <div className="card bg-base-100 shadow-xl mt-8">
                        <div className="card-body">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="card-title text-lg font-bold">Recent Exported Products</h3>
                                <Link to="/dashboard/myExports" className="btn btn-info btn-sm">View All</Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Country</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Rating</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userProducts.slice(0, 5).map((product, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={product.product_image} alt={product.product_name} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold line-clamp-1">{product.product_name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{product.origin_country}</td>
                                                <td className="font-bold text-success">৳{product.price}</td>
                                                <td>
                                                    <span className={`badge ${parseInt(product.available_quantity) > 20 ? 'badge-success' : parseInt(product.available_quantity) > 10 ? 'badge-warning' : 'badge-error'}`}>
                                                        {product.available_quantity} units
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <span className="text-yellow-500 mr-1">⭐</span>
                                                        {product.rating}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-info badge-sm">
                                                        Active
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyProfile