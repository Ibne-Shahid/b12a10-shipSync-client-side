import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ExportedProductCard = ({ product, handleRemoveExport, importModalRef, handleModal }) => {

    const [exportedProduct, setExportedProduct] = useState(product)

    const handleUpdateExport = (e)=>{
        e.preventDefault()

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
            rating: parseFloat(rating) ,
            available_quantity,
            description
        }

        fetch(`https://ship-synce-api-server.vercel.app/exportedProducts/${product?._id}`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.modifiedCount){
                toast.success('Product updated successfully!')
                importModalRef.current.close()
                setExportedProduct(prev=>({...prev, ...updatedProduct}))
            }
        })
        .catch(err=>{
            toast.error(err.message)
        })
        
    }

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-300">
            <figure className="px-4 pt-4">
                <img
                    src={exportedProduct?.product_image}
                    alt={exportedProduct?.product_name}
                    className="rounded-xl h-52 w-full object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-info">{exportedProduct?.product_name}</h2>
                <p className="text-sm text-gray-500 mb-2">{exportedProduct?.origin_country}</p>

                <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-semibold text-success">Price: ৳{exportedProduct?.price}</span>
                    <span className="text-yellow-500 flex items-center">
                        ⭐ {exportedProduct?.rating}
                    </span>
                </div>

                <p className="text-sm mb-3">
                    Available: <span className="font-semibold">{exportedProduct?.available_quantity}</span>
                </p>

                <div className="card-actions justify-between">

                    <div>
                        <div>
                            <button onClick={handleModal} className="btn btn-soft btn-info ">Update</button>
                        </div>

                        <dialog ref={importModalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-info text-lg">Update Your Exported Product</h3>

                                <form onSubmit={handleUpdateExport}>
                                    <fieldset className="fieldset">
                                        <label className="label">Product Image</label>
                                        <input type="text" name='photo' className="input" required defaultValue={exportedProduct?.product_image} />

                                        <label className="label">Product Name</label>
                                        <input type="text" name="productName" className="input" placeholder="Product Name" required defaultValue={exportedProduct?.product_name} />

                                        <label className="label">Price</label>
                                        <input type="number" name="price" className="input" placeholder="Price" required defaultValue={exportedProduct?.price} />

                                        <label className="label">Origin Country</label>
                                        <input type="text" name="country" className="input" placeholder="Origin Country" required defaultValue={exportedProduct?.origin_country} />

                                        <label className="label">Rating</label>
                                        <input type="text" name="rating" className="input" placeholder="Rating" required defaultValue={exportedProduct?.rating}/>

                                        <label className="label">Available quantity</label>
                                        <input type="number" name="quantity" className="input" placeholder="Available quantity" required defaultValue={exportedProduct?.available_quantity}/>

                                        <label className="label">Product Description</label>
                                        <input type="text" name="description" className="input" placeholder="Description" required defaultValue={exportedProduct?.description}/>

                                        <button type='submit' className="btn btn-accent mt-4">Submit</button>

                                    </fieldset>
                                </form>

                                <div className="modal-action">
                                    <form method="dialog">

                                        <button className="btn">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>

                    <button onClick={() => handleRemoveExport(product?._id)} className="btn btn-soft btn-error">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ExportedProductCard