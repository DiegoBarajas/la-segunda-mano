import React, { useState } from 'react'
import ContentLayout from '../Layouts/ContentLayout'
import formasEntregaSvg from '../Assets/Icons/formasEntrega.svg'
import '../Styles/Pages/ShowAnnouncement.css';

const InfoShowAnn = ({announcement}) => {

    const [ expandedDescr, setExpandedDescr ] = useState(false);


    return announcement ? (
        <ContentLayout horizontalAlign='center'>
            <section className='information-annoucement'>
                <h2 className='h2-information-annoucement'>Información del producto</h2>
                <p className={`p-information-annoucement ${!expandedDescr ? "contraido" : ""}`} title={!expandedDescr ? "Mostrar todo" : ""} style={{ cursor: !expandedDescr ? "pointer" : "" }} onClick={() => setExpandedDescr(true)}>
                {
                    announcement.descripcion.split('\n').map( (text) => <>{text}<br/></> )
                }
                </p>
            </section>

            <h2 style={{ width: '100%', textAlign: 'start', marginTop: '20px' }}>Características del producto</h2>
            <section className='caracteristicas-annoucement'>

                {
                    Object.keys(announcement.caracteristicas).map(key => {
                        return (announcement.caracteristicas[key] !== '') && (announcement.caracteristicas[key] !== null) && !['ciudad', 'cantidad', 'estado'].includes(key)
                            ? <section className='caracteristica-annoucement' key={'caracteristicas-'+key}>
                                <h3>{getNameCaracteristica(key)}</h3>
                                <div className='caracteristica-annoucement-content'>
                                    <img src={selectIcon(key)} alt={key} />
                                        <p>{announcement.caracteristicas[key] === true ? 'Si' : announcement.caracteristicas[key] === false ? 'No' : capitalizeFirstLetter(announcement.caracteristicas[key])}</p>
                                    </div>
                                </section>
                                : null
                        })
                }
                
            </section>

            <h2 style={{ width: '100%', textAlign: 'start', marginTop: '20px' }}>Formas de entrega</h2>
            <section className='caracteristicas-annoucement'>
                {
                    announcement.formasEntrega
                        ? announcement.formasEntrega.map((forma) => 
                                <section className='caracteristica-annoucement'>
                                    <div className='caracteristica-annoucement-content'>
                                        <img src={formasEntregaSvg} alt={'Forma entrega'} />
                                        <p key={'formas-'+forma.forma}>{forma.forma}{forma.detalles ? `: ${forma.detalles}` : null}.</p>             
                                    </div>
                                </section>
                            )      
                        : null
                }
            </section>
        </ContentLayout>
    ) : (
        <ContentLayout horizontalAlign='center'>
            <section className='information-annoucement'>
                <h2 className='h2-information-annoucement'>Información del producto</h2>
                <div className='div-loading-content'></div>
                <div className='div-loading-content'></div>
                <div className='div-loading-content'></div>
                <div className='div-loading-content' style={{ width: 'min(100%, 500px)' }}></div>
            </section>

            <section className='caracteristicas-annoucement'>
                <div className='div-loading-content' style={{ width: '75%' }}></div>
                <div className='div-loading-content' style={{ width: '75%' }}></div>
                <div className='div-loading-content' style={{ width: '75%' }}></div>
                <div className='div-loading-content' style={{ width: '75%' }}></div>
                <div className='div-loading-content' style={{ width: '75%' }}></div>
                <div className='div-loading-content' style={{ width: '75%' }}></div>
                <div className='div-loading-content' style={{ width: '75%' }}></div>
                <div className='div-loading-content' style={{ width: '75%' }}></div>

            </section>
        </ContentLayout>
    )
}

export default InfoShowAnn

function capitalizeFirstLetter(str) {
    try{
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }catch(err){
        return str;
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
        smartTV: "¿Es SmartTV?",
        deudas: "¿Tiene deudas?",
        cilindros: "Cantidad de cilindros",
        cp: "Código Postal",
        rentaOVenta: "¿Es Renta o venta?",
        superficie: "Superficie m2",
        "baños": "Cantidad de baños",
        habitaciones: "Cantidad de habitaciones"
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