import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../Provider/AuthProvider'
import ImportedProductsCard from '../../components/ImportedProductsCard/ImportedProductsCard'
import Swal from 'sweetalert2'

const MyImports = () => {
    const { user } = use(AuthContext)
    const [importProducts, setImportProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user?.email) {
            setLoading(true)
            Promise.all([
                fetch(`https://ship-synce-api-server.vercel.app/imports?email=${user.email}`).then(res => res.json()),
                fetch('https://ship-synce-api-server.vercel.app/products').then(res => res.json())
            ])
                .then(([imports, products]) => {
                    const merged = imports.map(importItem => {
                        const foundProduct = products.find(product => product?._id === importItem.product)
                        return {
                            ...importItem,
                            importedProduct: foundProduct
                        }
                    })
                    setImportProducts(merged)
                    setLoading(false)
                })
        }
    }, [user])

    const handleRemove = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://ship-synce-api-server.vercel.app/imports/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your imported product has been deleted.",
                                icon: "success"
                            });
                            const remainingProducts = importProducts.filter(i => i?._id !== _id)
                            setImportProducts(remainingProducts)
                        }
                    })
            }
        })
    }

    return (
        <div className="min-h-screen bg-base-100 py-8 px-4">
            <title>My Imported Products || ShipSync</title>
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="h-1 w-8 bg-info rounded-full"></div>
                        <span className="text-info font-medium">My Purchases</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">My Imported Products</h1>
                    <p className="text-base-content/70">Manage all your imported items in one place</p>
                </div>

                {/* Stats Bar */}
                {!loading && importProducts.length > 0 && (
                    <div className="bg-base-200 rounded-xl p-4 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-info rounded-full"></div>
                                    <span className="font-medium">{importProducts.length} Products</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-success rounded-full"></div>
                                    <span className="font-medium">
                                        {importProducts.reduce((sum, item) => sum + (parseInt(item.importing_quantity) || 0), 0)} Total Items
                                    </span>
                                </div>
                            </div>
                            <div className="badge badge-info badge-lg">
                                Active
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="loading loading-spinner loading-lg text-info mb-4"></div>
                        <p className="text-base-content/70">Loading your imports...</p>
                    </div>
                ) : importProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-base-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">No Imports Yet</h3>
                        <p className="text-base-content/70 mb-6">You haven't imported any products yet.</p>
                        <a href="/products" className="btn btn-info">
                            Browse Products
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {importProducts.map((item) => (
                            <ImportedProductsCard key={item?._id} item={item} handleRemove={handleRemove} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyImports