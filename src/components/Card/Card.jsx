import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { Link } from 'react-router'

const Card = ({ product }) => {
    // Function to render stars based on rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
        
        return (
            <div className="flex items-center gap-1">
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-orange-500" />
                ))}
                {hasHalfStar && <FaStarHalf className="text-orange-500" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaStar key={`empty-${i}`} className="text-gray-300" />
                ))}
                <span className="ml-2 text-sm font-medium">{rating}</span>
            </div>
        )
    }

    // Format price with commas
    const formatPrice = (price) => {
        return `৳${parseFloat(price).toLocaleString('en-BD')}`
    }

    return (
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-accent/30 hover:-translate-y-1 overflow-hidden group">
            {/* Image Container with Hover Effect */}
            <figure className="h-56 overflow-hidden relative">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={product?.product_image || 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={`${product?.product_name} Photo`}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    }}
                />
                
                {/* Stock Badge */}
                <div className="absolute top-3 right-3">
                    <div className={`badge badge-lg font-bold shadow-lg ${parseInt(product?.available_quantity) > 30 ? 'badge-success' : parseInt(product?.available_quantity) > 10 ? 'badge-warning' : 'badge-error'}`}>
                        {product?.available_quantity} in stock
                    </div>
                </div>
                
                {/* Country Flag Badge */}
                <div className="absolute top-3 left-3 bg-base-100/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">{product?.origin_country}</span>
                    </div>
                </div>
            </figure>

            {/* Card Body */}
            <div className="card-body p-5">
                {/* Product Title */}
                <h2 className="card-title text-lg font-bold group-hover:text-accent transition-colors line-clamp-1">
                    {product?.product_name}
                </h2>

                {/* Rating */}
                <div className="mb-3">
                    {renderStars(parseFloat(product?.rating))}
                </div>

                {/* Price */}
                <div className="mb-5">
                    <p className="text-2xl font-bold text-success">
                        {formatPrice(product?.price)}
                    </p>
                    <p className="text-sm text-base-content/60">per unit</p>
                </div>

                {/* Action Button */}
                <div className="card-actions">
                    <Link 
                        to={`/productDetails/${product?._id}`} 
                        className="btn btn-accent w-full group/btn"
                    >
                        <span className="group-hover/btn:scale-105 transition-transform">
                            View Details
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card