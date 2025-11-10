import React, { use, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast } from 'react-toastify'

const ProductDetails = () => {

    const { id } = useParams()
    const { user } = use(AuthContext)
    const [products, setProducts] = useState([])
    const [importQuantity, setImportQuantity] = useState(null)
    const importModalRef = useRef(null)

    useEffect(() => {
        fetch('https://ship-synce-api-server.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    const product = products.find(p => p?._id === id)

    const handleModal = () => {
        importModalRef.current.showModal()
    }

    const handleImportSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const quantity = form.quantity.value

        const importProduct = {
            product: product?._id,
            importer_name: name,
            importer_email: email,
            importing_quantity: quantity
        }

        fetch('https://ship-synce-api-server.vercel.app/imports', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(importProduct)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Product imported successfully!')

                fetch(`https://ship-synce-api-server.vercel.app/products/${product?._id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ decreaseBy: importQuantity })
                })
                    .then(res => res.json())
                    .then(data => {
                        setProducts(prev =>
                            prev.map(p =>
                                p?._id === product?._id
                                    ? { ...p, available_quantity: p.available_quantity - importQuantity }
                                    : p
                            )
                        )
                    })

                setImportQuantity("")
                importModalRef.current.close()
            })
            .catch(err => {
                toast.error(err.message)
            })

    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg font-semibold">Loading product details...</p>
            </div>
        )
    }

    return (
        <div className='bg-gray-100 py-10'>
            <title>Product Details || ShipSync</title>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6">
                <div className="flex flex-col md:flex-row gap-6">

                    <div className="flex-1 flex justify-center items-center">
                        <img
                            src={product?.product_image}
                            alt={product?.product_name}
                            className="rounded-xl w-full max-w-sm object-cover shadow-md"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">{product?.product_name}</h1>
                        <p className="text-gray-600">{product?.description}</p>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <p className="text-gray-500">Price:</p>
                                <p className="text-xl font-semibold text-blue-600">{product?.price}৳</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Origin:</p>
                                <p className="font-semibold">{product?.origin_country}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Rating:</p>
                                <p className="font-semibold">{product?.rating} ⭐</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Available Quantity:</p>
                                <p className="font-semibold">{product?.available_quantity}</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <button disabled={user?.email === product?.exporter_email} onClick={handleModal} className="mt-6 btn btn-accent">
                                    Import Now
                                </button>
                                {user?.email === product?.exporter_email? <p className='text-xs text-gray-600'>*(Your Product)</p> : ""}
                            </div>

                            <dialog ref={importModalRef} className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-info text-lg">Add to Import</h3>

                                    <form onSubmit={handleImportSubmit}>
                                        <fieldset className="fieldset">
                                            <label className="label">Name</label>
                                            <input type="text" name='name' className="input" readOnly defaultValue={user?.displayName} />

                                            <label className="label">Email</label>
                                            <input type="email" className="input" name='email' readOnly defaultValue={user?.email} />

                                            <label className="label">Quantity</label>
                                            <input type="number" name='quantity' className="input"
                                                placeholder='Your Quantity'
                                                value={importQuantity}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    setImportQuantity(value === "" ? null : parseInt(value))
                                                }}
                                            />
                                            {importQuantity > product.available_quantity && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    Quantity cannot exceed available stock ({product.available_quantity})
                                                </p>
                                            )}
                                            <button disabled={importQuantity > product.available_quantity || importQuantity <= 0 || product?.available_quantity === 0} type='submit' className="btn btn-accent mt-4">Submit</button>

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


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails