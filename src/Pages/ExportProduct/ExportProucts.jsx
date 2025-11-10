import React, { use } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Provider/AuthProvider'

const ExportProucts = () => {

    const {user} = use(AuthContext)

    const handleExport = (e)=>{
        e.preventDefault()

        const form = e.target
        const product_name = form.productName.value
        const product_image = form.photo.value
        const price = form.price.value
        const origin_country = form.country.value
        const rating = form.rating.value
        const available_quantity = form.quantity.value
        const description = form.description.value
        const exporter_email = user?.email

        const newProduct = {
            product_image,
            product_name,
            price,
            origin_country,
            rating: parseFloat(rating) ,
            available_quantity,
            description,
            exporter_email
        }

        fetch('https://ship-synce-api-server.vercel.app/products',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(res=>res.json())
        .then(data=>{
            toast.success('Your product has been added for export.')
            form.reset()
        })
        .catch(err=>{
            toast.error(err.message)
        })

    }

    return (
        <div>
            <title>Export A Product || ShipSync</title>
            <div className='flex justify-center py-20'>
                <div className='fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4'>
                    <form onSubmit={handleExport}>
                        <h1 className='text-2xl font-bold text-info text-center mb-5'>Export Your Product</h1>

                        <label className="label">Product Name</label>
                        <input type="text" name="productName" className="input" placeholder="Product Name" required />

                        <label className="label">Product Image</label>
                        <input type="text" name="photo" className="input" placeholder="Photo URL" required />

                        <label className="label">Price</label>
                        <input type="number" name="price" className="input" placeholder="Price" required />

                        <label className="label">Origin Country</label>
                        <input type="text" name="country" className="input" placeholder="Origin Country" required />

                        <label className="label">Rating</label>
                        <input type="text" name="rating" className="input" placeholder="Rating" required />

                        <label className="label">Available quantity</label>
                        <input type="number" name="quantity" className="input" placeholder="Available quantity" required />

                        <label className="label">Product Description</label>
                        <input type="text" name="description" className="input" placeholder="Description" required />

                        <button type="submit" className="btn btn-info w-full text-white mt-3">Export Product</button>
                        
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ExportProucts