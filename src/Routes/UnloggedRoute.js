import React from 'react'
import { Navigate } from 'react-router-dom'

const UnloggedRoute = ({ children }) => {
    return localStorage.getItem('token') ? <Navigate to='/' /> : children
}

export default UnloggedRoute