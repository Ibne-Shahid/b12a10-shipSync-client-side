import React, { useState } from 'react'
import { use } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Provider/AuthProvider'

const ExportProducts = () => {
    const {user} = use(AuthContext)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleExport = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const form = e.target
        const product_name = form.productName.value
        const product_image = form.photo.value
        const price = form.price.value
        const origin_country = form.country.value
        const rating = form.rating.value
        const available_quantity = form.quantity.value
        const description = form.description.value
        const exporter_email = user?.email

        const newProduct = {
            product_image,
            product_name,
            price,
            origin_country,
            rating: parseFloat(rating),
            available_quantity,
            description,
            exporter_email
        }

        fetch('https://ship-synce-api-server.vercel.app/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => {
            toast.success('Your product has been added for export.')
            form.reset()
        })
        .catch(err => {
            toast.error(err.message)
        })
        .finally(() => {
            setIsSubmitting(false)
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-10 px-4">
            <title>Export A Product || ShipSync</title>
            
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent">
                        Export Your Products
                    </h1>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto">
                        Expand your business globally by listing your products for international export through ShipSync
                    </p>
                </div>

                {/* Form Container */}
                <div className="card bg-base-100 shadow-2xl overflow-hidden">
                    <div className="card-body p-6 md:p-10">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left side - Form */}
                            <div className="md:w-2/3">
                                <form onSubmit={handleExport}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Product Name */}
                                        <div className="form-control md:col-span-2">
                                            <label className="label">
                                                <span className="label-text font-semibold text-lg">Product Name</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="productName" 
                                                className="input input-bordered focus:input-primary h-14 text-lg" 
                                                placeholder="Enter product name" 
                                                required 
                                            />
                                        </div>

                                        {/* Product Image URL */}
                                        <div className="form-control md:col-span-2">
                                            <label className="label">
                                                <span className="label-text font-semibold text-lg">Product Image URL</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="photo" 
                                                className="input input-bordered focus:input-primary h-14 text-lg" 
                                                placeholder="https://example.com/image.jpg" 
                                                required 
                                            />
                                        </div>

                                        {/* Price */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Price (BDT)</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg">$</span>
                                                <input 
                                                    type="number" 
                                                    name="price" 
                                                    className="input input-bordered focus:input-primary h-12 pl-10" 
                                                    placeholder="0.00" 
                                                    min="0" 
                                                    step="0.01"
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        {/* Origin Country */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Origin Country</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="country" 
                                                className="input input-bordered focus:input-primary h-12" 
                                                placeholder="Country of origin" 
                                                required 
                                            />
                                        </div>

                                        {/* Rating */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Rating</span>
                                            </label>
                                            <div className="rating rating-md">
                                                <input type="radio" name="rating" value="1" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating" value="2" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating" value="3" className="mask mask-star-2 bg-orange-400" defaultChecked />
                                                <input type="radio" name="rating" value="4" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating" value="5" className="mask mask-star-2 bg-orange-400" />
                                            </div>
                                        </div>

                                        {/* Available Quantity */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Available Quantity</span>
                                            </label>
                                            <input 
                                                type="number" 
                                                name="quantity" 
                                                className="input input-bordered focus:input-primary h-12" 
                                                placeholder="0" 
                                                min="0" 
                                                required 
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="form-control md:col-span-2">
                                            <label className="label">
                                                <span className="label-text font-semibold text-lg">Product Description</span>
                                            </label>
                                            <textarea 
                                                name="description" 
                                                className="textarea textarea-bordered focus:textarea-primary h-32 text-lg" 
                                                placeholder="Describe your product in detail..."
                                                required 
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-10">
                                        <button 
                                            type="submit" 
                                            className={`btn btn-accent btn-lg w-full ${isSubmitting ? 'loading' : ''}`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Exporting...' : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    Export Product Now
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Right side - Info Panel */}
                            <div className="md:w-1/3">
                                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 h-full">
                                    <div className="mb-6">
                                        <div className="flex items-center mb-4">
                                            <div className="rounded-full bg-primary/20 p-3 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold">Export Benefits</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Reach international customers</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>ShipSync handles logistics</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Secure payment processing</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Real-time tracking available</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-base-300">
                                        <div className="flex items-center mb-4">
                                            <div className="rounded-full bg-info/20 p-3 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold">Tips for Success</h3>
                                        </div>
                                        <p className="opacity-80">
                                            Use high-quality images, provide detailed descriptions, and set competitive prices to maximize your product's appeal to international buyers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Info */}
                        {user && (
                            <div className="mt-8 p-4 bg-base-200 rounded-xl flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="avatar placeholder mr-4">
                                        <div className="bg-accent text-primary-content rounded-full w-12">
                                            <img src={user?.photoURL} alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Exporting as:</p>
                                        <p className="text-sm opacity-80">{user.email}</p>
                                    </div>
                                </div>
                                <div className="badge bg-info text-white font-semibold badge-lg p-4">
                                    Verified Exporter
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="stats shadow bg-base-100">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div className="stat-title">Total Exports</div>
                            <div className="stat-value text-primary">1,200+</div>
                            <div className="stat-desc">Products listed this month</div>
                        </div>
                    </div>

                    <div className="stats shadow bg-base-100">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="stat-title">Active Buyers</div>
                            <div className="stat-value text-secondary">850+</div>
                            <div className="stat-desc">International buyers waiting</div>
                        </div>
                    </div>

                    <div className="stats shadow bg-base-100">
                        <div className="stat">
                            <div className="stat-figure text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="stat-title">Success Rate</div>
                            <div className="stat-value text-accent">94%</div>
                            <div className="stat-desc">Of exports reach destination</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExportProducts