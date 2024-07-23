import React, { useEffect, useState } from 'react'
import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import ColumnLayout from '../Layouts/ColumnLayout'
import Notification from '../Fragments/Notification'

import modals from '../Modals';
import axios from 'axios'
import backend from '../backend'

const MyNotifications = () => {
    document.title = 'La Segunda Mano - Notificaciones ';

    const [ notifications, setNotifications ] = useState(null);

    useEffect(() => {
        const getNotifications = async() => {
            try{
                const { data } = await axios.get(`${backend}/api/notification`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                setNotifications(data);
            }catch(err){

                if (err.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                    modals.alert("Ups", `${err.response.data}`, 'error', 'Volver al incio')
                        .then((answer) => {
                            if(answer.isConfirmed){
                                window.location.href = '/';
                            }
                        });
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

        getNotifications();
    }, []);

    return (
        <PageLayout>
            <h1>Mis notificaciones</h1>

            <ContentLayout horizontalAlign='center'>

                {
                    notifications
                        ? (
                            <ColumnLayout width='100%'>
                                {
                                    notifications.map((n, index) =>
                                        <Notification
                                            notification={n}
                                        />
                                    )
                                }
                                {
                                    notifications.length > 0
                                        ? null
                                        : <p>No tienes notificaciones.</p>
                                }
                            </ColumnLayout>
                        ) : (
                            <p>Cargando notificaciones...</p>
                        )
                }

            </ContentLayout>
        </PageLayout>
    )
}

export default MyNotifications