import React, { useEffect, useState } from 'react'
import AnnoucementMyAnn from '../Fragments/AnnoucementMyAnn'
import ColumnLayout from '../Layouts/ColumnLayout'
import { Link, useLocation } from 'react-router-dom'
import PageLayout from '../Layouts/PageLayout'
import Filter from '../Fragments/Filter'

import backend from '../backend'
import modals from '../Modals'
import axios from 'axios'

import '../Styles/Pages/MyAnnoucements.css'

const MyAnnoucements = () => {

    const location = useLocation();
    const [ announcements, setAnnouncements ] = useState(null);

    useEffect(() => {
        const getMyAnnucements = async() => {

            console.log(location.search);

            try{
                const response = await axios.get(`${backend}/api/announcement/user/token/${location.search}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                setAnnouncements(response.data);
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

        getMyAnnucements();
    }, []);

    return (
        <PageLayout>
            <section className='content-with-aside'>
                <Filter/>

                {
                    announcements
                        ? (
                            <ColumnLayout className='column-content'>
                                <h2 className='h2-title-my-ann'>Mis anuncios { announcements ? `(${announcements.length} resultados)` : null }</h2>
                                {
                                    announcements.map(ann => <AnnoucementMyAnn ann={ann}/>)
                                }
                                {
                                    announcements.length === 0
                                        ? location.search.length === 0
                                            ? <p style={{ marginTop: '50px' }}>No tienes anuncios activos. <Link to='/vender'>Crear un anuncio</Link></p>
                                            : <p style={{ marginTop: '50px' }}>No se encontrarón coincidencias.</p>
                                        : null
                                }
                            </ColumnLayout>
                        ) : (
                            <ColumnLayout className='column-content'>
                                <h2 className='h2-title-my-ann'>Mis anuncios { announcements ? `(${announcements.length})` : null }</h2>

                                <AnnoucementMyAnn/>
                                <AnnoucementMyAnn/>
                                <AnnoucementMyAnn/>
                                <AnnoucementMyAnn/>
                            </ColumnLayout>
                        )
                }
            </section>
        </PageLayout>
    )
}

export default MyAnnoucements