import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DashboardHome = () => {
    const [products, setProducts] = useState([]);
    const [imports, setImports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalValue: 0,
        avgRating: 0,
        totalImports: 0
    });

    // Fetch all data
    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Fetch products (your exports)
                const productsRes = await fetch('https://ship-synce-api-server.vercel.app/products');
                const productsData = await productsRes.json();
                setProducts(productsData);

                // Fetch imports
                const importsRes = await fetch('https://ship-synce-api-server.vercel.app/imports');
                const importsData = await importsRes.json();
                setImports(importsData);

                // Calculate statistics
                const totalValue = productsData.reduce((sum, product) =>
                    sum + (parseFloat(product.price) || 0) * (parseInt(product.available_quantity) || 0), 0
                );
                const avgRating = productsData.length > 0
                    ? productsData.reduce((sum, product) => sum + (parseFloat(product.rating) || 0), 0) / productsData.length
                    : 0;

                setStats({
                    totalProducts: productsData.length,
                    totalValue,
                    avgRating: parseFloat(avgRating.toFixed(1)),
                    totalImports: importsData.length
                });

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const countryData = products.reduce((acc, product) => {
        const country = product.origin_country || 'Unknown';
        const existing = acc.find(item => item.name === country);
        if (existing) {
            existing.value += 1;
            existing.totalValue += (parseFloat(product.price) || 0) * (parseInt(product.available_quantity) || 0);
        } else {
            acc.push({
                name: country,
                value: 1,
                totalValue: (parseFloat(product.price) || 0) * (parseInt(product.available_quantity) || 0)
            });
        }
        return acc;
    }, []);

    const topProducts = [...products]
        .sort((a, b) =>
            (parseFloat(b.price) || 0) * (parseInt(b.available_quantity) || 0) -
            (parseFloat(a.price) || 0) * (parseInt(a.available_quantity) || 0)
        )
        .slice(0, 5)
        .map(product => ({
            name: product.product_name?.substring(0, 15) + (product.product_name?.length > 15 ? '...' : ''),
            value: (parseFloat(product.price) || 0) * (parseInt(product.available_quantity) || 0) / 1000000,
            quantity: parseInt(product.available_quantity) || 0,
            rating: parseFloat(product.rating) || 0
        }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-info mb-4"></div>
                    <p className="text-lg">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 md:p-6">
            <title>Dashboard || ShipSync</title>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent">
                        Dashboard Overview
                    </h1>
                    <p className="text-base-content/70">Track your export-import business performance at a glance</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="card bg-base-100 shadow-lg border-l-4 border-info">
                        <div className="card-body p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Total Products</p>
                                    <p className="text-3xl font-bold text-info">{stats.totalProducts}</p>
                                </div>
                                <div className="rounded-full bg-info/20 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg border-l-4 border-success">
                        <div className="card-body p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Total Value</p>
                                    <p className="text-3xl font-bold text-success">
                                        ৳{(stats.totalValue / 1000000).toFixed(2)}M
                                    </p>
                                </div>
                                <div className="rounded-full bg-success/20 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg border-l-4 border-warning">
                        <div className="card-body p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Avg. Rating</p>
                                    <p className="text-3xl font-bold text-warning">
                                        {stats.avgRating} ⭐
                                    </p>
                                </div>
                                <div className="rounded-full bg-warning/20 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg border-l-4 border-accent">
                        <div className="card-body p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Total Imports</p>
                                    <p className="text-3xl font-bold text-accent">{stats.totalImports}</p>
                                </div>
                                <div className="rounded-full bg-accent/20 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-lg font-bold mb-6">Products by Origin Country</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={countryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {countryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value, name) => [`${value} products`, 'Count']}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Bar Chart - Top Products by Value */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-lg font-bold mb-6">Top Products by Market Value (৳M)</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topProducts}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="name" stroke="#9CA3AF" />
                                        <YAxis stroke="#9CA3AF" />
                                        <Tooltip
                                            formatter={(value) => [`৳${value}M`, 'Value']}
                                            labelStyle={{ color: '#1F2937' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="value" fill="#3B82F6" name="Market Value ($M)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Products Table */}
                <div className="card bg-base-100 shadow-lg mb-10">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="card-title text-lg font-bold">Recent Products</h3>
                            <a href="/export" className="btn btn-info btn-sm">
                                View All
                            </a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Country</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Rating</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.slice(0, 5).map((product, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={product.product_image} alt={product.product_name} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{product.product_name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {product.origin_country}
                                                </div>
                                            </td>
                                            <td className="font-bold text-success">
                                                ৳{parseFloat(product.price).toLocaleString()}
                                            </td>
                                            <td>
                                                <div className={`badge ${parseInt(product.available_quantity) > 20 ? 'badge-success' : parseInt(product.available_quantity) > 10 ? 'badge-warning' : 'badge-error'}`}>
                                                    {product.available_quantity} units
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center">
                                                    <span className="text-yellow-500 mr-1">⭐</span>
                                                    {product.rating}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge badge-info badge-sm">
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-info/10 to-accent/10 rounded-2xl p-8">
                    <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to="/dashboard/exportProducts" className="btn btn-info btn-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Export Product
                        </Link>

                        <Link to="/allProducts" className="btn btn-accent btn-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Browse Products
                        </Link>
                        <Link to="/dashboard/myImports" className="btn btn-success btn-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                            My Imports
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;