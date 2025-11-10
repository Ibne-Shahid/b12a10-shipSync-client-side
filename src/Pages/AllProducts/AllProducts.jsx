import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'

const AllProducts = () => {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        setLoading(true)
        setTimeout(() => setLoading(false), 400)
    };

    const handleSort = (e) => {
        const value = e.target.value
        setSort(value)
        setLoading(true)
        setTimeout(() => setLoading(false), 400)
    };

    let filteredProducts = [...products]

    if (search.trim() !== "") {
        filteredProducts = products.filter((product) => product.product_name.toLowerCase().includes(search.toLowerCase())

        )
    }

    if (sort === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sort === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price)
    } 


    return (
        <div>
            <title>All Products || ShipSync</title>
            <div className="text-center py-12 bg-white shadow-sm">
                <h1 className="text-4xl font-bold text-info">All Products</h1>
                <p className="text-gray-500 mt-2">
                    Manage and explore your global import/export products with ShipSync.
                </p>
            </div>

            <div className='py-10 px-5 md:px-14'>
                <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <select
                        value={sort}
                        onChange={handleSort}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Sort By</option>
                        <option value="low-high">Price: Low - High</option>
                        <option value="high-low">Price: High - Low</option>
                    </select>
                </div>

                <div className="max-w-6xl mx-auto px-6 mb-4 text-gray-600">
                    {loading ? 
                        <p>Loading products...</p> : 
                        <>Showing <span className="font-semibold">{filteredProducts.length}</span> products found</>
                    }
                </div>

                {loading ?
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div> :
                    filteredProducts.length === 0 ?
                        <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
                            No products found.
                        </div> :
                        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                            {filteredProducts.map((product) => <Card key={product._id} product={product}></Card>)}
                        </div>
                }


            </div>
        </div>
    )
}

export default AllProducts