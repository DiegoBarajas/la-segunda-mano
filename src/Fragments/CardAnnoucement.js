import React from 'react'

import locationSvg from '../Assets/Icons/location.svg'
import imageSvg from '../Assets/Icons/image.svg'


import '../Styles/Fragments/CardAnnoucement.css'
import { Link } from 'react-router-dom'

const CardAnnoucement = ({ann}) => {
    return ann ? (
        <Link to={`/anuncio/${ann._id}`} className='card-annoucement'>
            <img src={ann.imagenes[0]} alt="Imagen" className='img-card-annoucement'/>
            <p className='title-card-annoucement'>{ann.titulo}</p>
            <h3 className='price-card-annoucement'>{showPrice(ann.precio)}</h3>
            <p className='location-card-annoucement'><img src={locationSvg} alt="Ubicacion"/>{ann.caracteristicas.ciudad}, {ann.caracteristicas.estado}.</p>
            
        </Link>
    ) : (
        <section className='card-annoucement'>
            <img src={imageSvg} alt="Cargando Imagen" className='img-card-annoucement loading-image progress'/>
            <div className='div-loading-content' style={{ margin: '0 10px 5px 10px', width: 'min(90%, 300px)', minHeight: '16px' }}></div>
            <div className='div-loading-content' style={{ margin: '0 10px 15px 10px', width: 'min(90%, 300px)', minHeight: '16px' }}></div>

            <div className='div-loading-content' style={{ margin: '0 10px 5px 10px', width: 'min(50%, 150px)', minHeight: '20px' }}></div>
            <div className='div-loading-content' style={{ margin: '0 10px 5px 10px', width: 'min(57%, 170px)', minHeight: '16px' }}></div>
        </section>
    )
}

export default CardAnnoucement

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