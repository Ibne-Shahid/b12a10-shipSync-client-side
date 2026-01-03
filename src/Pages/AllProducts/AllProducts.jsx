import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Card from '../../components/Card/Card'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [loading, setLoading] = useState(true)
    
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(0)
    
    const itemsPerPage = 8

    const fetchProducts = useCallback(async (page = 1) => {
        setLoading(true)
        try {
            const skip = (page - 1) * itemsPerPage
            
            const url = `https://ship-synce-api-server.vercel.app/products/paginated?page=${page}&limit=${itemsPerPage}&search=${search}&sort=${sort}`
            
            const res = await fetch(url)
            const data = await res.json()
            
            setProducts(data.products || [])
            setTotalProducts(data.total || 0)
            setTotalPages(Math.ceil(data.total / itemsPerPage))
            setCurrentPage(page)
        } catch (error) {
            console.error('Error fetching products:', error)
            setProducts([])
        } finally {
            setLoading(false)
        }
    }, [search, sort, itemsPerPage])

    useEffect(() => {
        fetchProducts(1)
    }, [fetchProducts])

    const handleSearch = useCallback((e) => {
        const value = e.target.value
        setSearch(value)
        fetchProducts(1)
    }, [fetchProducts])

    const handleSort = useCallback((e) => {
        const value = e.target.value
        setSort(value)
        fetchProducts(1)
    }, [fetchProducts])

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchProducts(page)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1)
        }
    }

    const goToPrevPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1)
        }
    }

    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            }
        }
        
        return pages
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
                                        <span className="font-semibold">{totalProducts}</span> products found
                                        {search && (
                                            <span className="ml-2 opacity-70">
                                                for "<span className="font-medium">{search}</span>"
                                            </span>
                                        )}
                                        <span className="ml-3 opacity-70">
                                            (Page {currentPage} of {totalPages})
                                        </span>
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
                                    </span>
                                    <button 
                                        onClick={() => {
                                            setSort("")
                                            fetchProducts(1)
                                        }}
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
                        products.length === 0 ? (
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
                                        onClick={() => {
                                            setSearch("")
                                            fetchProducts(1)
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Products Grid */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
                                    {products.map((product) => (
                                        <Card key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
                                        {/* Items per page info */}
                                        <div className="text-base-content opacity-70">
                                            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalProducts)}-
                                            {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts} products
                                        </div>

                                        {/* Pagination Controls */}
                                        <div className="flex items-center gap-2">
                                            {/* Previous Button */}
                                            <button
                                                onClick={goToPrevPage}
                                                disabled={currentPage === 1}
                                                className={`btn btn-sm ${currentPage === 1 ? 'btn-disabled' : 'btn-outline'}`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                </svg>
                                                Previous
                                            </button>

                                            {/* Page Numbers */}
                                            <div className="join">
                                                {getPageNumbers().map((pageNum, index) => (
                                                    pageNum === '...' ? (
                                                        <button key={`dots-${index}`} className="join-item btn btn-disabled btn-sm">
                                                            ...
                                                        </button>
                                                    ) : (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => goToPage(pageNum)}
                                                            className={`join-item btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-outline'}`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    )
                                                ))}
                                            </div>

                                            {/* Next Button */}
                                            <button
                                                onClick={goToNextPage}
                                                disabled={currentPage === totalPages}
                                                className={`btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : 'btn-outline'}`}
                                            >
                                                Next
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Page Jump */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-base-content opacity-70">Go to:</span>
                                            <input
                                                type="number"
                                                min="1"
                                                max={totalPages}
                                                value={currentPage}
                                                onChange={(e) => {
                                                    const page = parseInt(e.target.value)
                                                    if (page >= 1 && page <= totalPages) {
                                                        goToPage(page)
                                                    }
                                                }}
                                                className="input input-bordered input-sm w-20"
                                            />
                                            <span className="text-sm text-base-content opacity-70">/ {totalPages}</span>
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