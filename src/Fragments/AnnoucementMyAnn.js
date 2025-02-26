import React from 'react'
import { Link } from 'react-router-dom'

import imageSvg from '../Assets/Icons/imageNotFilled.svg'
import impulsedSvg from '../Assets/Icons/impulsed.svg'
import calendarSvg from '../Assets/Icons/calendar.svg'
import locationSvg from '../Assets/Icons/location.svg'
import premiumSvg from '../Assets/Icons/premium.svg'

import '../Styles/Pages/MyAnnoucements.css'
import ColumnLayout from '../Layouts/ColumnLayout'

const AnnoucementMyAnn = ({ann, showLabel=true, className}) => {
    return ann ?(
        <Link className={'annoucement-item-my '+className} to={`/anuncio/${ann._id}`}>
            <section className='annoucement-item-my-main'>
                <img src={ann.imagenes[0]} alt='Imagen'/>

                <div className='annoucement-item-my-main-sp'></div>

                <ColumnLayout verticalAlign='start' className="annoucement-item-my-main-col">
                    <h3>{ann.titulo}</h3>
                    <h2>{showPrice(ann.precio)}</h2>

                    <p className='annoucement-item-my-main-pub'><img src={calendarSvg} alt='Calendario' className='annoucement-item-my-main-icon'/><b>Publicado el:</b> {ann.fechaCreacion}</p>
                    <p className='annoucement-item-my-main-exp'><b>Expira el:</b> {ann.fechaExpiracion}</p>

                    <p className='annoucement-item-my-main-desc'>{ann.descripcion}</p>
                </ColumnLayout>
            </section>

            <section className='annoucement-item-my-sec'>
                <p className='annoucement-item-my-main-pub'><img src={locationSvg} className='annoucement-item-my-main-icon' alt='Ubicacion'/><b>{capitalizeFirstLetter(ann.caracteristicas.ciudad).trim()}, {capitalizeFirstLetter(ann.caracteristicas.estado)}</b></p>
                { 
                    showLabel ? (
                        ann.nivel !== 'estandar' 
                        ? ann.nivel === 'impulsado'
                            ? <p className='p-nivel-ann p-mint'><img src={impulsedSvg}/>Impulsado</p>
                            : <p className='p-nivel-ann p-gold'><img src={premiumSvg}/>Premium</p>
                        : null
                    ) : null
                    
                }
            </section>
        </Link>
    ) : (
        <section className={'annoucement-item-my '+className}>
            <section className='annoucement-item-my-main'>
                <img src={imageSvg} alt='Imagen' className='loading-image progress'/>

                <ColumnLayout verticalAlign='start'>
                    <div className='div-loading-content' style={{ minHeight: '12px', marginBottom: '5px' }}></div>
                    <div className='div-loading-content' style={{ minHeight: '12px', marginBottom: '20px' }}></div>

                    <div className='div-loading-content' style={{ minHeight: '20px' }}></div>

                    <div className='div-loading-content' style={{ minHeight: '10px', width: 'min(100%, 100px)', marginBottom: '5px' }}></div>
                    <div className='div-loading-content' style={{ minHeight: '10px', width: 'min(100%, 100px)', marginBottom: '5px' }}></div>


                    <div className='div-loading-content' style={{ minHeight: '10px', width: '100%', marginBottom: '5px' }}></div>
                    <div className='div-loading-content' style={{ minHeight: '10px', width: '100%', marginBottom: '5px' }}></div>
                    <div className='div-loading-content' style={{ minHeight: '10px', width: 'min(100%, 300px)', marginBottom: '5px' }}></div>

                </ColumnLayout>

            </section>

            <section className='annoucement-item-my-sec'>
                <div className='div-loading-content' style={{ minHeight: '10px', width: 'min(100%, 200px)' }}></div>
            </section>
        </section>
    )
}

export default AnnoucementMyAnn

function capitalizeFirstLetter(str) {
    try{
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }catch(err){
        return str;
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