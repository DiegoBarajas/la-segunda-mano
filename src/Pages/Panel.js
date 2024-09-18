import React, { useEffect, useState } from 'react'

import ManageBanners from '../Fragments/ManageBanners'
import ManageReports from '../Fragments/ManageReports'
import ManageUsers from '../Fragments/ManageUsers'
import PageLayout from '../Layouts/PageLayout'
import { Navigate } from 'react-router-dom'
import Title from '../Components/Title'
import LoadingPage from './LoadingPage'

import axios from 'axios'
import modals from '../Modals'
import backend from '../backend'

import '../Styles/Pages/Panel.css'

const Panel = () => {

    document.title = "La Segunda Mano - Panel"

    const [ permiso, setPermiso ] = useState(null);
    const [ redirect, setRedirect ] = useState(null);

    useEffect(() => {
        async function getAnns() {
            try{
                const response = await axios.get(`${backend}/api/user/permiso`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                if((!response.data) && (response.data !== 'admin') && (response.data !== 'moderator')){ 
                    modals.toast("Permiso denegado", "Error");
                    setRedirect('/');
                }

                setPermiso(response.data);
            }catch(err){
    
                if (err.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                    modals.alert("Ups", `${err.response.data}`, 'error');
                    //Modals.alert("Ups", `<b>[${err.response.status}]</b> ${err.response.data}`, 'error');
                } else if (err.request) {
                    // La solicitud fue hecha pero no se recibió respuesta
                    console.error('No se recibió respuesta del servidor:', err.request);
                    modals.alert("Ha ocurrido un error", `No se recibió respuesta del servidor`, 'error');
                } else {
                    // Ocurrió un error antes de enviar la solicitud
                    console.error('Error al enviar la solicitud:', err.message);
                    modals.alert("Ha ocurrido un error", `<b>Error al enviar la solicitud</b> ${err.message}`, 'error');
                }
            }
        }

        getAnns();
    }, []);

    return permiso ? (
        <PageLayout>
            
            <Title>Panel de {parsePermiso(permiso)}</Title>
            {
                permiso === 'admin' 
                    ? <ManageBanners/>
                    : null
            }

            <ManageReports/>

            {
                permiso === 'admin' 
                    ? <ManageUsers/>
                    : null
            }


            { redirect ? <Navigate to={redirect}/> : null }
        </PageLayout>
    ) : <LoadingPage> Verificando permisos, espere un momento... </LoadingPage>
}

export default Panel

function parsePermiso(p){
    if(p === 'admin') return "Administrador"
    if(p === 'moderator') return "Moderador"
    else return "Si"

}
