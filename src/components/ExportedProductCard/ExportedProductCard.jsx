import React from 'react'

const ExportedProductCard = ({product, handleRemoveExport}) => {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-300">
            <figure className="px-4 pt-4">
                <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="rounded-xl h-52 w-full object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-info">{product.product_name}</h2>
                <p className="text-sm text-gray-500 mb-2">{product.origin_country}</p>

                <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-semibold text-success">Price: ${product.price}</span>
                    <span className="text-yellow-500 flex items-center">
                        ⭐ {product.rating}
                    </span>
                </div>

                <p className="text-sm mb-3">
                    Available: <span className="font-semibold">{product.available_quantity}</span>
                </p>

                <div className="card-actions justify-between">
                    <button className="btn btn-soft btn-info ">Update</button>
                    <button onClick={()=>handleRemoveExport(product?._id)} className="btn btn-soft btn-error">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ExportedProductCard