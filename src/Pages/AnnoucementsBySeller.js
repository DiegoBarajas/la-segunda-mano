import React, { useEffect, useState } from 'react'
import AnnoucementMyAnn from '../Fragments/AnnoucementMyAnn'
import ColumnLayout from '../Layouts/ColumnLayout'
import { useParams } from 'react-router-dom'
import PageLayout from '../Layouts/PageLayout'

import accountSvg from '../Assets/Icons/account.svg'

import backend from '../backend'
import modals from '../Modals'
import axios from 'axios'

import '../Styles/Pages/MyAnnoucements.css'

const AnnoucementsBySeller = () => {
    document.title = 'La Segunda Mano - Anuncios del usuario ';

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    const [ announcements, setAnnouncements ] = useState(null);
    const [ seller, setSeller ] = useState(null);

    useEffect(() => {
        const getMyAnnucements = async() => {

            try{
                const response = await axios.get(`${backend}/api/announcement/seller/${id}`);
                document.title = `La Segunda Mano - Anuncios de ${response.data.seller.nombre} ${response.data.seller.apellido}`;

                console.log(response.data);

                setAnnouncements(response.data.annoucements);
                setSeller(response.data.seller);
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

                {
                    announcements
                        ? (
                            <ColumnLayout className='column-content'>
                                <h2 className='h2-title-my-ann h2-seller' style={{ textAlign: 'center' }}> <img className='pic-seller' src={seller.foto ? seller.foto : accountSvg} alt='Foto de perfil' /> Anuncios de {seller.nombre} {seller.apellido} { announcements ? `(${announcements.length} resultados)` : null }</h2>
                                {
                                    announcements.map(ann => <AnnoucementMyAnn ann={ann}/>)
                                }
                                {
                                    announcements.length === 0
                                        ? <p style={{ marginTop: '50px', textAlign: 'center' }}>Este vendedor no ha publicado anuncios.</p>
                                        : null
                                }
                            </ColumnLayout>
                        ) : (
                            <ColumnLayout className='column-content'>
                                <h2 className='h2-title-my-ann'>Anuncios de Vendedor</h2>

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

export default AnnoucementsBySeller