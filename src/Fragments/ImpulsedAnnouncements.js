import axios from 'axios';
import React, { useEffect, useState } from 'react'
import backend from '../backend';
import modals from '../Modals';
import CardAnnoucement from './CardAnnoucement';

const ImpulsedAnnouncements = () => {

    const [ announcements, setAnnouncements ] = useState(null);

    useEffect(() => {
        async function getPremiumAnns() {
            try{
                const response = await axios.get(`${backend}/api/index/premium`);

                setAnnouncements(response.data);
    
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

        getPremiumAnns();
    }, []);

    return announcements ? (
        announcements.length > 0 ? (
            <div className='premium-container'>
                <h4>Anuncios premium</h4>
                <section className='premium-content'>
                    {
                        announcements.map((ann, index) => <CardAnnoucement ann={ann}/> )
                    }
                </section>
            </div>
        ) : null
    ) : (
        <div className='premium-container'>
            <h4>Anuncios premium</h4>
            <section className='premium-content'>
                <CardAnnoucement/> 
                <CardAnnoucement/> 
                <CardAnnoucement/> 
                <CardAnnoucement/> 
                <CardAnnoucement/> 
                <CardAnnoucement/> 
                <CardAnnoucement/> 
                <CardAnnoucement/> 
                <CardAnnoucement/> 
                <CardAnnoucement/> 

            </section>
        </div>
    )
}

export default ImpulsedAnnouncements