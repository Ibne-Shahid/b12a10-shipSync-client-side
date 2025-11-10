import React from 'react'

const HowItWorks = () => {
    return (
        <div className='py-10 px-5 md:px-14'>
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-info mb-4">Sync Every Step of Your Trade Journey</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    From shipment tracking to smart documentation — ShipSync connects your import, export, and logistics operations in one seamless platform.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <div className="text-blue-600 text-4xl mb-4">🌍</div>
                        <h3 className="font-semibold text-lg mb-2">Global Tracking</h3>
                        <p className="text-gray-500">Monitor every shipment in real time and stay updated with accurate location data.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <div className="text-blue-600 text-4xl mb-4">🧾</div>
                        <h3 className="font-semibold text-lg mb-2">Smart Documentation</h3>
                        <p className="text-gray-500">Manage all trade papers, invoices, and customs docs from one secure dashboard.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <div className="text-blue-600 text-4xl mb-4">⚡</div>
                        <h3 className="font-semibold text-lg mb-2">Instant Communication</h3>
                        <p className="text-gray-500">Keep importers, exporters, and logistics teams in perfect sync with real-time messaging.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <div className="text-blue-600 text-4xl mb-4">📈</div>
                        <h3 className="font-semibold text-lg mb-2">Trade Analytics</h3>
                        <p className="text-gray-500">Track performance, analyze trends, and make smarter trade decisions faster.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks