import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast } from 'react-toastify'

const MyExport = () => {

    const { user } = use(AuthContext)
    const [exports, setExports] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/products?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setExports(data)
                })
                .catch(err => {
                    toast.error(err.message)
                })
        }
    }, [user])

    return (
        <div className="py-10 px-5 md:px-14">
            <h1 className="text-4xl font-bold text-info mb-4">
                My Exported Products
            </h1>

            {exports.length === 0 ? (
                <p className="text-center text-gray-500">You haven’t exported any products yet.</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {exports.map(product => (
                        <div
                            key={product._id}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-300"
                        >
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
                                    <button className="btn btn-soft btn-error ">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}

export default MyExport