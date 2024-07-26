import React, { useEffect, useRef, useState } from 'react'
import AnnoucementMyAnn from '../Fragments/AnnoucementMyAnn'
import ReportReviewPopup from '../Fragments/ReportReviewPopup';
import PaginationLayout from '../Layouts/PaginationLayout'
import { Link, useParams } from 'react-router-dom'
import IconButton from '../Components/IconButton';
import PageLayout from '../Layouts/PageLayout'
import { useLocation } from 'react-router-dom';
import Button from '../Components/Button';
import Select from '../Components/Select';
import Input from '../Components/Input';

import accountSvg from '../Assets/Icons/account.svg'
import voidPuntuationSvg from '../Assets/Icons/voidPuntuation.svg'
import reportBlackSvg from '../Assets/Icons/reportBlack.svg'
import puntuationSvg from '../Assets/Icons/puntuation.svg'
import recomendSvg from '../Assets/Icons/recommend.svg'
import userSvg from '../Assets/Icons/userBlack.svg'
import deleteSvg from '../Assets/Icons/delete.svg'

import constants from '../constants.json'
import backend from '../backend'
import modals from '../Modals'
import axios from 'axios'

import '../Styles/Pages/MyAnnoucements.css'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AnnoucementsBySeller = () => {
    const query = useQuery();

    const token = localStorage.getItem('token');
    const { id } = useParams();    
    const formRef = useRef(null);    

    const [ announcements, setAnnouncements ] = useState(null);
    const [ seller, setSeller ] = useState(null);
    const [ reviews, setReviews ] = useState(null);
    const [ calificacion, setCalificacion ] = useState(0);
    const [ canMakeReview, setCanMakeReview ] = useState(false);
    const [ mio, setMio ] = useState(false);

    const [ orderReviews, setOrderReviews ] = useState('importance:desc')
    const [ currentPage, setCurrentPage ] = useState(0);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    useEffect(() => {
        const getAnnucements = async() => {
            document.title = 'La Segunda Mano - Anuncios del usuario ';

            try{
                const response = await axios.get(`${backend}/api/announcement/seller/${id}`);
                document.title = `La Segunda Mano - Anuncios de ${response.data.seller.nombre} ${response.data.seller.apellido}`;

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

        const getRevies = async() => {
            try{
                const { data } = await axios.get(`${backend}/api/review/seller/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                
                setReviews(data.reviews);
                setCanMakeReview(data.canMakeReview);
                setMio(data.mio);
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
        getRevies();
    }, []);

    useEffect(() => {
        const getReviews = async() => {
            try{
                setReviews(null);
                const { data } = await axios.get(`${backend}/api/review/seller/${id}?order=${orderReviews}&page=${currentPage}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                
                setReviews(data.reviews);
                setCanMakeReview(data.canMakeReview)
                setMio(data.mio)
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

        getReviews();
    }, [ orderReviews, currentPage ])

    const handleSubmitReview = async(e) => {
        e.preventDefault();

        if(calificacion < 1) return modals.alert("Atención", "Debes ponerle un calificación (se representa con las estrellitas)", 'warning')

        try {
            setCanMakeReview(false);

            const formData = new FormData(formRef.current);
            formData.append('calificacion', calificacion);
            
            const response = await axios.post(`${backend}/api/review`, formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            const oldReviews = [...reviews];
            oldReviews.unshift(response.data);

            setReviews(oldReviews);
            modals.toast("Nueva reseña creada!", 'success')
                        
        }catch(err){
            setCanMakeReview(true);

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
    
    const handleRecommend = async(e, id) => {
        const { target } = e;
        const prevDisplay = hideElement(target);

        try{
            const response = await axios.patch(`${backend}/api/review/${id}`, {}, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            
        }catch(err){
            showElement(target, prevDisplay);

            if (err.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                modals.alert("Ups", `${err.response.data}`, 'error');
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
    
    const handleReport = async(e, id) => {
        modals.popup(
            <ReportReviewPopup id={id} type="reseña"/>, 
            'report-review-popup',
            "Cancelar"
        );
    }

    const handleDelete = async(e, id) => {
        const { target } = e;
        modals.confirm("Atencion", "¿Deseas borrar la reseña?", 'warning', onConfirm);

        async function onConfirm(){
            const prevDisplay = hideElement(target);

            try{
                const response = await axios.delete(`${backend}/api/review/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });
                
                modals.toast(response.data, 'success');
                setReviews(reviews.slice(1));
                setCanMakeReview(true);
                setCurrentPage(0);
            }catch(err){
                showElement(target, prevDisplay);

                if (err.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                    modals.alert("Ups", `${err.response.data}`, 'error');
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
    }

    const handleLoadReviews = async(e) => {
        const { value } = e.target;
        setOrderReviews(value)
    }
    
    const AnnoucementsComponent = () => {
        return (
            <section className='content-with-aside'>
                {
                    announcements
                        ? (
                            <section className='section-column-annoucement-seller'>
                                {
                                    announcements.map(ann => <AnnoucementMyAnn className='annoucement-user' ann={ann}/>)
                                }
                                {
                                    announcements.length === 0
                                        ? <p style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>Este vendedor no ha publicado anuncios.</p>
                                        : null
                                }
                            </section>
                        ) : (
                            <section className='section-column-annoucement-seller'>
                                <p style={{ marginTop: '20px', marginBottom: '20px' }}>Cargando anuncios...</p>
                            </section>
                        )
                }
            </section>
        )
    }

    const ReviewsComponent = () => {
        return reviews
        ? (
            <section className='section-column-annoucement-seller'>
                {
                    token 
                        ? canMakeReview
                            ? !mio
                                ? <form className='form-review' onSubmit={handleSubmitReview} ref={formRef}>
                                    <h3>Escribe una reseña al vededor</h3>
                                    <Input
                                        id="asdasdasdasd"
                                        name="contenido"
                                        placeholder="Introduzca su reseña..."
                                        label="Reseña"
                                        width='100%'
                                        minHeight='45px'
                                        
                                        textArea
                                        required
                                    />
                                    <input type='hidden' name='commentedUser' value={id}/>
                    
                                    <section className='section-form-review'>
                                        <div className='puntuation'>
                                            {
                                                Array.from({ length: 5 }, (_, index) => (
                                                    index < calificacion
                                                        ? <IconButton
                                                            color='transparent' 
                                                            icon={puntuationSvg} 
                                                            alt="★" 
                                                            key={'start-icon-'+index} 
                                                            title={`Puntuar con ${index+1} estrellas`} 
                                                            onClick={() => setCalificacion(index+1)}
                                                        />
                                                        : <IconButton 
                                                            color='transparent' 
                                                            icon={voidPuntuationSvg} 
                                                            alt="☆" 
                                                            key={'start-icon-'+index} 
                                                            title={`Puntuar con ${index+1} estrellas`} 
                                                            onClick={() => setCalificacion(index+1)}
                                                        />
                                                ))
                                            }
                                            <p style={{ fontSize: '13px' }}>{calificacion}/5 Estrellas</p>
                                        </div>
                                        <Button type='submit' horizontal>Enviar</Button>
                                    </section>
                    
                                </form>
                                : null
                            : <p style={{ textAlign: 'center', width: '100%', margin: '20px 0px' }}>Ya has escrito una reseña, si deseas modificarla eliminala y crea una nueva.</p>

                        : <p><b>Para escribir una reseña necesitas una cuenta.</b> <Link to='/login'>Iniciar sesión</Link></p>
                }
                <section className='section-select-order'>
                    <Select
                        options={constants.ordenarReviews}
                        label="Ordenar por:"
                        className='select-order'
                        value={orderReviews}

                        onChange={handleLoadReviews}
                    />
                </section>
                {
                    reviews.map((r, index) => (
                        <section className='section-show-review' key={'reseña-'+index}>
                            <img className='section-show-review-profile-pic' src={ r.authorId.foto ? r.authorId.foto : userSvg} alt='Foto de perfil' />
                                
                            <section className='section-show-review-info'>
                                <p><b>{r.authorId.nombre} {r.authorId.apellido} {r.mio ? '(YO)' : ''}</b> <span style={{ fontSize: '11px' }}>{parseDate(r.fechaCreacion)}</span></p>

                                <div className='puntuation'>
                                    {
                                        Array.from({ length: 5 }, (_, index) => (
                                            index < r.calificacion
                                                ? <img className='puntuation-review-img' src={puntuationSvg} alt='★'/>
                                                : <img className='puntuation-review-img' src={voidPuntuationSvg} alt='☆'/>
                                        ))
                                    }
                                    <p className='puntuation-review-text'>{r.calificacion}/5 Estrellas</p>
                                </div>

                                <p>{r.contenido}</p>
                            </section>

                            {
                                token
                                    ? r.mio 
                                        ? <div className='section-show-review-buttons'>
                                            <IconButton className='section-show-review-button' color='transparent' icon={ deleteSvg } title='Eliminar mi reseña' onClick={(e) => handleDelete(e, r._id)}/>
                                        </div>
                                        : <div className='section-show-review-buttons'>
                                            <IconButton className='section-show-review-button' color='transparent' icon={ recomendSvg } title='Me resulto util' onClick={(e) => handleRecommend(e, r._id)}/>
                                            <IconButton className='section-show-review-button' color='transparent' icon={ reportBlackSvg } title='Reportar comentario' onClick={(e) => handleReport(e, r._id)}/>
                                        </div>
                                    : null
                            }
                        </section>
                    ))
                }
                {
                    reviews.length === 0 ? <p style={{ marginTop: '5px', marginBottom: '20px' }}>El vendedor no tiene reseñas.</p> : null
                }
                <PagesCounter/>
            </section>
        ) : (
            <section className='section-column-annoucement-seller'>
                <p style={{ marginTop: '20px', marginBottom: '20px' }}>Cargando reseñas...</p>
            </section>
        )

    }

    const PagesCounter = () => {
        const numElements = parseInt((seller.evaluadores / 10).toFixed(0)) + 1;
        const array = new Array(numElements).fill(null);

        return numElements > 1
            ? (
                <div className='container-counter-btn'>
                    {
                        array.map((_, index) => 
                            currentPage === index
                                ? <button className='counter-btn counter-btn-active' onClick={() => setCurrentPage(index)}>{index+1}</button>
                                : <button className='counter-btn' onClick={() => setCurrentPage(index)}>{index+1}</button>
                        )
                    }
                </div>
            ) : null
    }

    return (
        <PageLayout > 
            {
                seller
                    ? (
                        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <section className='h2-seller-cont'>
                                <img className='pic-seller' src={seller.foto ? seller.foto : accountSvg} alt='Foto de perfil' />
                                <h2 style={{ textAlign: 'center' }}>Anuncios de {seller.nombre} {seller.apellido} { announcements ? `(${announcements.length} resultados)` : null }</h2>
                        
                                

                            </section> 
                            <section className='ann-seller-section-info-punt'>
                                <img src={puntuationSvg} alt='Puntuación' />
                                <p><b>Puntuación:</b> {seller.calificacion} Estrellas ({seller.evaluadores} reseñas)</p>
                            </section>
                        </section>
                    ) : (
                        <section className='h2-seller-cont'>
                            <h2 className='h2-title-my-ann'>Anuncios de Vendedor</h2>
                        </section>
                    ) 
            }
            
            <PaginationLayout
                titles={[ "Anuncios", "Reseñas" ]}
                components={[ <AnnoucementsComponent/>, <ReviewsComponent/> ]}
                defaultIndex={query.has('reviews') ? 1 : 0}
            />

        </PageLayout>
    )
}

export default AnnoucementsBySeller

function parseDate(date){
    const [ dia, mes, año ] = date.split('-');
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    return `${dia} de ${meses[parseInt(mes)-1]} del ${año}`;
}

function hideElement(element){
    let prevDisplay = '';
        
    if(element.tagName === 'IMG'){
        prevDisplay = element.parentElement.style.display;
        element.parentElement.style.display = 'none';
    }else{
        prevDisplay = element.style.display;
        element.style.display = 'none';
    }

    return prevDisplay;
}

function showElement(element, display='block'){       
    if(element.tagName === 'IMG'){
        element.parentElement.style.display = display;
    }else{
        element.style.display = display;
    }
}