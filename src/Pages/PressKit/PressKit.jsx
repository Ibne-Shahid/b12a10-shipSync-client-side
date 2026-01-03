import React from 'react';
import { 
  Download, 
  FileText, 
  Image, 
  Users, 
  Globe, 
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Building,
  Award,
  Newspaper,
  Video,
  BarChart3,
  FileSpreadsheet,
  ChevronRight,
  Link,
  CheckCircle,
  Package
} from 'lucide-react';

const PressKit = () => {
  // Sample data
  const companyInfo = {
    founded: "2018",
    employees: "250+",
    countries: "50+",
    shipments: "100,000+",
    funding: "$25M Series B"
  };

  const pressReleases = [
    {
      id: 1,
      title: "ShipSync Raises $25M Series B to Expand Global Trade Platform",
      date: "2024-03-15",
      category: "Funding",
      summary: "Funding will accelerate expansion into emerging markets and enhance AI-powered logistics solutions.",
      downloads: ["PDF", "DOCX"]
    },
    {
      id: 2,
      title: "ShipSync Partners with 10 New Logistics Companies Across Asia",
      date: "2024-02-28",
      category: "Partnership",
      summary: "Strategic partnerships to streamline cross-border trade in Southeast Asia.",
      downloads: ["PDF", "DOCX"]
    },
    {
      id: 3,
      title: "Quarterly Growth Report Q1 2024 Shows 45% YoY Increase",
      date: "2024-01-20",
      category: "Financial",
      summary: "Record growth driven by increased adoption in small and medium businesses.",
      downloads: ["PDF", "XLSX", "DOCX"]
    }
  ];

  const mediaAssets = [
    {
      type: "Logo",
      formats: ["SVG", "PNG", "AI"],
      description: "Official ShipSync logos in all color variations",
      preview: "/assets/logo-preview.png"
    },
    {
      type: "Brand Photos",
      formats: ["JPG", "PNG"],
      description: "High-resolution images of team, offices, and platform",
      preview: "/assets/photos-preview.png"
    },
    {
      type: "Product Screenshots",
      formats: ["JPG", "PNG"],
      description: "Updated platform screenshots and interface mockups",
      preview: "/assets/screenshots-preview.png"
    },
    {
      type: "Executive Headshots",
      formats: ["JPG", "PNG"],
      description: "High-resolution photos of leadership team",
      preview: "/assets/headshots-preview.png"
    }
  ];

  const leadershipTeam = [
    {
      name: "Alex Morgan",
      role: "CEO & Founder",
      bio: "Former logistics executive with 15+ years in international trade.",
      contact: "alex@shipsync.com",
      photo: "https://b.fssta.com/uploads/application/soccer/headshots/10728.png"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "AI and logistics technology expert from Stanford University.",
      contact: "sarah@shipsync.com",
      photo: "https://dentons.rodyk.com/-/media/images/website/person-images/c/ce-ch/chan_sarah.ashx"
    },
    {
      name: "Marcus Johnson",
      role: "COO",
      bio: "Operations specialist with extensive supply chain management experience.",
      contact: "marcus@shipsync.com",
      photo: "https://m.media-amazon.com/images/M/MV5BOWY5ZjkzMzgtZDg3NC00YTNhLTk3YTQtZGY0ZjU5OWNiMmQ4XkEyXkFqcGc@._V1_CR92,1,394,591_.jpg"
    }
  ];

  const quickFacts = [
    "Founded in 2018",
    "Headquartered in New York, USA",
    "250+ employees globally",
    "Active in 50+ countries",
    "100,000+ shipments processed",
    "$25M in Series B funding",
    "ISO 27001 certified"
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-focus text-primary-content py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Newspaper className="w-8 h-8" />
              <span className="badge badge-outline badge-accent">Media Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ShipSync Press Kit
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Everything journalists and media professionals need to write about ShipSync's impact on global trade.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-accent btn-lg">
                <Download className="w-5 h-5 mr-2" />
                Download Full Press Kit
              </button>
              <button className="btn btn-outline btn-lg btn-accent">
                <Mail className="w-5 h-5 mr-2" />
                Media Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Building className="w-8 h-8 text-primary mb-2" />
              <div className="stat-value text-primary">{companyInfo.founded}</div>
              <div className="stat-title text-base-content opacity-70">Founded</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Users className="w-8 h-8 text-secondary mb-2" />
              <div className="stat-value text-secondary">{companyInfo.employees}</div>
              <div className="stat-title text-base-content opacity-70">Employees</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Globe className="w-8 h-8 text-accent mb-2" />
              <div className="stat-value text-accent">{companyInfo.countries}</div>
              <div className="stat-title text-base-content opacity-70">Countries</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Package className="w-8 h-8 text-info mb-2" />
              <div className="stat-value text-info">{companyInfo.shipments}</div>
              <div className="stat-title text-base-content opacity-70">Shipments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Quick Facts & Contact */}
          <div className="lg:col-span-1">
            {/* Contact Information */}
            <div className="card bg-base-200 shadow-lg sticky top-8">
              <div className="card-body">
                <h3 className="card-title text-lg font-bold mb-6 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Media Contact
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-base-content mb-1">Press Inquiries</p>
                    <a href="mailto:press@shipsync.com" className="link link-accent">
                      press@shipsync.com
                    </a>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-base-content mb-1">Phone</p>
                    <a href="tel:+18005551234" className="link link-accent">
                      +1 (800) 555-1234
                    </a>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-base-content mb-1">Address</p>
                    <p className="text-base-content opacity-70">
                      123 Trade Center Plaza<br />
                      New York, NY 10001, USA
                    </p>
                  </div>
                  
                  <div className="divider"></div>
                  
                  <div>
                    <p className="font-semibold text-base-content mb-2">Follow Us</p>
                    <div className="flex gap-3">
                      <button className="btn btn-sm btn-outline">Twitter</button>
                      <button className="btn btn-sm btn-outline">LinkedIn</button>
                      <button className="btn btn-sm btn-outline">YouTube</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="card bg-base-200 shadow-lg mt-8">
              <div className="card-body">
                <h3 className="card-title text-lg font-bold mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Quick Facts
                </h3>
                
                <ul className="space-y-3">
                  {quickFacts.map((fact, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-base-content opacity-80">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brand Guidelines */}
            <div className="card bg-base-200 shadow-lg mt-8">
              <div className="card-body">
                <h3 className="card-title text-lg font-bold mb-6">Brand Guidelines</h3>
                
                <div className="space-y-4">
                  <a href="#" className="flex items-center justify-between p-3 hover:bg-base-300 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="font-medium">Brand Style Guide</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </a>
                  
                  <a href="#" className="flex items-center justify-between p-3 hover:bg-base-300 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-secondary" />
                      <span className="font-medium">Market Data</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </a>
                  
                  <a href="#" className="flex items-center justify-between p-3 hover:bg-base-300 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="w-5 h-5 text-accent" />
                      <span className="font-medium">Financial Reports</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Press Releases */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-base-content flex items-center gap-3">
                  <Newspaper className="w-6 h-6" />
                  Latest Press Releases
                </h2>
                <button className="btn btn-outline btn-sm">
                  View Archive
                </button>
              </div>

              <div className="space-y-6">
                {pressReleases.map((release) => (
                  <div key={release.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="card-body">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="badge badge-accent">{release.category}</span>
                            <span className="text-sm text-base-content opacity-70 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {release.date}
                            </span>
                          </div>
                          
                          <h3 className="card-title text-lg mb-3">
                            {release.title}
                          </h3>
                          
                          <p className="text-base-content opacity-80 mb-4">
                            {release.summary}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <div className="flex flex-wrap gap-2">
                            {release.downloads.map((format, idx) => (
                              <button key={idx} className="btn btn-outline btn-sm">
                                {format}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Media Assets */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-base-content mb-8 flex items-center gap-3">
                <Image className="w-6 h-6" />
                Media Assets
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaAssets.map((asset, index) => (
                  <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
                    <figure className="h-48 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                      <div className="text-center">
                        <Image className="w-12 h-12 mx-auto mb-3 text-base-content opacity-50" />
                        <p className="text-sm text-base-content opacity-70">Preview</p>
                      </div>
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title">{asset.type}</h3>
                      <p className="text-base-content opacity-70 mb-4">
                        {asset.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {asset.formats.map((format, idx) => (
                          <span key={idx} className="badge badge-outline">
                            {format}
                          </span>
                        ))}
                      </div>
                      
                      <div className="card-actions">
                        <button className="btn btn-accent btn-sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download All
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Leadership Team */}
            <section>
              <h2 className="text-2xl font-bold text-base-content mb-8 flex items-center gap-3">
                <Users className="w-6 h-6" />
                Leadership Team
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {leadershipTeam.map((member, index) => (
                  <div key={index} className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                      <div className="flex items-start gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-accent text-accent-content rounded-full w-16">
                            <img src={member.photo} alt="" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="card-title text-lg">{member.name}</h3>
                          <p className="text-accent font-medium mb-2">{member.role}</p>
                          <p className="text-base-content opacity-70 mb-4">
                            {member.bio}
                          </p>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${member.contact}`} className="link link-accent">
                              {member.contact}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards & Recognition */}
            <div className="card bg-accent text-accent-content shadow-2xl">
              <div className="card-body">
                <h3 className="card-title text-xl flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6" />
                  Awards & Recognition
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-accent-focus rounded-lg">
                    <div className="text-3xl font-bold mb-2">#1</div>
                    <p className="font-medium">Logistics Innovation 2023</p>
                  </div>
                  
                  <div className="text-center p-4 bg-accent-focus rounded-lg">
                    <div className="text-3xl font-bold mb-2">Top 10</div>
                    <p className="font-medium">Tech Startups to Watch</p>
                  </div>
                  
                  <div className="text-center p-4 bg-accent-focus rounded-lg">
                    <div className="text-3xl font-bold mb-2">Best</div>
                    <p className="font-medium">Supply Chain Solution 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body py-12">
              <h2 className="text-3xl font-bold text-base-content mb-6">
                Need Custom Media Materials?
              </h2>
              <p className="text-xl text-base-content opacity-70 mb-8 max-w-2xl mx-auto">
                Our PR team can provide custom quotes, interviews, or exclusive data for your story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-accent btn-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Request Interview
                </button>
                <button className="btn btn-info btn-outline btn-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressKit;