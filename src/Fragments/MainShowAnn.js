import React, { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-image-previewer';
import { SlideToolbar, CloseButton } from 'react-image-previewer/ui';
import ContactSelllerPopup from './ContactSelllerPopup';
import ContentLayout from '../Layouts/ContentLayout';
import ReportReviewPopup from './ReportReviewPopup';
import ShareAnnPupup from './ShareAnnPupup';
import IconButton from '../Components/IconButton';
import { Link, useParams } from 'react-router-dom';
import Button from '../Components/Button';

import imageNotFilled from '../Assets/Icons/imageNotFilled.svg'
import favoriteSvg from '../Assets/Icons/favoriteUnfilled.svg'
import favoriteFilledSvg from '../Assets/Icons/favoriteFilled.svg'
import deleteWhiteSvg from '../Assets/Icons/deleteWhite.svg'
import categorySvg from '../Assets/Icons/categoryBlack.svg'
import impulsedSvg from '../Assets/Icons/impulsed.svg'
import locationSvg from '../Assets/Icons/location.svg'
import calendarSvg from '../Assets/Icons/calendar.svg'
import contactSvg from '../Assets/Icons/contact.svg'
import premiumSvg from '../Assets/Icons/premium.svg'
import reportSvg from '../Assets/Icons/report.svg'
import selledSvg from '../Assets/Icons/selled.svg'
import stockSvg from '../Assets/Icons/stock.svg'
import shareSvg from '../Assets/Icons/share.svg'
import editSvg from '../Assets/Icons/edit.svg'
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

    const handleShare = () => {
        modals.popup(<ShareAnnPupup annoucement={announcement}/>, 'swal-contact-seller-popup');
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

    const handleDelete = () => {

        modals.confirm("¿Seguro que deseas eliminar el anuncio?", "Al aceptar se eliminara el anuncio de forma permanente. ¿Deseas proceder?", 'warning', handleConfirm);
        
        function handleConfirm(){
            if(announcement.nivel !== 'estandar'){
                return modals.confirm(`Tu anuncio tiene un nivel de pago ${capitalizeFirstLetter(announcement.nivel)}`, `Tu anuncio tiene un nivel de pago, este caduca el día <b>${parseDate(announcement.fechaExpiracion)}</b>. Al proceder se <b>ELIMINARÁ</b> y <b>PERDERÁ</b> y no se reembolsará lo invertido. ¿Deseas continuar?`, 'warning', deleteAnn);
            }

            deleteAnn();
        }

        async function deleteAnn(){
            try{
                const modal = modals.petitionAlert("Borrando anuncio", "Espere un momento...", 'info');

                const response = await axios.delete(`${backend}/api/announcement/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });

                modal.close();
                modals.toast("Anuncio eliminado")
                setRedirect('/perfil/anuncios')
            }catch(err){
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

    const handleSelled = () => {

        modals.confirm("¿Seguro que deseas marcar como vendido el anuncio?", "Al aceptar se eliminara el anuncio de forma permanente, si deseas marcar que vendiste solo una(s) pieza(s) puedes editar el anuncio. ¿Deseas proceder?", 'warning', handleConfirm);

        function handleConfirm(){
            if(announcement.nivel !== 'estandar'){
                return modals.confirm(`Tu anuncio tiene un nivel de pago ${capitalizeFirstLetter(announcement.nivel)}`, `Tu anuncio tiene un nivel de pago, este caduca el día <b>${parseDate(announcement.fechaExpiracion)}</b>. Al proceder se <b>ELIMINARÁ</b> y <b>PERDERÁ</b> y no se reembolsará lo invertido. ¿Deseas continuar?`, 'warning', deleteAnn);
            }

            deleteAnn();
        }

        async function deleteAnn(){
            try{
                const modal = modals.petitionAlert("Marcando como vendido y eliminando", "Espere un momento...", 'info');

                const response = await axios.delete(`${backend}/api/announcement/selled/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });

                modal.close();
                modals.toast("El anuncio se suprimio y marcó como vendido")
                setRedirect('/perfil/anuncios')
            }catch(err){
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
    
    const handleReport = () => {
        modals.popup(
            <ReportReviewPopup id={id} type="publicacion" />, 
            'report-review-popup',
            "Cancelar",
        );
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

                        <div className='show-annoucement-general-btns'>
                            <div className='div-fav-btn share'> <IconButton className='icon-button-create-ann' color='transparent' icon={shareSvg} title='Compartir' onClick={ handleShare }/> </div>
                            {
                                token 
                                    ? !mio
                                        ? <div className={`div-fav-btn ${isFavorite ? 'quit-from-favs' : ''}`}> <IconButton className='icon-button-create-ann' color='transparent' icon={ isFavorite ? favoriteFilledSvg : favoriteSvg } title={isFavorite ? "Quitar de favoritos" : 'Añadir a favoritos'} onClick={handleAddFavorite}/> </div>
                                        : <div className='div-fav-btn watch-as-a-client'> <IconButton className='icon-button-create-ann' color='transparent' icon={eyeSvg} title='Ver como comprador' onClick={() => window.location.href = `/anuncio/${id}?client=true`}/> </div>
                                    : null
                            }
                        </div>

                        <h1>{announcement.titulo}</h1>
                        <h3>{ renderLevel(announcement.nivel) }</h3>
                        <h2>
                            { showPrice(announcement.precio) }
                        </h2>

                        <ul>

                            <li>
                                <img src={categorySvg} alt='Categoria'/>
                                <p><b>Categoria:</b> <Link to={`/buscar?categoria=${announcement.categoria}`}> { capitalizeFirstLetter(announcement.categoria) } </Link></p>
                            </li>

                            <li>
                                <img src={locationSvg} alt='Ubicación'/>
                                <p><b>Ubicación:</b> <Link to={`/buscar?ciudad=${announcement.caracteristicas.ciudad.trim().toLowerCase()}`}>{announcement.caracteristicas.ciudad.trim()}</Link>, <Link to={`/buscar?estado=${announcement.caracteristicas.estado}`}>{capitalizeFirstLetter(announcement.caracteristicas.estado)}</Link></p>
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

                                        onClick={handleSelled}
                                    >Marcar como vendido</Button>

                                    <Button 
                                        width='100%' 
                                        icon={ deleteWhiteSvg }
                                        title='Eliminar anuncio'
                                        color='red' 

                                        onClick={handleDelete}
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
                                        title='Reportar este anuncio'
                                        icon={ reportSvg }
                                        width='100%' 
                                        color='red' 

                                        onClick={handleReport}
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

function renderLevel(nivel){
    switch(nivel){
        case "impulsado": return (
            <section className='level-type-container'>
                <img src={impulsedSvg} alt='Impulsado'/>
                <h3 className='p-mint'>Anuncio Impulsado</h3>
            </section>
        )
        case "premium": return (
            <section className='level-type-container'>
                <img src={premiumSvg} alt='Premium'/>
                <h3 className='p-gold'>Anuncio Premium</h3>
            </section>
        )
        default: return null
    }
}

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