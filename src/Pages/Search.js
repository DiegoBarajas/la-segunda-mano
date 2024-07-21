import React, { useEffect, useState } from 'react'
import CardAnnoucement from '../Fragments/CardAnnoucement'
import ColumnLayout from '../Layouts/ColumnLayout'
import { useLocation } from 'react-router-dom'
import PageLayout from '../Layouts/PageLayout'
import Filter from '../Fragments/Filter'

import backend from '../backend'
import modals from '../Modals'
import axios from 'axios'
import '../Styles/Pages/MyAnnoucements.css'

const useQuery = () => {
    document.title = 'La Segunda Mano - Buscar';
    const query = new URLSearchParams(useLocation().search)
    const queryObject = {}

    query.forEach((value, key) => {
        queryObject[key] = value
    });

    if(queryObject.nombre)
        window.localStorage.setItem('history', JSON.stringify( updateHistory(queryObject.nombre) ));

    return queryObject;
}

const Search = () => {
    const query = useQuery();
    const location = useLocation();

    const [ announcements, setAnnouncements ] = useState(null);
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    useEffect(() => {
        const getAnnucements = async() => {

            try{
                const response = await axios.get(`${backend}/api/announcement/${location.search}`, {
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

        getAnnucements();
    }, []);

    return (
        <PageLayout>
            <section className='content-with-aside'>
                <Filter/>

                {
                    announcements
                        ? (
                            <ColumnLayout className='column-content'>
                                <h2 className='h2-title-my-ann'>Coincidencias con la busqueda { announcements ? `(${announcements.length} resultados)` : null }</h2>
                                <section className='content-cards'>
                                    {
                                        announcements.map(ann => <CardAnnoucement ann={ann}/>)
                                    }
                                </section>
                                {
                                    announcements.length === 0
                                        ? <p style={{ marginTop: '50px' }}>No se encontrarón coincidencias.</p>
                                        : null
                                }
                            </ColumnLayout>
                        ) : (
                            <ColumnLayout className='column-content'>
                                <h2 className='h2-title-my-ann'>Coincidencias con la busqueda { announcements ? `(${announcements.length})` : null }</h2>

                                <section className='content-cards'>
                                    <CardAnnoucement/>
                                    <CardAnnoucement/>
                                    <CardAnnoucement/>
                                    <CardAnnoucement/>
                                    <CardAnnoucement/>
                                    <CardAnnoucement/>
                                </section>
                            </ColumnLayout>
                        )
                }
            </section>
        </PageLayout>
    )
}

export default Search

function updateHistory(nombre) {
    const history = JSON.parse(window.localStorage.getItem('history')) || [];
    const value = nombre.toUpperCase().trim();
    const index = history.findIndex(item => item.toUpperCase().trim() === value);
    
    if (index !== -1) {
        history.splice(index, 1);
        history.unshift(nombre);
    }else{
        history.unshift(nombre); 
    }

    return history;
}
  