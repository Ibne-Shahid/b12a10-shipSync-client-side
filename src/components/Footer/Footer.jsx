import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-blue-300 text-base-content rounded p-10">
            <nav className="grid grid-flow-col gap-4 font-semibold">
                <Link to="/aboutUs" className="link link-hover">About us</Link>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 1227"
                            width="24"
                            height="24"
                            className="fill-current"
                        >
                            <path d="M714.163 519.284 1160.89 0H1058.24L667.137 450.887 356.205 0H0L468.901 681.821 0 1226.37h102.653l412.46-480.678L843.795 1226.37H1200L714.137 519.284h.026Zm-146.005 170.09-47.826-67.875-380.65-540.867h163.99l307.252 437.278 47.826 67.875 403.217 573.049h-163.99l-329.819-469.46Z" />
                        </svg>


                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by ShipSync.</p>
            </aside>
        </footer>
    )
}

export default Footer