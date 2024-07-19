import React, { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-image-previewer';
import { SlideToolbar, CloseButton } from 'react-image-previewer/ui';
import ContactSelllerPopup from './ContactSelllerPopup';
import ContentLayout from '../Layouts/ContentLayout'
import IconButton from '../Components/IconButton';
import { useParams } from 'react-router-dom';
import Button from '../Components/Button';

import imageNotFilled from '../Assets/Icons/imageNotFilled.svg'
import favoriteSvg from '../Assets/Icons/favoriteUnfilled.svg'
import favoriteFilledSvg from '../Assets/Icons/favoriteFilled.svg'
import deleteWhiteSvg from '../Assets/Icons/deleteWhite.svg'
import categorySvg from '../Assets/Icons/categoryBlack.svg'
import locationSvg from '../Assets/Icons/location.svg'
import calendarSvg from '../Assets/Icons/calendar.svg'
import inmuebleSvg from '../Assets/Icons/inmueble.svg'
import contactSvg from '../Assets/Icons/contact.svg'
import productSvg from '../Assets/Icons/product.svg'
import serviceSvg from '../Assets/Icons/service.svg'
import gratisSvg from '../Assets/Icons/gratis.svg'
import reportSvg from '../Assets/Icons/report.svg'
import selledSvg from '../Assets/Icons/selled.svg'
import stockSvg from '../Assets/Icons/stock.svg'
import editSvg from '../Assets/Icons/edit.svg'
import carSvg from '../Assets/Icons/car.svg'
import eyeSvg from '../Assets/Icons/eye.svg'

import '../Styles/Pages/ShowAnnouncement.css';
import modals from '../Modals';
import axios from 'axios';
import backend from '../backend';

const MainShowAnn = ({announcement, isFavorite, setIsFavorite, mio}) => {
    const token = localStorage.getItem('token');
    const { id } = useParams();

    const [ redirect, setRedirect ] = useState(null);

    const showContactSeller = () => {
        modals.popup(<ContactSelllerPopup contacto={announcement.contacto}/>, 'swal-contact-seller-popup');
    }

    const handleAddFavorite = async() => {
        try{
            setIsFavorite(!isFavorite);
            const response = await axios.post(`${backend}/api/favorite`, { announcementId: id }, {
                headers: {
                    Authorization: token
                }
            });

            modals.toast(response.data.message, 'info');
            setIsFavorite(response.data.isOn);
        }catch(err){
            setIsFavorite(!isFavorite);

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

    return announcement
    ? (
        <ContentLayout horizontalAlign='center' redirect={redirect}>
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
                                ? !mio
                                    ? <div className={`div-fav-btn ${isFavorite ? 'quit-from-favs' : ''}`}> <IconButton className='icon-button-create-ann' color='transparent' icon={ isFavorite ? favoriteFilledSvg : favoriteSvg } title={isFavorite ? "Quitar de favoritos" : 'Añadir a favoritos'} onClick={handleAddFavorite}/> </div>
                                    : <div className='div-fav-btn watch-as-a-client'> <IconButton className='icon-button-create-ann' color='transparent' icon={eyeSvg} title='Ver como comprador' onClick={() => window.location.href = `/anuncio/${id}?client=true`}/> </div>
                                : null
                        }
                        <h1>{announcement.titulo}</h1>
                        <h2>
                            { showPrice(announcement.precio) }
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

                    {
                        mio ? (
                                <section className='show-announcement-buttons'>

                                    <Button 
                                        width='100%' 
                                        title='Editar anuncio'
                                        icon={ editSvg }
                                        onClick={() => setRedirect(`/anuncio/${id}/editar`)}
                                    >Editar</Button>

                                    <Button 
                                        width='100%' 
                                        title='Marcar como que ya vendiste este anuncio'
                                        icon={ selledSvg }
                                    >Marcar como vendido</Button>

                                    <Button 
                                        width='100%' 
                                        icon={ deleteWhiteSvg }
                                        title='Eliminar anuncio'
                                        color='red' 
                                    >Eliminar publicación</Button>
                                </section>
                            ) : (
                                <section className='show-announcement-buttons'>
                                    <Button 
                                        width='100%' 
                                        title='Contactar con el vendedor'
                                        icon={ contactSvg }

                                        onClick={showContactSeller}
                                    >Contactar con el vendedor</Button>

                                    <Button 
                                        width='100%' 
                                        icon={ reportSvg }
                                        title='Reportar este anuncio'
                                        color='red' 
                                    >Reportar publicación</Button>
                                </section>
                        )
                    }
                </section>
                    
            </main>
        </ContentLayout>
    ) : (
        <ContentLayout horizontalAlign='center'>
            <main className='show-announcement-main'>
                
                <section className='show-announcement-imgs'>
                    <img src={imageNotFilled} alt='Cargando imagenes' className='loading-image progress'/>
                    <section className='show-announcement-imgs-list'>
                        <img src={imageNotFilled} alt='Cargando imagenes' className='loading-image progress' style={{ width: '75%' }}/>
                        <img src={imageNotFilled} alt='Cargando imagenes' className='loading-image progress' style={{ width: '75%' }}/>
                        <img src={imageNotFilled} alt='Cargando imagenes' className='loading-image progress' style={{ width: '75%' }}/>
                        <img src={imageNotFilled} alt='Cargando imagenes' className='loading-image progress' style={{ width: '75%' }}/>
                    </section>
                </section>

                <section className='show-announcement-info'>
                    <section className='show-annoucement-general'>
                            <div className='div-loading-content' style={{ height: '35px', marginTop: '50px' }}></div>
                            <div className='div-loading-content' style={{ height: '35px', marginBottom: '50px' }}></div>

                            <div className='div-loading-content' style={{ height: '45px', marginBottom: '20px' }}></div>
                            <div className='div-loading-content' style={{ width: 'min(100%, 300px)' }}></div>
                            <div className='div-loading-content' style={{ width: 'min(100%, 300px)' }}></div>
                            <div className='div-loading-content' style={{ width: 'min(100%, 300px)' }}></div>
                            <div className='div-loading-content' style={{ width: 'min(100%, 300px)' }}></div>
                            <div className='div-loading-content' style={{ width: 'min(100%, 300px)' }}></div>
                    </section>
                </section>
            </main>
                
        </ContentLayout>
    )
}

export default MainShowAnn

function capitalizeFirstLetter(str) {
    try{
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }catch(err){
        return str;
    }
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

function showPrice(price){
    if(price == 0) return "GRATIS"
    try{
        const number = parseFloat(price);
        if( isNaN(number) ) throw Error("SI");
        return `$${number.toLocaleString()} MXN`
    }catch(err){
        return price;
    }
}