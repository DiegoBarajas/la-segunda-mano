import React, { useEffect, useState } from 'react' 
import SellerShowAnn from '../Fragments/SellerShowAnn';
import { useLocation, useParams } from 'react-router-dom'
import MainShowAnn from '../Fragments/MainShowAnn';
import ShowPricing from '../Fragments/ShowPricing';
import InfoShowAnn from '../Fragments/InfoShowAnn';
import PageLayout from '../Layouts/PageLayout'
import ReviewsShowAnn from '../Fragments/ReviewsShowAnn';

import modals from '../Modals';
import axios from 'axios';
import backend from '../backend';
import '../Styles/Pages/ShowAnnouncement.css';

const ShowAnnouncement = () => {
    document.title = 'La Segunda Mano - Anuncio';

    const token = localStorage.getItem('token');
    const location = useLocation();

    const { id } = useParams();

    const [ announcement, setAnnouncement ] = useState(null);
    const [ author, setAuthor ] = useState(null);
    const [ reviews, setReviews ] = useState(null);
    const [ canMakeReview, setCanMakeReview ] = useState(false);
    const [ mio, setMio ] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const getAnnouncement = async() => {
            try{
                const response = await axios.get(`${backend}/api/announcement/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });

                setAnnouncement(response.data.announcement);
                setAuthor(response.data.author);
                setReviews(response.data.reviews);
                setCanMakeReview(response.data.canMakeReview);
                setMio(response.data.mio);

                document.title = `La Segunda Mano - Anuncio ${response.data.announcement.titulo}`;


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

        if(location.search){
            modals.popup(ShowPricing, "swal-show-pricing")
        }

        getAnnouncement();
    }, [id]);


    return (
        <PageLayout>

            <MainShowAnn
                mio={mio}
                announcement={announcement}
            />
            
            <InfoShowAnn
                announcement={announcement}
            />

            <SellerShowAnn
                mio={mio}
                author={author}
            />
            
            <ReviewsShowAnn
                mio={mio}
                author={author}
                reviews={reviews}
                setReviews={ setReviews }
                setCanMakeReview={ setCanMakeReview }
                canMakeReview={ canMakeReview }
            />
        </PageLayout>
    ) 

}

export default ShowAnnouncement
