import React, { use, useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast } from 'react-toastify'
import { FaStar, FaStarHalf, FaMapMarkerAlt, FaBoxOpen, FaShippingFast } from 'react-icons/fa'
import { GiPriceTag } from 'react-icons/gi'

const ProductDetails = () => {
    const { id } = useParams()
    const { user } = use(AuthContext)
    const [products, setProducts] = useState([])
    const [importQuantity, setImportQuantity] = useState(1)
    const [relatedProducts, setRelatedProducts] = useState([])
    const importModalRef = useRef(null)

    useEffect(() => {
        fetch('https://ship-synce-api-server.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                
                // Filter related products by same country
                const currentProduct = data.find(p => p?._id === id)
                if (currentProduct) {
                    const related = data
                        .filter(p => p?._id !== id && p.origin_country === currentProduct.origin_country)
                        .slice(0, 4)
                    setRelatedProducts(related)
                }
            })
    }, [id])

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

                setImportQuantity(1)
                importModalRef.current.close()
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
        
        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-500" />
                ))}
                {hasHalfStar && <FaStarHalf className="text-yellow-500" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaStar key={`empty-${i}`} className="text-gray-300" />
                ))}
                <span className="ml-2 font-semibold">{rating.toFixed(1)}</span>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex justify-center items-center">
                <div className="loading loading-spinner loading-lg text-info"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8 px-4">
            <title>Details || ShipSync</title>
            
            <div className="max-w-7xl mx-auto">

                <div className="text-sm breadcrumbs mb-6">
                    <ul>
                        <li><Link to="/" className="text-info">Home</Link></li>
                        <li><Link to="/allProducts" className="text-info">Products</Link></li>
                        <li className="text-base-content/70">{product?.product_name}</li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-4">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-base-100">
                            <img
                                src={product?.product_image || 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                alt={product?.product_name}
                                className="w-full h-96 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                                }}
                            />
                            
                            <div className="absolute top-4 right-4">
                                <div className={`badge badge-lg font-bold ${parseInt(product?.available_quantity) > 20 ? 'badge-success' : parseInt(product?.available_quantity) > 10 ? 'badge-warning' : 'badge-error'}`}>
                                    {product?.available_quantity} in stock
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-8">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold mb-3">{product?.product_name}</h1>
                                <div className="flex items-center justify-between">
                                    {renderStars(parseFloat(product?.rating))}
                                    <div className="flex items-center text-info">
                                        <FaMapMarkerAlt className="mr-2" />
                                        <span className="font-medium">{product?.origin_country}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 p-4 bg-base-200 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-base-content/70">Price per unit</p>
                                        <p className="text-4xl font-bold text-success flex items-center">
                                            <GiPriceTag className="mr-2" />
                                            ৳{parseFloat(product?.price).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-base-content/70">Total Value</p>
                                        <p className="text-2xl font-bold text-info">
                                            ৳{(parseFloat(product?.price) * parseInt(product?.available_quantity)).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center">
                                    <FaBoxOpen className="mr-2 text-info" />
                                    Key Features
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-info rounded-full mr-3"></div>
                                        <span>Premium quality materials</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-info rounded-full mr-3"></div>
                                        <span>International shipping available</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-info rounded-full mr-3"></div>
                                        <span>Certified origin and quality</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-info rounded-full mr-3"></div>
                                        <span>Secure payment processing</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <label className="label">
                                    <span className="label-text font-semibold">Import Quantity</span>
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="join">
                                        <button 
                                            className="btn btn-outline join-item"
                                            onClick={() => setImportQuantity(prev => Math.max(1, prev - 1))}
                                            disabled={importQuantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input 
                                            type="number" 
                                            className="input input-bordered join-item w-24 text-center"
                                            value={importQuantity}
                                            onChange={(e) => setImportQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            min="1"
                                            max={product?.available_quantity}
                                        />
                                        <button 
                                            className="btn btn-outline join-item"
                                            onClick={() => setImportQuantity(prev => Math.min(product?.available_quantity, prev + 1))}
                                            disabled={importQuantity >= product?.available_quantity}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-base-content/60">
                                        Max: {product?.available_quantity} units
                                    </span>
                                </div>
                            </div>

                            <div className="card-actions">
                                <button 
                                    disabled={user?.email === product?.exporter_email || product?.available_quantity === 0}
                                    onClick={handleModal}
                                    className="btn btn-info btn-lg flex-1"
                                >
                                    <FaShippingFast className="mr-2" />
                                    {product?.available_quantity === 0 ? 'Out of Stock' : 'Import Now'}
                                </button>
                                
                                {user?.email === product?.exporter_email && (
                                    <div className="alert alert-info mt-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>This is your own product. You cannot import it.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold mb-4">Product Description</h2>
                        <div className="prose max-w-none">
                            <p className="text-lg leading-relaxed">
                                {product?.description}
                            </p>
                            <div className="divider"></div>
                            <h3 className="text-xl font-bold mb-3">Why Choose This Product?</h3>
                            <ul className="space-y-2">
                                <li>• High-quality materials ensure durability and longevity</li>
                                <li>• Direct from manufacturer pricing for best value</li>
                                <li>• Worldwide shipping with tracking available</li>
                                <li>• Customer satisfaction guarantee</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold mb-4">Product Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-base-content/70">Origin Country</span>
                                    <span className="font-semibold">{product?.origin_country}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-base-content/70">Available Quantity</span>
                                    <span className="font-semibold">{product?.available_quantity} units</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-base-content/70">Rating</span>
                                    <span className="font-semibold">{product?.rating} / 5.0</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-base-content/70">Exporter</span>
                                    <span className="font-semibold">{product?.exporter_email}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-base-content/70">Price per Unit</span>
                                    <span className="font-semibold text-success">৳{product?.price}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-base-content/70">Product ID</span>
                                    <span className="font-semibold">{product?._id?.slice(-8)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="card bg-base-100 shadow-xl mb-8">
                        <div className="card-body">
                            <h2 className="card-title text-2xl font-bold mb-6">Related Products from {product?.origin_country}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {relatedProducts.map((related) => (
                                    <Link 
                                        key={related._id} 
                                        to={`/productDetails/${related._id}`}
                                        className="card bg-base-200 hover:bg-base-300 transition-all hover:scale-[1.02]"
                                    >
                                        <figure className="h-40">
                                            <img 
                                                src={related.product_image} 
                                                alt={related.product_name}
                                                className="w-full h-full object-cover"
                                            />
                                        </figure>
                                        <div className="card-body p-4">
                                            <h3 className="card-title text-sm font-bold line-clamp-1">{related.product_name}</h3>
                                            <p className="text-success font-bold">৳{related.price}</p>
                                            <div className="badge badge-info">{related.rating} ⭐</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <dialog ref={importModalRef} className="modal">
                    <div className="modal-box max-w-md">
                        <h3 className="font-bold text-lg mb-4">Import {product?.product_name}</h3>
                        <form onSubmit={handleImportSubmit}>
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        className="input input-bordered" 
                                        defaultValue={user?.displayName} 
                                        required 
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Email</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="input input-bordered" 
                                        defaultValue={user?.email} 
                                        required 
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Quantity</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        name="quantity" 
                                        className="input input-bordered" 
                                        value={importQuantity}
                                        onChange={(e) => setImportQuantity(parseInt(e.target.value) || 1)}
                                        min="1"
                                        max={product?.available_quantity}
                                        required 
                                    />
                                    <div className="label-text-alt mt-1">
                                        Available: {product?.available_quantity} units
                                    </div>
                                    {importQuantity > product?.available_quantity && (
                                        <div className="alert alert-error mt-2">
                                            <span>Quantity exceeds available stock!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-action">
                                <button 
                                    type="button" 
                                    onClick={() => importModalRef.current.close()}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-info"
                                    disabled={importQuantity > product?.available_quantity || importQuantity < 1}
                                >
                                    Confirm Import
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    )
}

export default ProductDetails