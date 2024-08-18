import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import PaginationLayout from '../Layouts/PaginationLayout';
import ModalPayment from '../Fragments/ModalPayment';
import PageLayout from '../Layouts/PageLayout';
import Button from '../Components/Button';

import impulsedSvg from '../Assets/Icons/impulsed.svg'
import premiumSvg from '../Assets/Icons/premium.svg'

import backend from '../backend';
import modals from '../Modals';
import axios from 'axios';
import '../Styles/Pages/UpgradeAnnouncement.css'

const UpgradeAnnouncement = () => {
    const location = useLocation();
    const { id } = useParams();
    const [ announcement, setAnnouncement ] = useState(null);

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

                document.title = `La Segunda Mano - Mejorar "${response.data.titulo}"`;
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

    const UpgradeImpulsed = ({}) => {
        return (
            <div className='upgrade-container'>
                <img src={impulsedSvg} alt='Impulsado'/>
                <h2 className='upgrade-title'>Anuncio Impulsado</h2>
                <p>b sjan djk asijdas dhashdhjasbdhjasbdhjasbdhjasbjh sahjdbashjndjasbd hjasdjasbhjdbashjdbashjdb ahsj</p>

                <section className='list-ventajas-upgrade'>
                    <h4>Ventajas:</h4>
                    <ul>
                        <li>Prioridad de aparición en busquedas relacionadas con tu anuncio.</li>
                        <li>Caduca en 30 días.</li>
                    </ul>
                </section>

                <h2 className='price-upgrade'>$99.00 MXN</h2>
                <Button width='50%'
                    onClick={() => modals.popup(<ModalPayment id={id} plan='impulsado' />, "swal-show-payment", "Cancelar")}
                >Adquirir</Button>
            </div>
        )
    }

    const UpgradePremium = ({}) => {
        return (
            <div className='upgrade-container'>
                <img src={premiumSvg} alt='Impulsado'/>
                <h2 className='upgrade-title text-gold'>Anuncio Impulsado</h2>
                <p>b sjan djk asijdas dhashdhjasbdhjasbdhjasbdhjasbjh sahjdbashjndjasbd hjasdjasbhjdbashjdbashjdb ahsj</p>

                <section className='list-ventajas-upgrade'>
                    <h4>Ventajas:</h4>
                    <ul>
                        <li>Sale en la página principal</li>
                        <li>Prioridad de aparición en busquedas relacionadas con tu anuncio.</li>
                        <li>Caduca en 30 días.</li>
                    </ul>
                </section>

                <h2 className='price-upgrade'>$199.00 MXN</h2>
                <Button width='50%'>Adquirir</Button>
            </div>
        )
    }

    return announcement ?
        (
            <PageLayout>
                <h1 className='h1-upgrade-announcement'>Mejorar anuncio "{announcement.titulo}"</h1>
                <Link to={`/anuncio/${id}`}>Volver al anuncio</Link>
                <PaginationLayout
                    components={[<UpgradeImpulsed/>, <UpgradePremium/>]}
                    titles={['Impulsado', 'Premium']} 
                    defaultIndex={location.search === '?tipo=premium' ? 1 : 0}
                />
            </PageLayout>
        ) : null
}

export default UpgradeAnnouncement