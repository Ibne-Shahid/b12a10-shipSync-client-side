import { Link, Outlet } from "react-router"
import Footer from "../../components/Footer/Footer"
import { TbPackageExport } from "react-icons/tb";
import { AiOutlineExport } from "react-icons/ai";
import { LiaFileImportSolid } from "react-icons/lia";

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4"><Link to='/'><h1 className="btn btn-ghost text-xl bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent">ShipSync</h1></Link></div>
                </nav>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">

                        <Link to="/dashboard">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </button>
                            </li>
                        </Link>

                        <Link to="/dashboard/exportProducts">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Export Product">
                                    <TbPackageExport />
                                    <span className="is-drawer-close:hidden">Export Product</span>
                                </button>
                            </li>
                        </Link>

                        <Link to="/dashboard/myExports">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Exports">
                                    <AiOutlineExport />
                                    <span className="is-drawer-close:hidden">My Exports</span>
                                </button>
                            </li>
                        </Link>

                        <Link to="/dashboard/myImports">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Imports">
                                    <LiaFileImportSolid />
                                    <span className="is-drawer-close:hidden">My Imports</span>
                                </button>
                            </li>
                        </Link>


                        <Link to="/">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Back">
                                    {/* Back Button */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l-7-7 7-7" />
                                    </svg>

                                    <span className="is-drawer-close:hidden">Back</span>
                                </button>

                            </li>
                        </Link>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard