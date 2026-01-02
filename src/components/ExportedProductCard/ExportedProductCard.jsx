import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ExportedProductCard = ({ product, handleRemoveExport }) => {
    const [exportedProduct, setExportedProduct] = useState(product)
    const [isUpdating, setIsUpdating] = useState(false)

    const modalId = `modal_${product?._id}`;

    const handleUpdateExport = (e) => {
        e.preventDefault()
        setIsUpdating(true)

        const form = e.target;
        
        const updatedProductDetails = {
            product_name: form.productName.value,
            product_image: form.photo.value,
            price: form.price.value,
            origin_country: form.country.value,
            rating: parseFloat(form.rating.value),
            available_quantity: parseInt(form.quantity.value),
            description: form.description.value
        }

        fetch(`https://ship-synce-api-server.vercel.app/exportedProducts/${product?._id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedProductDetails)
        })
            .then(res => res.json())
            .then(data => {
                // MongoDB modifiedCount > 0 হলে সাকসেস
                if (data?.modifiedCount > 0) {
                    toast.success('Product updated successfully!')
                    setExportedProduct(prev => ({ ...prev, ...updatedProductDetails }))
                    document.getElementById(modalId).close(); 
                } else {
                    toast.info('No changes were made.')
                    document.getElementById(modalId).close();
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Update failed: " + err.message);
            })
            .finally(() => setIsUpdating(false))
    }

    return (
        <div className="card bg-base-100 shadow-lg border border-base-200">
            <figure className="h-48">
                <img
                    src={exportedProduct?.product_image}
                    alt={exportedProduct?.product_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800'
                    }}
                />
            </figure>

            <div className="card-body p-4 text-left">
                <h2 className="card-title text-lg font-bold truncate">
                    {exportedProduct?.product_name}
                </h2>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-bold text-success">৳{exportedProduct?.price}</p>
                    <div className="badge badge-info">{exportedProduct?.rating} ⭐</div>
                </div>
                <p className="text-sm opacity-70 line-clamp-1">{exportedProduct?.description}</p>

                <div className="card-actions grid grid-cols-2 gap-2 mt-4">
                    <button 
                        type="button"
                        onClick={() => document.getElementById(modalId).showModal()} 
                        className="btn btn-sm btn-info text-white"
                    >
                        Update
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleRemoveExport(product?._id)} 
                        className="btn btn-sm btn-error text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* --- DaisyUI Modal --- */}
            <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-xl p-0">
                    <div className="bg-info p-4 text-white flex justify-between">
                        <h3 className="font-bold text-lg">Update Product</h3>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                        </form>
                    </div>

                    <form onSubmit={handleUpdateExport} className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label-text font-bold mb-1">Product Name</label>
                                <input type="text" name="productName" defaultValue={exportedProduct?.product_name} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label-text font-bold mb-1">Image URL</label>
                                <input type="url" name="photo" defaultValue={exportedProduct?.product_image} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label-text font-bold mb-1">Price (৳)</label>
                                <input type="number" name="price" defaultValue={exportedProduct?.price} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label-text font-bold mb-1">Stock Quantity</label>
                                <input type="number" name="quantity" defaultValue={exportedProduct?.available_quantity} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label-text font-bold mb-1">Country</label>
                                <input type="text" name="country" defaultValue={exportedProduct?.origin_country} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label-text font-bold mb-1">Rating</label>
                                <select name="rating" defaultValue={exportedProduct?.rating} className="select select-bordered">
                                    <option value="1">1 Star</option>
                                    <option value="2">2 Star</option>
                                    <option value="3">3 Star</option>
                                    <option value="4">4 Star</option>
                                    <option value="5">5 Star</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label-text font-bold mb-1">Description</label>
                            <textarea name="description" defaultValue={exportedProduct?.description} className="textarea textarea-bordered h-24" required />
                        </div>

                        <div className="modal-action bg-base-200 p-4">
                            <button type="button" onClick={() => document.getElementById(modalId).close()} className="btn">Cancel</button>
                            <button type="submit" className={`btn btn-info text-white ${isUpdating ? 'loading' : ''}`} disabled={isUpdating}>
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default ExportedProductCard;