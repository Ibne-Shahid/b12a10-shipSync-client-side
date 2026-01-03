import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('https://ship-synce-api-server.vercel.app/products')
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

    // Search filter
    if (search.trim() !== "") {
        filteredProducts = products.filter((product) => 
            product.product_name.toLowerCase().includes(search.toLowerCase())
        )
    }

    if (sort === "price-low-high") {
        filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sort === "price-high-low") {
        filteredProducts.sort((a, b) => b.price - a.price)
    } else if (sort === "rating-high-low") {
        filteredProducts.sort((a, b) => b.rating - a.rating)
    } else if (sort === "rating-low-high") {
        filteredProducts.sort((a, b) => a.rating - b.rating)
    } else if (sort === "newest-first") {
        filteredProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sort === "oldest-first") {
        filteredProducts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else if (sort === "popular") {
        filteredProducts.sort((a, b) => {
            const ratingDiff = b.rating - a.rating;
            if (ratingDiff !== 0) return ratingDiff;
            return (b.review_count || 0) - (a.review_count || 0);
        })
    }

    return (
        <div>
            <title>All Products || ShipSync</title>
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-primary-focus text-primary-content py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">All Products</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Manage and explore your global import/export products with ShipSync.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className='py-10 px-4 sm:px-6 lg:px-8'>
                <div className="max-w-7xl mx-auto">
                    {/* Search and Filter Section */}
                    <div className="mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                            {/* Search Input */}
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products by name..."
                                        value={search}
                                        onChange={handleSearch}
                                        className="w-full input input-bordered input-lg pl-12 focus:input-primary"
                                    />
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-5 h-5 text-base-content opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="w-full lg:w-auto">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <label className="font-medium text-base-content opacity-80 whitespace-nowrap">
                                        Sort by:
                                    </label>
                                    <select
                                        value={sort}
                                        onChange={handleSort}
                                        className="select select-bordered select-lg w-full focus:select-primary"
                                    >
                                        <option value="">Default (Featured)</option>
                                        <optgroup label="Price">
                                            <option value="price-low-high">Price: Low to High</option>
                                            <option value="price-high-low">Price: High to Low</option>
                                        </optgroup>
                                        <optgroup label="Rating">
                                            <option value="rating-high-low">Rating: High to Low</option>
                                            <option value="rating-low-high">Rating: Low to High</option>
                                        </optgroup>
                                        <optgroup label="Date">
                                            <option value="newest-first">Newest First</option>
                                            <option value="oldest-first">Oldest First</option>
                                        </optgroup>
                                        <option value="popular">Most Popular</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        <div className="flex items-center justify-between">
                            <div className="text-base-content">
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        <span>Loading products...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="font-semibold">{filteredProducts.length}</span> products found
                                        {search && (
                                            <span className="ml-2 opacity-70">
                                                for "<span className="font-medium">{search}</span>"
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Active Sort Indicator */}
                            {sort && !loading && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm opacity-70">Sorted by:</span>
                                    <span className="badge badge-accent">
                                        {sort === "price-low-high" && "Price: Low to High"}
                                        {sort === "price-high-low" && "Price: High to Low"}
                                        {sort === "rating-high-low" && "Rating: High to Low"}
                                        {sort === "rating-low-high" && "Rating: Low to High"}
                                        {sort === "newest-first" && "Newest First"}
                                        {sort === "oldest-first" && "Oldest First"}
                                        {sort === "popular" && "Most Popular"}
                                    </span>
                                    <button 
                                        onClick={() => setSort("")}
                                        className="btn btn-xs btn-ghost"
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-lg font-medium text-base-content">Loading products...</p>
                            <p className="text-base-content opacity-70">Fetching from global database</p>
                        </div>
                    ) : (
                        /* Products Grid or Empty State */
                        filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 mx-auto mb-6 bg-base-200 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-base-content opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-base-content mb-3">No products found</h3>
                                <p className="text-base-content opacity-70 max-w-md mx-auto mb-8">
                                    {search ? `No products match "${search}". Try a different search term.` : 'No products available at the moment.'}
                                </p>
                                {search && (
                                    <button 
                                        onClick={() => setSearch("")}
                                        className="btn btn-primary"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        ) : (
                            /* Products Grid */
                            <>
                                {/* Grid Layout Toggle (Optional) */}
                                <div className="mb-6 flex justify-end">
                                    <div className="btn-group">
                                        <button className="btn btn-sm btn-active">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </button>
                                        <button className="btn btn-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Products Grid */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                    {filteredProducts.map((product) => (
                                        <Card key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination (Optional) */}
                                {filteredProducts.length > 12 && (
                                    <div className="mt-12 flex justify-center">
                                        <div className="join">
                                            <button className="join-item btn btn-outline">Previous</button>
                                            <button className="join-item btn btn-primary">1</button>
                                            <button className="join-item btn btn-outline">2</button>
                                            <button className="join-item btn btn-outline">3</button>
                                            <button className="join-item btn btn-outline">Next</button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllProducts