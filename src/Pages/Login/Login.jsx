import React, { use, useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast } from 'react-toastify'

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const {logIn, signInWithGoogle, setUser, resetPassword} = use(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const emailRef = useRef(null)

    const togglePassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleLogIn = (e)=>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);
        

        logIn(email, password)
        .then((result)=>{
            const user = result.user
            form.reset()

            toast.success(`Login Successful. Welcome ${user?.displayName}`)
            navigate(`${location.state ? location.state : "/"}`)
        })
        .catch((err)=>{
            const errorMessage = err.message

            toast.error(errorMessage)
        })
    }

    const handleGoogleSignIn = ()=>{
        signInWithGoogle()
        .then((result)=>{
            const user = result.user
            setUser(user)
            toast.success(`Login Successful. Welcome ${user?.displayName}`)
            navigate(`${location.state ? location.state : "/"}`)
        })
        .catch((err)=>{
            const errorMessage = err.message

            toast.error(errorMessage)
        })
    }

    const handleResetPassword = ()=>{
        const email = emailRef.current.value

        if(!email){
            toast.error('Please enter your email first!')
            return
        }

        resetPassword(email)
        .then(()=>{
            toast.success('Password reset email sent.')
        })
        .catch(err=>{
            toast.error(err.message)
        })
    }

    return (
        <div className='flex justify-center py-20'>


            <div className='fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4'>
                <form onSubmit={handleLogIn}>
                    <h1 className='text-2xl font-bold text-center mb-5'>Login Your Account</h1>

                    <label className="label">Email Adress</label>
                    <input ref={emailRef} type="email" name="email" className="input" placeholder="Email" required />

                    <label className="label">Password</label>
                    <div className='relative'>
                        <input type={!showPassword ? "password" : "text"} name="password" className="input" placeholder="Password" required />
                        <button onClick={togglePassword} className='btn btn-xs bg-gray-200 border-0 absolute top-2 right-2'>{!showPassword ? <FaEye /> : <FaEyeSlash />}</button>
                    </div>


                    <a onClick={handleResetPassword} className='link link-hover'>Forgot Password?</a>
                    <button type="submit" className="btn btn-info w-full text-white mt-3">Login</button>
                    <button onClick={handleGoogleSignIn} className="btn bg-white mt-2 w-full text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <p className='mt-3'>Doesn't have an account? <Link state={location.state ? location.state : "/"} to="/register"><span className='text-success'>Register</span></Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login