import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import modals from '../Modals';
let salio = false;

const Logout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('popupWarnActive')

    useEffect(() => {
        if(!salio){
            salio = true;
            modals.toast('Sesión cerrada', 'success', 1);
        }
    })

    return (
        <Navigate to='/' />
    )
}

export default Logout