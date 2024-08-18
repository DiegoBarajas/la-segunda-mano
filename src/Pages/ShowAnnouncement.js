import React, { useEffect, useState } from 'react' 
import { useLocation, useParams } from 'react-router-dom'
import ReviewsShowAnn from '../Fragments/ReviewsShowAnn';
import SellerShowAnn from '../Fragments/SellerShowAnn';
import MainShowAnn from '../Fragments/MainShowAnn';
import ShowPricing from '../Fragments/ShowPricing';
import InfoShowAnn from '../Fragments/InfoShowAnn';
import PageLayout from '../Layouts/PageLayout'

import '../Styles/Pages/ShowAnnouncement.css';
import backend from '../backend';
import modals from '../Modals';
import axios from 'axios';

const ShowAnnouncement = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    const { id } = useParams();

    const [ canMakeReview, setCanMakeReview ] = useState(false);
    const [ announcement, setAnnouncement ] = useState(null);
    const [ reviews, setReviews ] = useState(null);
    const [ author, setAuthor ] = useState(null);
    const [ isFavorite, setIsFavorite ] = useState(false);
    const [ mio, setMio ] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const getAnnouncement = async() => {
            try{
                document.title = 'La Segunda Mano - Anuncio';

                const response = await axios.get(`${backend}/api/announcement/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });

                document.title = `La Segunda Mano - ${response.data.announcement.titulo}`;

                setCanMakeReview(response.data.canMakeReview);
                setAnnouncement(response.data.announcement);
                setIsFavorite(response.data.isFavorite)
                setReviews(response.data.reviews);
                setAuthor(response.data.author);
                setMio(response.data.mio);

                if(location.search === '?client=true'){
                    setMio(false);
                }

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

        if(location.search === '?modal=true'){
            modals.popup(<ShowPricing id={id}/>, "swal-show-pricing")
        }

        getAnnouncement();
    }, [id]);


    return (
        <PageLayout>

            <MainShowAnn
                mio={mio}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
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
