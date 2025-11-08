import React, { use } from 'react'
import { AuthContext } from './AuthProvider'
import Loader from '../components/Loader/Loader'
import { Navigate, useLocation } from 'react-router'

const PrivateRout = ({children}) => {
  
    const {user, loading} =  use(AuthContext)
    const location = useLocation()

    if(loading) return <Loader></Loader>

    if(user && user?.email) return children

    return <Navigate state={location.pathname} to="/login"></Navigate>

}

export default PrivateRout