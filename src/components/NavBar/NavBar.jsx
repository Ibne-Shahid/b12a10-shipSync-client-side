import React, { use, useEffect, useState } from 'react'
import { PiFinnTheHumanFill } from 'react-icons/pi'
import { Link, NavLink } from 'react-router'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast } from 'react-toastify'


const NavBar = () => {

    const { user, logOut, loading } = use(AuthContext)
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    )
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("You have been logged out successfully!")
            })
            .catch((error) => {
                const errorMessage = error.message
                toast.error(errorMessage)
            })
    }

    return (
        <div className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-base-100/95 backdrop-blur-sm shadow-lg border-b border-base-300' : 'bg-sky-200'} px-4 md:px-8 lg:px-14`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg">
                        <li className='font-semibold'>
                            <NavLink 
                                className={({ isActive }) => isActive ? "bg-accent " : "text-base-content"}
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className='font-semibold'>
                            <NavLink 
                                className={({ isActive }) => isActive ? "bg-accent " : "text-base-content"}
                                to="/allProducts"
                            >
                                All Products
                            </NavLink>
                        </li>
                        {
                            user && user.email && (
                                <li className='font-semibold'>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? "bg-accent " : "text-base-content"}
                                        to="/dashboard"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost text-xl p-0">
                    <span className="bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent font-bold">
                        ShipSync
                    </span>
                </NavLink>
            </div>
            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-2 px-1">
                    <li className='font-semibold'>
                        <NavLink 
                            className={({ isActive }) => isActive ? "btn btn-accent " : "btn btn-ghost"}
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className='font-semibold'>
                        <NavLink 
                            className={({ isActive }) => isActive ? "btn btn-accent " : "btn btn-ghost"}
                            to="/allProducts"
                        >
                            All Products
                        </NavLink>
                    </li>
                    {
                        user && user.email && (
                            <li className='font-semibold'>
                                <NavLink 
                                    className={({ isActive }) => isActive ? "btn btn-accent " : "btn btn-ghost"}
                                    to="/dashboard"
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
            </div>
            
            <div className="navbar-end gap-2">
                {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme} 
                    className='btn btn-ghost btn-circle btn-sm md:btn-md'
                    aria-label="Toggle theme"
                >
                    {theme === "light" ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.485-8.485h1M3.515 12.515h1M16.95 7.05l.707-.707M6.343 17.657l.707-.707M16.95 16.95l.707.707M6.343 6.343l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                    }
                </button>

                {/* User Profile & Auth - Desktop */}
                <div className='hidden md:flex items-center gap-2'>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : user?.photoURL ? (
                                    <img src={user.photoURL} alt="User Profile" />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-base-300">
                                        <PiFinnTheHumanFill size={24} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            {user && user.email ? (
                                <>
                                    <li className='border-b border-base-300 pb-2'>
                                        <div className='flex flex-col'>
                                            <span className='font-semibold'>{user.displayName || 'User'}</span>
                                            <span className='text-xs text-base-content/70 truncate'>{user.email}</span>
                                        </div>
                                    </li>
                                    <li><button onClick={handleLogout} className='text-error'>Logout</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/login" className='text-info'>Login</Link></li>
                                    <li><Link to="/register" className='text-success'>Register</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* User Profile & Auth - Mobile */}
                <div className='md:hidden flex items-center gap-2'>
                    {user && user.email ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="w-9 rounded-full">
                                    {loading ? (
                                        <span className="loading loading-spinner loading-xs"></span>
                                    ) : user?.photoURL ? (
                                        <img src={user.photoURL} alt="User Profile" />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full bg-base-300">
                                            <PiFinnTheHumanFill size={20} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-48 p-2 shadow">
                                <li><button onClick={handleLogout} className='text-error'>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className='btn btn-info btn-sm'>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavBar