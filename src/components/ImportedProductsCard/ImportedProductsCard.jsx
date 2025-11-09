import React from 'react'
import { Link } from 'react-router'

const ImportedProductsCard = ({item, handleRemove}) => {
    
    
    
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col items-center p-4">
                <img
                    src={item.importedProduct?.product_image}
                    alt={item.importedProduct?.product_name}
                    className="w-full h-[200px] object-cover shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-info text-center">{item.importedProduct?.product_name}</h3>
                <p className="text-gray-500 text-sm mt-1 text-center">{item.importedProduct?.origin_country}</p>

                <div className="flex justify-between items-center w-full mt-4 px-4">
                    <span className="text-accent font-bold">৳{item.importedProduct?.price}</span>
                    <span className="text-yellow-500 font-semibold">{item.importedProduct?.rating} ⭐</span>
                </div>

                <p className="text-gray-700 mt-2 text-center">Quantity: <span className="font-semibold">{item.importing_quantity}</span></p>

                <div className="flex justify-center gap-3 mt-4">
                    <button onClick={()=>handleRemove(item?._id)} className="btn btn-soft btn-error rounded-full transition">Remove</button>
                    <Link to={`/productDetails/${item.importedProduct?._id}`}><button className="btn btn-soft btn-info rounded-full transition">See Details</button></Link>
                </div>
            </div>
        </div>
    )
}

export default ImportedProductsCard