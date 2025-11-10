import React from 'react'

const Reviews = () => {
    return (
        <div className='py-10 px-5 md:px-14 bg-base-100'>
            <div className='text-center'>
                <h2 className="text-4xl font-bold mb-4 text-info">Trusted by Global Traders</h2>
                <p className="max-w-2xl mx-auto mb-12 text-gray-600">
                    From small exporters to global logistics brands — ShipSync keeps everyone connected and confident in every shipment.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/10 p-6 rounded-2xl">
                        <p className="italic mb-4">
                            “ShipSync saved us hours every week. now all our shipments are tracked in one place!”
                        </p>
                        <h4 className="font-semibold">Ziaur Rahman</h4>
                        <p className="text-sm text-gray-400">Ocean Trade Ltd.</p>
                    </div>

                    <div className="bg-white/10 p-6 rounded-2xl">
                        <p className="italic mb-4">
                            “Managing export documents and communication became 10x faster with ShipSync.”
                        </p>
                        <h4 className="font-semibold">Johran Mamdani</h4>
                        <p className="text-sm text-gray-400">SkyLine Logistics</p>
                    </div>

                    <div className="bg-white/10 p-6 rounded-2xl">
                        <p className="italic mb-4">
                            “The analytics dashboard helps us predict delays and improve delivery times.”
                        </p>
                        <h4 className="font-semibold">Nelson Mandela</h4>
                        <p className="text-sm text-gray-400">Global Freight Co.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews