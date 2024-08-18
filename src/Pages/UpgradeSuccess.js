import React, { useEffect, useState } from 'react'
import { Link, redirect, useLocation, useParams } from 'react-router-dom';
import PaginationLayout from '../Layouts/PaginationLayout';
import ContentLayout from '../Layouts/ContentLayout'
import ModalPayment from '../Fragments/ModalPayment';
import PageLayout from '../Layouts/PageLayout';
import Button from '../Components/Button';

import impulsedSvg from '../Assets/Icons/impulsed.svg'
import premiumSvg from '../Assets/Icons/premium.svg'

import backend from '../backend';
import modals from '../Modals';
import axios from 'axios';
import '../Styles/Pages/UpgradeAnnouncement.css'
import Loader from '../Components/Loader';

const UpgradeSuccess = () => {
    const { id } = useParams();
    const [ announcement, setAnnouncement ] = useState(null);
    const [ redirect, setRedirect ] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const getAnnouncement = async() => {
            try{
                document.title = 'La Segunda Mano - Mejorar Anuncio';
                const modal = modals.petitionAlert("Cargando información...", "Espere un momento...", 'info');

                const response = await axios.get(`${backend}/api/announcement/${id}/protected`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                document.title = `La Segunda Mano - Exito "${response.data.titulo}" mejorado!`;
                setAnnouncement(response.data);                
                
                modal.close();
            }catch(err){

                if (err.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                    modals.alert("Ups", `${err.response.data}`, 'error', 'Volver atras')
                        .then((answer) => {
                            if(answer.isConfirmed){
                                window.history.back();
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

        if(!announcement) getAnnouncement();
    }, [id]);

    return announcement ?
    (
        <PageLayout>
            <ContentLayout horizontalAlign='center' complete redirect={redirect}>
                <div className='upgrade-ann-title'>
                    <h1 className='h1-upgrade-announcement'>¡¡¡El anuncio "{announcement.titulo}" fue mejorado!!!</h1>
                    <img src={announcement.imagenes[0]} alt="Imagen del anuncio"/>
                </div>
                {
                    announcement.mejoras[announcement.mejoras.length-1].nivel === 'impulsado' 
                        ? <div className='kind-upgrade'><img src={impulsedSvg} alt='Impulsado'/> <h2 className='upgrade-title'>Anuncio Impulsado</h2></div>
                        : <div className='kind-upgrade'><img src={premiumSvg} alt='Premiun'/>  <h2 className='upgrade-title text-gold'>Anuncio Premiun</h2></div> 
                }

                <p className='p-beneficts'>Gracias por confiar en nosotros, ahora disfruta de tus nuevos beneficios. Si tenias un plan activo, el nuevo plan se activará al expirar el actual.</p>

                <div className='info-upgrade-ann'>
                    <h3>Ten en cuenta:</h3>
                    <li>
                        <b>La mejora comienza: </b>
                        { parseDate(announcement.mejoras[announcement.mejoras.length-1].fechaInicio) }
                    </li>

                    <li>
                        <b>La mejora termina: </b>
                        { parseDate(announcement.mejoras[announcement.mejoras.length-1].fechaFin) }
                    </li>
                </div>

                <Button width='50%' className='mt-35' onClick={() => setRedirect('/anuncio/'+id)}>Ver el anuncio</Button>
            </ContentLayout>
        </PageLayout>
    ) : (
        <PageLayout navbar={false} footer={false}>
            <ContentLayout horizontalAlign='center'>
                <Loader/>
                <p>Cargando espere un momento...</p>
            </ContentLayout>
        </PageLayout>
    )
}

export default UpgradeSuccess

function parseDate(date){
    const [ dia, mes, año ] = date.split('-');
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    return `${dia} de ${meses[parseInt(mes)-1]} del ${año}`;
}