import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRouteAdmin({element}) {


    const {loggedIn,user} = useAuth()

   
        
    return loggedIn && user.role ==="admin" ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRouteAdmin