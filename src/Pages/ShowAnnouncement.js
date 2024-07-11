import React, { useEffect, useState } from 'react'
import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import { useParams } from 'react-router-dom'
import { PhotoProvider, PhotoView } from 'react-image-previewer';
import { SlideToolbar, CloseButton } from 'react-image-previewer/ui';
import IconButton from '../Components/IconButton';
import Button from '../Components/Button';

import allAnnoucementsSvg from '../Assets/Icons/allAnnoucements.svg'
import formasEntregaSvg from '../Assets/Icons/formasEntrega.svg'
import FavoriteSvg from '../Assets/Icons/favoriteUnfilled.svg'
import puntuationSvg from '../Assets/Icons/puntuation.svg'
import locationSvg from '../Assets/Icons/location.svg'
import calendarSvg from '../Assets/Icons/calendar.svg'
import categorySvg from '../Assets/Icons/category.svg'
import inmuebleSvg from '../Assets/Icons/inmueble.svg'
import contactSvg from '../Assets/Icons/contact.svg'
import productSvg from '../Assets/Icons/product.svg'
import serviceSvg from '../Assets/Icons/service.svg'
import gratisSvg from '../Assets/Icons/gratis.svg'
import reportSvg from '../Assets/Icons/report.svg'
import stockSvg from '../Assets/Icons/stock.svg'
import carSvg from '../Assets/Icons/car.svg'

import modals from '../Modals';
import axios from 'axios';
import backend from '../backend';
import '../Styles/Pages/ShowAnnouncement.css';

const ShowAnnouncement = () => {

    const { id } = useParams();
    const [ announcement, setAnnouncement ] = useState(null);
    const [ author, setAuthor ] = useState(null);
    const [ expandedDescr, setExpandedDescr ] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const getAnnouncement = async() => {
            try{
                const response = await axios.get(`${backend}/api/announcement/${id}`);

                setAnnouncement(response.data.announcement);
                console.log(response.data.announcement);
                setAuthor(response.data.author);

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
                            <div className='div-fav-btn'> <IconButton color='transparent' icon={FavoriteSvg} title='Añadir a favoritos'/> </div>
                            <h1>{announcement.titulo}</h1>
                            <h2>${announcement.precio} MXN</h2>

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
                                        <p>{announcement.caracteristicas[key] === true ? 'Si' : announcement.caracteristicas[key]}</p>
                                    </div>
                                </section>
                                : null
                        })
                    }
                        <section className='caracteristica-annoucement'>
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
                </section>
            </ContentLayout>


            <ContentLayout>
                <h2>Vendido por</h2>
                <section className='ann-seller-section'>
                    <section className='ann-seller-section-img'>
                        <img src={author.foto} alt='Foto del vendedor'/>
                    </section>

                    <section className='ann-seller-section-info'>
                        <h3>{author.nombre} {author.apellido}</h3>
                        <section className='ann-seller-section-info-punt'>
                            <img src={puntuationSvg} alt='Puntuación' />
                            <p><b>Puntuación:</b> 0 Estrellas (0 reseñas)</p>
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
                        >Mostrar todos los anuncios del vendedor</Button>                            
                    </section>
                </section>
            
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