import React from 'react'
import { FaShip, FaGlobeAmericas, FaShieldAlt, FaUsers, FaTrophy, FaHandshake } from 'react-icons/fa'
import { Link } from 'react-router'

const AboutUs = () => {
    const teamMembers = [
        { name: "John Smith", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Sarah Johnson", role: "Head of Operations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Michael Chen", role: "Tech Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Emma Wilson", role: "Customer Success", image: "https://www.rsc.org/getContentAsset/401badbd-8a84-afe3-3913-4d6b8ada9c6a/97c19dfb-06fc-4638-b657-b9d8300eab48/0702-emma-wilson-senior-leadership-team_f2-1200.jpg?language=en" },
    ]

    const stats = [
        { number: "500+", label: "Active Exporters" },
        { number: "1000+", label: "Products Listed" },
        { number: "50+", label: "Countries" },
        { number: "98%", label: "Success Rate" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8 px-4">
            <title>About Us || ShipSync</title>
            
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="h-1 w-10 bg-info rounded-full"></div>
                        <span className="text-info font-medium">Our Story</span>
                        <div className="h-1 w-10 bg-info rounded-full"></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-6 bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent">
                        About ShipSync
                    </h1>
                    <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
                        Connecting global markets through seamless export-import solutions. 
                        Making international trade accessible to businesses of all sizes.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-8">
                            <div className="flex items-center mb-6">
                                <div className="rounded-full bg-info/20 p-4 mr-4">
                                    <FaShip className="text-info text-2xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Our Mission</h2>
                            </div>
                            <p className="text-lg leading-relaxed">
                                To democratize international trade by providing small and medium businesses 
                                with the tools, platform, and support needed to export and import products 
                                globally without the traditional barriers of cross-border commerce.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-8">
                            <div className="flex items-center mb-6">
                                <div className="rounded-full bg-success/20 p-4 mr-4">
                                    <FaGlobeAmericas className="text-success text-2xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Our Vision</h2>
                            </div>
                            <p className="text-lg leading-relaxed">
                                To become the world's most trusted platform for cross-border trade, 
                                connecting millions of businesses worldwide and creating economic 
                                opportunities in every corner of the globe.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Our Impact in Numbers</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="card bg-gradient-to-br from-base-100 to-base-200 border border-base-300">
                                <div className="card-body text-center">
                                    <p className="text-4xl font-bold text-info mb-2">{stat.number}</p>
                                    <p className="text-base-content/70">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="rounded-full bg-info/20 p-4">
                                        <FaShieldAlt className="text-info text-2xl" />
                                    </div>
                                </div>
                                <h3 className="card-title text-lg font-bold text-center mb-3">Trust & Security</h3>
                                <p className="text-center text-base-content/70">
                                    Ensuring secure transactions and building trust between international partners.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="rounded-full bg-success/20 p-4">
                                        <FaUsers className="text-success text-2xl" />
                                    </div>
                                </div>
                                <h3 className="card-title text-lg font-bold text-center mb-3">Community First</h3>
                                <p className="text-center text-base-content/70">
                                    Building a supportive community where businesses grow together.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="rounded-full bg-warning/20 p-4">
                                        <FaTrophy className="text-warning text-2xl" />
                                    </div>
                                </div>
                                <h3 className="card-title text-lg font-bold text-center mb-3">Excellence</h3>
                                <p className="text-center text-base-content/70">
                                    Striving for excellence in every transaction and customer interaction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Meet Our Leadership Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <figure className="px-6 pt-6">
                                    <div className="avatar">
                                        <div className="w-32 h-32 rounded-full ring ring-info ring-offset-2">
                                            <img src={member.image} alt={member.name} />
                                        </div>
                                    </div>
                                </figure>
                                <div className="card-body items-center text-center pt-4">
                                    <h3 className="card-title font-bold">{member.name}</h3>
                                    <p className="text-info font-medium">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="card bg-gradient-to-r from-info/20 to-accent/20 border border-info/30">
                    <div className="card-body p-10 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-info/20 p-6">
                                <FaHandshake className="text-info text-4xl" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Ready to Join Our Global Community?</h2>
                        <p className="text-xl text-base-content/80 mb-8 max-w-2xl mx-auto">
                            Whether you're looking to export your products worldwide or import quality 
                            goods from international markets, ShipSync is here to make it happen.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/dashboard/exportProducts" className="btn btn-info btn-lg">Start Exporting</Link>
                            <Link to="/allProducts" className="btn btn-outline btn-info btn-lg">Browse Products</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs