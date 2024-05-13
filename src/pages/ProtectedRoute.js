import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoute({element,admin}) {


    const {loggedIn} = useAuth()

   
        
    return loggedIn ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoute