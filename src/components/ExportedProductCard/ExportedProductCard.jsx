import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ExportedProductCard = ({ product, handleRemoveExport, importModalRef, handleModal }) => {
    const [exportedProduct, setExportedProduct] = useState(product)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleUpdateExport = (e) => {
        e.preventDefault()
        setIsUpdating(true)

        const form = e.target
        const product_name = form.productName.value
        const product_image = form.photo.value
        const price = form.price.value
        const origin_country = form.country.value
        const rating = form.rating.value
        const available_quantity = form.quantity.value
        const description = form.description.value

        const updatedProduct = {
            product_image,
            product_name,
            price,
            origin_country,
            rating: parseFloat(rating),
            available_quantity,
            description
        }

        fetch(`https://ship-synce-api-server.vercel.app/products/${product?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.modifiedCount) {
                    toast.success('Product updated successfully!')
                    importModalRef.current.close()
                    setExportedProduct(prev => ({ ...prev, ...updatedProduct }))
                } else {
                    toast.error('Failed to update product')
                }
            })
            .catch(err => {
                toast.error(err.message)
            })
            .finally(() => {
                setIsUpdating(false)
            })
    }

    return (
        <>
            {/* Product Card - Simplified */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl border border-base-300">
                <figure className="h-48">
                    <img
                        src={exportedProduct?.product_image || 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                        alt={exportedProduct?.product_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                        }}
                    />
                </figure>

                <div className="card-body p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="card-title text-lg font-bold truncate">
                            {exportedProduct?.product_name}
                        </h2>
                        <span className="badge badge-info">
                            {exportedProduct?.rating} ⭐
                        </span>
                    </div>

                    <div className="mb-3">
                        <p className="text-sm text-base-content/70 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {exportedProduct?.origin_country}
                        </p>
                        <p className="text-sm mt-1 line-clamp-2">
                            {exportedProduct?.description}
                        </p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-2xl font-bold text-success">${exportedProduct?.price}</p>
                            <p className="text-sm text-base-content/60">per unit</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">{exportedProduct?.available_quantity}</p>
                            <p className="text-sm text-base-content/60">in stock</p>
                        </div>
                    </div>

                    <div className="card-actions flex gap-2">
                        <button 
                            onClick={() => handleModal(exportedProduct)}
                            className="btn btn-info btn-sm flex-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Update
                        </button>

                        <button 
                            onClick={() => handleRemoveExport(product?._id)}
                            className="btn btn-error btn-sm flex-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            <dialog ref={importModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl p-0 max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Modal Header */}
                    <div className="bg-info text-info-content p-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Update Product</h3>
                            <button 
                                onClick={() => importModalRef.current.close()}
                                className="btn btn-sm btn-circle btn-ghost"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Form Content */}
                    <div className="overflow-y-auto flex-1">
                        <form onSubmit={handleUpdateExport} className="p-6">
                            <div className="space-y-4">
                                {/* Product Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="productName" 
                                        className="input input-bordered" 
                                        required 
                                        defaultValue={exportedProduct?.product_name}
                                    />
                                </div>

                                {/* Product Image */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Image URL</span>
                                    </label>
                                    <input 
                                        type="url" 
                                        name="photo" 
                                        className="input input-bordered" 
                                        required 
                                        defaultValue={exportedProduct?.product_image}
                                    />
                                </div>

                                {/* Price */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Price (USD)</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">৳</span>
                                        <input 
                                            type="number" 
                                            name="price" 
                                            className="input input-bordered pl-8" 
                                            placeholder="0.00" 
                                            min="0" 
                                            step="0.01"
                                            required 
                                            defaultValue={exportedProduct?.price}
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
                                        className="input input-bordered" 
                                        required 
                                        defaultValue={exportedProduct?.origin_country}
                                    />
                                </div>

                                {/* Rating */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Rating</span>
                                    </label>
                                    <select 
                                        name="rating" 
                                        className="select select-bordered"
                                        defaultValue={exportedProduct?.rating}
                                    >
                                        <option value="1">1 ⭐</option>
                                        <option value="2">2 ⭐⭐</option>
                                        <option value="3">3 ⭐⭐⭐</option>
                                        <option value="4">4 ⭐⭐⭐⭐</option>
                                        <option value="5">5 ⭐⭐⭐⭐⭐</option>
                                    </select>
                                </div>

                                {/* Quantity */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Available Quantity</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        name="quantity" 
                                        className="input input-bordered" 
                                        placeholder="0" 
                                        min="0" 
                                        required 
                                        defaultValue={exportedProduct?.available_quantity}
                                    />
                                </div>

                                {/* Description */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Description</span>
                                    </label>
                                    <textarea 
                                        name="description" 
                                        className="textarea textarea-bordered h-32" 
                                        required 
                                        defaultValue={exportedProduct?.description}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="modal-action mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => importModalRef.current.close()}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className={`btn btn-info ${isUpdating ? 'loading' : ''}`}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Updating...' : 'Update Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default ExportedProductCard