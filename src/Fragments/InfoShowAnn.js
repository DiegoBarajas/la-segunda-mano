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
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
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