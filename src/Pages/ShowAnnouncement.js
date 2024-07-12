import React, { useEffect, useRef, useState } from 'react'
import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import { Link, useParams } from 'react-router-dom'
import { PhotoProvider, PhotoView } from 'react-image-previewer';
import { SlideToolbar, CloseButton } from 'react-image-previewer/ui';
import IconButton from '../Components/IconButton';
import Button from '../Components/Button';
import Input from '../Components/Input';

import allAnnoucementsSvg from '../Assets/Icons/allAnnoucements.svg'
import voidPuntuationSvg from '../Assets/Icons/voidPuntuation.svg'
import formasEntregaSvg from '../Assets/Icons/formasEntrega.svg'
import FavoriteSvg from '../Assets/Icons/favoriteUnfilled.svg'
import reportBlackSvg from '../Assets/Icons/reportBlack.svg'
import categorySvg from '../Assets/Icons/categoryBlack.svg'
import puntuationSvg from '../Assets/Icons/puntuation.svg'
import recomendSvg from '../Assets/Icons/recommend.svg'
import locationSvg from '../Assets/Icons/location.svg'
import calendarSvg from '../Assets/Icons/calendar.svg'
import inmuebleSvg from '../Assets/Icons/inmueble.svg'
import contactSvg from '../Assets/Icons/contact.svg'
import productSvg from '../Assets/Icons/product.svg'
import serviceSvg from '../Assets/Icons/service.svg'
import userSvg from '../Assets/Icons/userBlack.svg'
import gratisSvg from '../Assets/Icons/gratis.svg'
import reportSvg from '../Assets/Icons/report.svg'
import deleteSvg from '../Assets/Icons/delete.svg'

import stockSvg from '../Assets/Icons/stock.svg'
import carSvg from '../Assets/Icons/car.svg'

import modals from '../Modals';
import axios from 'axios';
import backend from '../backend';
import '../Styles/Pages/ShowAnnouncement.css';

