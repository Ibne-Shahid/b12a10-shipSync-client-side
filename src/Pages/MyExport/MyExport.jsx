import React, { use, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast } from 'react-toastify'
import ExportedProductCard from '../../components/ExportedProductCard/ExportedProductCard'
import Swal from 'sweetalert2'

const MyExport = () => {
    const { user } = use(AuthContext)
    const [exports, setExports] = useState([])
    const [loading, setLoading] = useState(true)
    const [sortOption, setSortOption] = useState('newest')
    const [searchTerm, setSearchTerm] = useState('')
    const importModalRef = useRef(null)

    const handleModal = () => {
        importModalRef.current.showModal()
    }

    useEffect(() => {
        if (user?.email) {
            setLoading(true)
            fetch(`https://ship-synce-api-server.vercel.app/products?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setExports(data)
                    setLoading(false)
                })
                .catch(err => {
                    toast.error(err.message)
                })
        }
    }, [user])

    const handleRemoveExport = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://ship-synce-api-server.vercel.app/products/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your export product has been deleted.",
                                icon: "success"
                            });
                            const remainingProducts = exports.filter(prev => prev?._id !== _id)
                            setExports(remainingProducts)
                        }
                    })
            }
        })
    }

    // Filter and sort exports
    const filteredExports = exports
        .filter(product => 
            product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.origin_country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortOption) {
                case 'price-high':
                    return parseFloat(b.price) - parseFloat(a.price)
                case 'price-low':
                    return parseFloat(a.price) - parseFloat(b.price)
                case 'quantity-high':
                    return parseInt(b.available_quantity) - parseInt(a.available_quantity)
                case 'rating-high':
                    return parseFloat(b.rating) - parseFloat(a.rating)
                default:
                    return new Date(b._id) - new Date(a._id) // Newest first
            }
        })

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 py-8 px-4 md:px-6 lg:px-8">
            <title>My Exported Products || ShipSync</title>
            
            <div className="max-w-7xl mx-auto">
                {/* Header Section with Stats */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mb-10">
                        <div className="flex-1">
                            <div className="inline-flex items-center bg-info/10 text-info px-4 py-2 rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium">Exporter Dashboard</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent">
                                My Exported Products
                            </h1>
                            <p className="text-lg opacity-90 max-w-3xl">
                                Manage, update, and track all your exported products. Monitor performance and optimize your global trade.
                            </p>
                        </div>
                        
                        {exports.length > 0 && (
                            <div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-base-100 border border-base-300">
                                <div className="stat">
                                    <div className="stat-figure text-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                    </div>
                                    <div className="stat-title">Active Listings</div>
                                    <div className="stat-value text-info">{exports.length}</div>
                                    <div className="stat-desc">Live products</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats Cards */}
                    {exports.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="card bg-gradient-to-br from-base-100 to-base-200 border border-info/20 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="card-body p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-info">Total Value</h3>
                                            <p className="text-3xl font-bold mt-2">
                                                ${exports.reduce((sum, item) => 
                                                    sum + (parseFloat(item.price) || 0) * (parseInt(item.available_quantity) || 0), 0
                                                ).toLocaleString('en-US', {minimumFractionDigits: 2})}
                                            </p>
                                        </div>
                                        <div className="rounded-full bg-info/20 p-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-gradient-to-br from-base-100 to-base-200 border border-success/20 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="card-body p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-success">Total Stock</h3>
                                            <p className="text-3xl font-bold mt-2">
                                                {exports.reduce((sum, item) => sum + (parseInt(item.available_quantity) || 0), 0).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="rounded-full bg-success/20 p-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-gradient-to-br from-base-100 to-base-200 border border-accent/20 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="card-body p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-accent">Avg. Rating</h3>
                                            <p className="text-3xl font-bold mt-2 flex items-center">
                                                {exports.length > 0 
                                                    ? (exports.reduce((sum, item) => sum + (parseFloat(item.rating) || 0), 0) / exports.length).toFixed(1)
                                                    : '0.0'
                                                }
                                                <span className="text-yellow-500 ml-2">⭐</span>
                                            </p>
                                        </div>
                                        <div className="rounded-full bg-accent/20 p-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300">
                    <div className="card-body p-6">
                        {/* Search and Filter Bar */}
                        <div className="mb-8 p-6 bg-base-200 rounded-2xl">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="flex-1 w-full md:w-auto">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search products by name, country, or description..."
                                            className="input input-bordered w-full pl-12 focus:input-info"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        {searchTerm && (
                                            <button 
                                                onClick={() => setSearchTerm('')}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                            </svg>
                                            Sort: {sortOption.replace('-', ' ')}
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 z-10">
                                            <li><button onClick={() => setSortOption('newest')} className={sortOption === 'newest' ? 'active' : ''}>Newest First</button></li>
                                            <li><button onClick={() => setSortOption('price-high')} className={sortOption === 'price-high' ? 'active' : ''}>Price: High to Low</button></li>
                                            <li><button onClick={() => setSortOption('price-low')} className={sortOption === 'price-low' ? 'active' : ''}>Price: Low to High</button></li>
                                            <li><button onClick={() => setSortOption('quantity-high')} className={sortOption === 'quantity-high' ? 'active' : ''}>Quantity: High to Low</button></li>
                                            <li><button onClick={() => setSortOption('rating-high')} className={sortOption === 'rating-high' ? 'active' : ''}>Rating: High to Low</button></li>
                                        </ul>
                                    </div>
                                    
                                    <a href="/export" className="btn btn-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Export New
                                    </a>
                                </div>
                            </div>
                            
                            {/* Results Info */}
                            {searchTerm && (
                                <div className="mt-4 flex items-center text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-info mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Found {filteredExports.length} product(s) matching "{searchTerm}"</span>
                                </div>
                            )}
                        </div>

                        {/* Loading State */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="loading loading-spinner loading-lg text-info mb-6"></div>
                                <p className="text-xl font-medium mb-2">Loading your exported products</p>
                                <p className="text-base-content/70">Please wait while we fetch your data...</p>
                            </div>
                        ) : exports.length === 0 ? (
                            /* Empty State */
                            <div className="text-center py-16">
                                <div className="mb-8">
                                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-info/10 to-accent/10 mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">No Exported Products Yet</h3>
                                    <p className="text-lg opacity-80 mb-8 max-w-md mx-auto">
                                        Start expanding your business globally by exporting your first product through ShipSync
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a href="/export" className="btn btn-info btn-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Export Your First Product
                                        </a>
                                        <a href="/marketplace" className="btn btn-outline btn-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Browse Marketplace
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Products Grid */
                            <>
                                {filteredExports.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">No Products Found</h3>
                                        <p className="text-lg opacity-80 mb-6">
                                            No products match your search criteria. Try different keywords.
                                        </p>
                                        <button 
                                            onClick={() => setSearchTerm('')}
                                            className="btn btn-ghost"
                                        >
                                            Clear Search
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {filteredExports.map(product => (
                                            <ExportedProductCard 
                                                key={product?._id} 
                                                product={product} 
                                                handleRemoveExport={handleRemoveExport}
                                                importModalRef={importModalRef}
                                                handleModal={handleModal}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Bottom CTA */}
                {exports.length > 0 && (
                    <div className="mt-12 p-8 bg-gradient-to-r from-info/10 via-accent/10 to-success/10 rounded-2xl border border-info/20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Ready to expand your exports?</h3>
                                <p className="opacity-80">Add more products to reach more international buyers</p>
                            </div>
                            <a href="/export" className="btn btn-info btn-lg shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Export More Products
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyExport