import React, { use } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate, useLocation } from 'react-router'

const PrivateRout = ({children}) => {
  
    const {user, loading} =  use(AuthContext)
    const location = useLocation()

    if(loading) return <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

    if(user && user?.email) return children

    return <Navigate state={location.pathname} to="/login"></Navigate>

}

export default PrivateRout