const ShowAnnouncement = () => {

    const formRef = useRef(null);
    const token = localStorage.getItem('token');

    const { id } = useParams();
    const [ redirect, setRedirect ] = useState(null);
    const [ expandedDescr, setExpandedDescr ] = useState(false);

    const [ announcement, setAnnouncement ] = useState(null);
    const [ author, setAuthor ] = useState(null);
    const [ reviews, setReviews ] = useState(null);
    const [ canMakeReview, setCanMakeReview ] = useState(false);

    const [ calificacion, setCalificacion ] = useState(0);

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

        getAnnouncement();
    }, [id]);

    const handleSubmitReview = async(e) => {
        e.preventDefault();

        if(calificacion < 1) return modals.alert("Atención", "Debes ponerle un calificación (se representa con las estrellitas)", 'warning')

        try {
            const formData = new FormData(formRef.current);
            formData.append('calificacion', calificacion);
            
            const response = await axios.post(`${backend}/api/review`, formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            console.log(response);
                        
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

    const handleRecommend = async(e) => {
        const { target } = e;
        const prevDisplay = hideElement(target);



    }
    
    const handleReport = async(e) => {
        const { target } = e;
        const prevDisplay = hideElement(target);
    }

    const handleDelete = async(e, id) => {
        const { target } = e;

        modals.confirm("Atencion", "¿Deseas borrar la reseña?", 'warning', onConfirm)


        async function onConfirm(){
            const prevDisplay = hideElement(target);

            try{
                const response = await axios.delete(`${backend}/api/review/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });
                
                setReviews(reviews.slice(1));
                modals.toast(response.data, 'success');
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
    

    return announcement ?(
        <PageLayout>
            <ContentLayout horizontalAlign='center'>
                
                <main className='show-announcement-main'>
                    
                    <section className='show-announcement-imgs'>
                        <PhotoProvider overlayRender={props => {
                                const { onClose } = props
                                return (
                                <>
                                    <SlideToolbar {...props} />
                                    <CloseButton onClick={onClose} />
                                </>
                                )
                        }}>
                            <PhotoView src={ announcement.imagenes[0] }>
                                <img src={announcement.imagenes[0]} alt={announcement.imagenes[0]} title='Haz click para ampliar esta imagen' />
                            </PhotoView>
                            <section className='show-announcement-imgs-list'>
                                {
                                    announcement.imagenes.map((img, i) => {
                                        return i === 0 
                                            ? null 
                                            : <PhotoView src={ img }>
                                                <img src={img} alt={img} title='Haz click para ampliar esta imagen' />
                                              </PhotoView>
                                    })
                                }
                            </section>
                        </PhotoProvider>
                    </section>

                    <section className='show-announcement-info'>
                        <section className='show-annoucement-general'>
                            {
                                token 
                                    ? <div className='div-fav-btn'> <IconButton color='transparent' icon={FavoriteSvg} title='Añadir a favoritos'/> </div>
                                    : null
                            }
                            <h1>{announcement.titulo}</h1>
                            <h2>
                                { announcement.tipoAnuncio === 'servicio' ? announcement.precio : <>${announcement.precio} MXN</> }
                            </h2>

                            <ul>
                                <li>
                                    <img style={{ filter: 'invert(100%)' }} src={selectTypeIcon(announcement.tipoAnuncio)} alt='Categoria'/>
                                    <p><b>Tipo de anuncio:</b> { capitalizeFirstLetter(announcement.tipoAnuncio) }</p>
                                </li>

                                <li>
                                    <img src={categorySvg} alt='Categoria'/>
                                    <p><b>Categoria:</b> { announcement.categoria }</p>
                                </li>

                                <li>
                                    <img src={locationSvg} alt='Ubicación'/>
                                    <p><b>Ubicación:</b> {announcement.caracteristicas.ciudad}, {capitalizeFirstLetter(announcement.caracteristicas.estado)}</p>
                                </li>
                                {
                                    announcement.caracteristicas.cantidad > 1 
                                        ? <li>
                                            <img src={stockSvg} alt='Stock'/>
                                            <p><b>Cantidad disponible:</b> {announcement.caracteristicas.cantidad}</p>
                                        </li>
                                        : null
                                }
                                <li>
                                    <img src={calendarSvg} alt='Fechas'/>
                                    <p><b>Publicado el:</b> {parseDate(announcement.fechaCreacion)}</p>
                                </li>
                                <p className='p-expiration-date'>El anuncio expira el {parseDate(announcement.fechaExpiracion)}</p>
                            </ul>
                        </section>

                        <section className='show-announcement-buttons'>
                            <Button 
                                width='100%' 
                                title='Contactar con el vendedor'
                                icon={ contactSvg }
                            >Contactar con el vendedor</Button>

                            <Button 
                                width='100%' 
                                icon={ reportSvg }
                                title='Reportar este anuncio'
                                color='red' 
                            >Reportar publicación</Button>
                        </section>
                    </section>
                    
                </main>
                
            </ContentLayout>

            <ContentLayout horizontalAlign='center'>
                <section className='information-annoucement'>
                    <h2 className='h2-information-annoucement'>Información del producto</h2>
                    <p className={`p-information-annoucement ${!expandedDescr ? "contraido" : ""}`} title={!expandedDescr ? "Mostrar todo" : ""} style={{ cursor: !expandedDescr ? "pointer" : "" }} onClick={() => setExpandedDescr(true)}>
                    {
                        announcement.descripcion.split('\n').map( (text) => <>{text}<br/></> )
                    }
                    </p>
                </section>

                <section className='caracteristicas-annoucement'>
                    {
                        Object.keys(announcement.caracteristicas).map(key => {
                            return (announcement.caracteristicas[key] !== '') && (announcement.caracteristicas[key]) && !['ciudad', 'cantidad', 'estado'].includes(key)
                                ? <section className='caracteristica-annoucement' key={'caracteristicas-'+key}>
                                    <h3>{getNameCaracteristica(key)}</h3>
                                    <div className='caracteristica-annoucement-content'>
                                        <img src={selectIcon(key)} alt={key} />
                                        <p>{announcement.caracteristicas[key] === true ? 'Si' : capitalizeFirstLetter(announcement.caracteristicas[key])}</p>
                                    </div>
                                </section>
                                : null
                        })
                    }
                    {
                        announcement.formasEntrega
                            ? <section className='caracteristica-annoucement'>
                                <h3>{"Formas de entrega"}</h3>
                                <div className='caracteristica-annoucement-content'>
                                    <img src={formasEntregaSvg} alt={'Forma entrega'} />
                                    <ul style={{ listStyle: 'none' }}>
                                    {
                                        announcement.formasEntrega.map((forma) => 
                                            <li key={'formas-'+forma.forma}><p>-{forma.forma}{forma.detalles ? `: ${forma.detalles}` : null}.</p></li>             
                                        )
                                    }
                                    </ul>
                                </div>
                            </section>
                            : null
                    }
                </section>
            </ContentLayout>


            <ContentLayout redirect={redirect}>
                <h2 className='h2-information-annoucement'>Vendido por</h2>
                <section className='ann-seller-section'>
                    <section className='ann-seller-section-img'>
                        <img src={author.foto ? author.foto : userSvg} alt='Foto del vendedor'/>
                    </section>

                    <section className='ann-seller-section-info'>
                        <h3>{author.nombre} {author.apellido}</h3>
                        <section className='ann-seller-section-info-punt'>
                            <img src={puntuationSvg} alt='Puntuación' />
                            <p><b>Puntuación:</b> {author.calificacion} Estrellas ({author.evaluadores} reseñas)</p>
                        </section>
                            
                    </section>

                    <section className='ann-seller-section-btns'>
                        <Button 
                            color='red' 
                            icon={reportSvg}
                            width='49.5%'
                            className='ann-seller-section-btn'
                        >Reportar vendedor</Button>

                        <Button 
                            icon={allAnnoucementsSvg}
                            width='49.5%'
                            className='ann-seller-section-btn'
                            onClick={() => setRedirect(`/vendedor/${author.sellerId}`)}
                        >Mostrar todos los anuncios del vendedor</Button>                            
                    </section>
                </section>
            </ContentLayout>

            <ContentLayout>
                <h2 className='h2-information-annoucement'>Reseñas del vendedor</h2>

                {
                    token 
                        ? canMakeReview
                            ? <form className='form-review' onSubmit={handleSubmitReview} ref={formRef}>
                                <Input
                                    id="contenido"
                                    name="contenido"
                                    placeholder="Introduzca su reseña..."
                                    label="Reseña"
                                    width='100%'
                                    minHeight='45px'
                                    textArea
                                    required
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
                                        <p>{calificacion}/5 Estrellas</p>
                                    </div>
                                    <Button type='submit' horizontal>Enviar</Button>
                                </section>
            
                            </form>
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
                                        <p><b>{r.authorId.nombre} {r.authorId.apellido} {r.mio ? '(YO)' : ''}</b></p>

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
                                                    <IconButton className='section-show-review-button' color='transparent' icon={ recomendSvg } title='Me resulto util' onClick={handleRecommend}/>
                                                    <IconButton className='section-show-review-button' color='transparent' icon={ reportBlackSvg } title='Reportar comentario' onClick={handleReport}/>
                                                </div>
                                            : null
                                        
                                    }
                                </section>
                            )
                            : <p>Este usuario no tiene reseñas, ¡puedes publicar la primera!</p>
                    }
                </section>
                {
                    author.evaluadores > 10
                        ? <Link style={{ width: '100%', textAlign: 'center', marginTop: '15px' }} to={`/vendedor/reseñas/${author.selledId}`}>Ver todas las reseñas</Link>
                        : null
                }

            </ContentLayout>

        </PageLayout>
    ) : null
}

export default ShowAnnouncement

function capitalizeFirstLetter(str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function parseDate(date){
    const [ dia, mes, año ] = date.split('-');
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    return `${dia} de ${meses[parseInt(mes)-1]} del ${año}`;
}
  
function selectTypeIcon(type){
    switch(type){
        case "inmueble": return inmuebleSvg;
        case "producto": return productSvg;
        case "servicio": return serviceSvg;
        case "gratis": return gratisSvg;
        case "vehiculo": return carSvg;

        default: return productSvg;
    }
}

function getNameCaracteristica(key){
    const alias = {
        fechaCaducidad: "Fecha de caducidad",
        sistemaOperativo: "Sistema Operativo",
        cpu: "Procesador",
        ram: "Memoria RAM",
        "tamañoPantalla": "Tamaño de la pantalla",
        "tamañoPulgadas": "Tamaño en pulgadas",
        conectividadTV: "Conectividad para TV",
        smartTV: "¿Es SmartTV?"
    }

    return alias[key] ? alias[key] : capitalizeFirstLetter(key);
}

function selectIcon(key){
    try{
        const asset = require(`../Assets/Icons/${key}.svg`)
        return asset;    
    }catch(err){
        return require(`../Assets/Icons/noImage.svg`)
    }
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