import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import modals from '../Modals';
import LoadingPage from '../Pages/LoadingPage';

import backend from '../backend';


const LoggedRoute = ({ children,  to='/', notLoggedElement=null }) => {
    const token = localStorage.getItem('token');

    const [ response, setResponse ] = useState(null);
    const [ redirect, setRedirect ] = useState(null);

    useEffect(() => {
        const getUser = async() => {

            if(!token) return setRedirect(to);

            try {

                const response = await axios.get(`${backend}/api/user`, {
                    headers: {
                      Authorization: token
                    }
                });

                localStorage.setItem('user', JSON.stringify(response.data));    
                setResponse(response);
            }catch(err){
                if (err.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                    modals.toast(err.response.data, 'error');
                    //Modals.alert("Ups", `<b>[${err.response.status}]</b> ${err.response.data}`, 'error');
                } else if (err.request) {
                    // La solicitud fue hecha pero no se recibió respuesta
                    console.error('No se recibió respuesta del servidor:', err.request);
                    modals.toast(`No se recibió respuesta del servidor`, 'error');
                } else {
                    // Ocurrió un error antes de enviar la solicitud
                    console.error('Error al enviar la solicitud:', err.message);
                    modals.toast(`Error al enviar la solicitud: ${err.message}`, 'error');
                }

                setRedirect('/');
            }
        }

        getUser();
      
    }, [])

    return redirect 
        ? notLoggedElement ?
            notLoggedElement
            : <Navigate to={redirect}/> 
        : response
            ? children
            : <LoadingPage>Validando sesión, espere un momento...</LoadingPage>
}

export default LoggedRoute