import React from 'react'
import { Link } from 'react-router'

const ImportedProductsCard = ({ item, handleRemove }) => {
    if (!item.importedProduct) return null

    return (
        <div className="card bg-base-100 shadow-lg hover:shadow-xl border border-base-300 transition-shadow duration-300">
            {/* Product Image */}
            <figure className="h-48 overflow-hidden">
                <img
                    src={item.importedProduct?.product_image || 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={item.importedProduct?.product_name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                    <div className="badge badge-info text-white">
                        Imported
                    </div>
                </div>
            </figure>

            {/* Card Body */}
            <div className="card-body p-5">
                {/* Product Info */}
                <div className="mb-4">
                    <h3 className="card-title text-lg font-bold mb-1 line-clamp-1">
                        {item.importedProduct?.product_name}
                    </h3>
                    <div className="flex items-center text-sm text-base-content/70 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.importedProduct?.origin_country}
                    </div>
                </div>

                {/* Price & Rating */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-2xl font-bold text-success">৳{item.importedProduct?.price}</p>
                        <p className="text-sm text-base-content/60">per unit</p>
                    </div>
                    <div className="badge badge-warning gap-1">
                        ⭐ {item.importedProduct?.rating}
                    </div>
                </div>

                {/* Import Details */}
                <div className="bg-base-200 rounded-lg p-3 mb-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-base-content/70">Import Quantity</p>
                            <p className="text-lg font-semibold">{item.importing_quantity} units</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-base-content/70">Total Value</p>
                            <p className="text-lg font-bold text-info">
                                ${(parseFloat(item.importedProduct?.price) * parseInt(item.importing_quantity || 0)).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="card-actions">
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => handleRemove(item?._id)}
                            className="btn btn-error btn-outline btn-sm flex-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                        </button>

                        <Link 
                            to={`/productDetails/${item.importedProduct?._id}`}
                            className="btn btn-info btn-sm flex-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImportedProductsCard