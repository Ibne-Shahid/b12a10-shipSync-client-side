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
                fetch(`http://localhost:3000/imports?email=${user.email}`).then(res => res.json()),
                fetch('http://localhost:3000/products').then(res => res.json())
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

                fetch(`http://localhost:3000/imports/${_id}`, {
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

                            const remainigProducts = importProducts.filter(i => i?._id !== _id)
                            setImportProducts(remainigProducts)
                        }

                    })


            }
        })
    }

    return (
        <div className="py-10 px-5 md:px-14">
            <h2 className="text-4xl font-bold text-info mb-4">My Imported Products</h2>

            {loading ?
                <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500 text-lg animate-pulse">Loading my imports...</p>
                </div> :
                importProducts.length === 0 ?
                    <p className="text-gray-500 text-lg">No imports found.</p> :
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {importProducts.map((item) => (
                            <ImportedProductsCard key={item?._id} item={item} handleRemove={handleRemove}></ImportedProductsCard>
                        ))}
                    </div>
            }
        </div>
    )
}

export default MyImports