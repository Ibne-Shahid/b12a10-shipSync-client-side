import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast } from 'react-toastify'
import ExportedProductCard from '../../components/ExportedProductCard/ExportedProductCard'
import Swal from 'sweetalert2'

const MyExport = () => {

    const { user } = use(AuthContext)
    const [exports, setExports] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user?.email) {
            setLoading(true)
            fetch(`http://localhost:3000/products?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setExports(data)
                    setLoading(false)
                })
                .catch(err => {
                    toast.error(err.message)
                })
        }
    }, [user])

    const handleRemoveExport = (_id) => {

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

                fetch(`http://localhost:3000/products/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your export product has been deleted.",
                                icon: "success"
                            });
                            const remainigProducts = exports.filter(prev=> prev?._id !== _id)
                            setExports(remainigProducts)
                        }
                    })


            }
        })



    }

    return (
        <div className="py-10 px-5 md:px-14">
            <h1 className="text-4xl font-bold text-info mb-4">
                My Exported Products
            </h1>

            {loading ?
                <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500 text-lg animate-pulse">Loading my exports...</p>
                </div> : exports.length === 0 ? (
                    <p className="text-gray-500 text-lg">You haven’t exported any products yet.</p>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {exports.map(product => (
                            <ExportedProductCard key={product?._id} product={product} handleRemoveExport={handleRemoveExport}></ExportedProductCard>
                        ))}
                    </div>
                )}
        </div>

    )
}

export default MyExport