import React, {useRef, useState } from 'react'
import ReportReviewPopup from './ReportReviewPopup';
import ContentLayout from '../Layouts/ContentLayout'
import IconButton from '../Components/IconButton';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { Link } from 'react-router-dom'

import voidPuntuationSvg from '../Assets/Icons/voidPuntuation.svg'
import reportBlackSvg from '../Assets/Icons/reportBlack.svg'
import puntuationSvg from '../Assets/Icons/puntuation.svg'
import recomendSvg from '../Assets/Icons/recommend.svg'
import userSvg from '../Assets/Icons/userBlack.svg'
import deleteSvg from '../Assets/Icons/delete.svg'

import modals from '../Modals';
import axios from 'axios';
import backend from '../backend';
import '../Styles/Pages/ShowAnnouncement.css';

const ReviewsShowAnn = ({ author, reviews, setReviews, canMakeReview, setCanMakeReview, mio }) => {

    const token = localStorage.getItem('token');
    const formRef = useRef(null);

    const [ calificacion, setCalificacion ] = useState(0);

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
        if(!localStorage.getItem('token')) return modals.toast("Para recomendar, necesitas iniciar sesión", 'warning', 4)

        const prevDisplay = hideElement(target);

        try{
            const response = await axios.patch(`${backend}/api/review/${id}`, {}, {
                headers: {
                    Authorization: token
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
        if(!localStorage.getItem('token')) return modals.toast("Para levantar un reporte, necesitas iniciar sesión", 'error', 4)

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

    return ( reviews && author ) ? (
        <ContentLayout>
            <h2 className='h2-information-annoucement'>{mio ? 'Mis reseñas' : 'Reseñas del vendedor'}</h2>

            {
                token 
                    ? canMakeReview
                        ? !mio
                            ? <form className='form-review' onSubmit={handleSubmitReview} ref={formRef}>
                                <Input
                                    id="contenido"
                                    name="contenido"
                                    placeholder="Introduzca su reseña..."
                                    label="Reseña"
                                    width='100%'
                                    minHeight='45px'
                                    textArea
                                />
                                <input type='hidden' name='commentedUser' value={author.sellerId}/>
                
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
                        : <p style={{ textAlign: 'center', width: '100%' }}>Ya has escrito una reseña, si deseas modificarla eliminala y crea una nueva.</p>

                    : <p><b>Para escribir una reseña necesitas una cuenta.</b> <Link to='/login'>Iniciar sesión</Link></p>
            }

            <section className='section-show-reviews'>
                {
                    reviews.length > 0
                        ? reviews.map((r, index) => 
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
                        )
                        : mio 
                            ? <p>No tienes reseñas.</p>
                            : <p>Este vendedor no tiene reseñas, ¡puedes publicar la primera!</p>
                }
            </section>
            {
                author.evaluadores > 10
                    ? <Link style={{ width: '100%', textAlign: 'center', marginTop: '15px' }} to={`/vendedor/${author.sellerId}`}>Ver todas las reseñas</Link>
                    : null
            }

        </ContentLayout>
    ) : (
        <ContentLayout>
            <h2 className='h2-information-annoucement'>Reseñas del vendedor</h2>

            <section className='section-show-reviews'>

                <section className='section-show-review'>
                    <img className='section-show-review-profile-pic loading-image progress' src={userSvg} alt='Foto de perfil' />
                    <section className='section-show-review-info'>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px', width: 'min(100%, 500px)' }}></div>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px', width: 'min(100%, 300px)' }}></div>

                        <div className='div-loading-content-small' style={{ maxHeight: '11px' }}></div>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px' }}></div>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px', width: 'min(75%, 750px)' }}></div>

                    </section>
                </section>

                <section className='section-show-review'>
                    <img className='section-show-review-profile-pic loading-image progress' src={userSvg} alt='Foto de perfil' />
                    <section className='section-show-review-info'>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px', width: 'min(100%, 500px)' }}></div>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px', width: 'min(100%, 300px)' }}></div>

                        <div className='div-loading-content-small' style={{ maxHeight: '11px' }}></div>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px' }}></div>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px', width: 'min(75%, 750px)' }}></div>

                    </section>
                </section>

                <section className='section-show-review'>
                    <img className='section-show-review-profile-pic loading-image progress' src={userSvg} alt='Foto de perfil' />
                    <section className='section-show-review-info'>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px', width: 'min(100%, 500px)' }}></div>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px', width: 'min(100%, 300px)' }}></div>

                        <div className='div-loading-content-small' style={{ maxHeight: '11px' }}></div>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px' }}></div>
                        <div className='div-loading-content-small' style={{ maxHeight: '11px', width: 'min(75%, 750px)' }}></div>

                    </section>
                </section>


            </section>
        </ContentLayout>
    )
}

export default ReviewsShowAnn

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