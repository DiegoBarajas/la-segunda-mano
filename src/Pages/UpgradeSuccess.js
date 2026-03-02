import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import ContentLayout from '../Layouts/ContentLayout'
import PageLayout from '../Layouts/PageLayout';
import Button from '../Components/Button';
import Loader from '../Components/Loader';

import impulsedSvg from '../Assets/Icons/impulsed.svg'
import premiumSvg from '../Assets/Icons/premium.svg'

import backend from '../backend';
import modals from '../Modals';
import axios from 'axios';

import '../Styles/Pages/UpgradeAnnouncement.css'

const UpgradeSuccess = () => {
    const { id } = useParams();

    const [announcement, setAnnouncement] = useState(null);
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const getAnnouncement = async () => {
            try {
                document.title = 'La Segunda Mano - Mejorar Anuncio';

                const modal = modals.petitionAlert(
                    "Cargando información...",
                    "Espere un momento...",
                    'info'
                );

                const response = await axios.get(
                    `${backend}/api/announcement/${id}/protected`,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    }
                );

                document.title = `La Segunda Mano - Éxito "${response.data.titulo}" mejorado!`;

                setAnnouncement(response.data);

                modal.close();

            } catch (err) {

                if (err.response) {
                    console.error(
                        'Código de estado HTTP:',
                        err.response.status,
                        '\n',
                        'Error de respuesta:',
                        err.response.data
                    );

                    modals.alert(
                        "Ups",
                        `${err.response.data}`,
                        'error',
                        'Volver atrás'
                    ).then((answer) => {
                        if (answer.isConfirmed) {
                            window.history.back();
                        }
                    });

                } else if (err.request) {

                    console.error(
                        'No se recibió respuesta del servidor:',
                        err.request
                    );

                    modals.alert(
                        "Ha ocurrido un error",
                        "No se recibió respuesta del servidor",
                        'error'
                    );

                } else {

                    console.error(
                        'Error al enviar la solicitud:',
                        err.message
                    );

                    modals.alert(
                        "Ha ocurrido un error",
                        `<b>Error al enviar la solicitud</b> ${err.message}`,
                        'error'
                    );
                }
            }
        };

        getAnnouncement();

    }, [id]);

    if (!announcement) {
        return (
            <PageLayout navbar={false} footer={false}>
                <ContentLayout horizontalAlign='center'>
                    <Loader />
                    <p>Cargando espere un momento...</p>
                </ContentLayout>
            </PageLayout>
        );
    }

    // 🔒 Protección contra errores si mejoras no existe o está vacío
    const ultimaMejora = announcement.mejoras?.length
        ? announcement.mejoras[announcement.mejoras.length - 1]
        : null;

    return (
        <PageLayout>
            <ContentLayout horizontalAlign='center' complete redirect={redirect}>

                <div className='upgrade-ann-title'>
                    <h1 className='h1-upgrade-announcement'>
                        ¡¡¡El anuncio "{announcement.titulo}" fue mejorado!!!
                    </h1>

                    {announcement.imagenes?.[0] && (
                        <img
                            src={announcement.imagenes[0]}
                            alt="Imagen del anuncio"
                        />
                    )}
                </div>

                {ultimaMejora && (
                    <>
                        {
                            ultimaMejora.nivel === 'impulsado'
                                ? (
                                    <div className='kind-upgrade'>
                                        <img src={impulsedSvg} alt='Impulsado' />
                                        <h2 className='upgrade-title'>
                                            Anuncio Impulsado
                                        </h2>
                                    </div>
                                )
                                : (
                                    <div className='kind-upgrade'>
                                        <img src={premiumSvg} alt='Premium' />
                                        <h2 className='upgrade-title text-gold'>
                                            Anuncio Premium
                                        </h2>
                                    </div>
                                )
                        }

                        <p className='p-beneficts'>
                            Gracias por confiar en nosotros, ahora disfruta de tus nuevos beneficios.
                            Si tenías un plan activo, el nuevo plan se activará al expirar el actual.
                        </p>

                        <div className='info-upgrade-ann'>
                            <h3>Ten en cuenta:</h3>

                            <li>
                                <b>La mejora comienza: </b>
                                {parseDate(ultimaMejora.fechaInicio)}
                            </li>

                            <li>
                                <b>La mejora termina: </b>
                                {parseDate(ultimaMejora.fechaFin)}
                            </li>
                        </div>
                    </>
                )}

                <Button
                    width='50%'
                    className='mt-35'
                    onClick={() => setRedirect('/anuncio/' + id)}
                >
                    Ver el anuncio
                </Button>

            </ContentLayout>
        </PageLayout>
    );
};

export default UpgradeSuccess;


// 📅 Helper para formatear fecha
function parseDate(date) {

    if (!date) return '';

    const [dia, mes, año] = date.split('-');

    const meses = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];

    return `${dia} de ${meses[parseInt(mes) - 1]} del ${año}`;
}
