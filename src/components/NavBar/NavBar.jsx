import React, { use } from 'react'
import { PiFinnTheHumanFill } from 'react-icons/pi'
import { Link, NavLink } from 'react-router'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast } from 'react-toastify'


const NavBar = () => {

    const { user, logOut, loading } = use(AuthContext)

    const handleLogout = ()=>{
        logOut()
        .then(()=>{
            toast.success("You have been logged out succesfully!")
        })
        .catch((error) => {
                const errorMessage = error.message

                toast.error(errorMessage)
            })
    }

    return (
        <div className="navbar bg-sky-100 shadow-sm px-5 md:px-14">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="/">Home</NavLink></li>
                        <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="/allProducts">All Products</NavLink></li>
                        <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="/myImports">My Imports</NavLink></li>
                        <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="myExports">My Exports</NavLink></li>
                        <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="/exportProducts">Export Products</NavLink></li>
                    </ul>
                </div>
                <NavLink to="/"><a className="btn btn-ghost text-xl bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent">ShipSync</a></NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-3 px-1">
                    <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="/">Home</NavLink></li>
                    <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="/allProducts">All Products</NavLink></li>
                    <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="/myImports">My Imports</NavLink></li>
                    <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="myExports">My Exports</NavLink></li>
                    <li className='font-semibold'><NavLink className={({ isActive }) => isActive ? "bg-accent text-white" : "text-accent"} to="/exportProducts">Export Products</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">

                <div className='hidden md:block'>
                    <div className='flex items-center justify-center gap-3'>
                        <div className='mr-3 bg-gray-300 p-1 rounded-full'>
                            {loading ? <span className="loading loading-spinner loading-xl"></span> : user ? <img className='w-10 rounded-full' src={user?.photoURL} alt="" /> : <PiFinnTheHumanFill size={35} />}
                        </div>
                        
                        {user && user.email ? <button onClick={handleLogout} className='btn btn-soft btn-accent'>Logout</button> : <>
                            <Link className='btn btn-soft btn-info' to="/login">Login</Link>
                            <Link className="btn btn-soft btn-success" to="/register">Register</Link></>}

                    </div>
                </div>

                <div className='md:hidden'>
                    <div className='flex items-center justify-center gap-3'>
                        <div className='mr-3 bg-gray-300 p-1 rounded-full'>
                            {loading ? <span className="loading loading-spinner loading-xl"></span> : user ? <img className='w-10 rounded-full' src={user?.photoURL} alt="" /> : <PiFinnTheHumanFill size={35} />}
                        </div>

                        {user && user.email ? <button onClick={handleLogout} className='btn btn-soft btn-accent'>Logout</button> : <Link className='btn btn-soft btn-info' to="/login">Login</Link>}
                        
                    </div>
                </div>


            </div>
        </div>
    )
}

export default NavBar