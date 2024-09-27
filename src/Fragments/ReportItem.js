import React from 'react'

import reviewIconColor from '../Assets/Icons/reviewIconColor.svg'
import vendedorIconColor from '../Assets/Icons/vendedorIconColor.svg'
import announcementiconColor from '../Assets/Icons/announcementiconColor.svg'

const ReportItem = ({ report }) => {
    return (
        <div className='report-item-container'>
            <section className='report-item-header'>
                <h3>{report.razon}</h3>
                {chooseType(report.tipo)}
                
            </section>
            <p className='report-item-description'>{report.descripcion}</p>

            <span className='report-item-status'>
                <b>Estado: </b> <u>{report.estado}</u> 
            </span>

        </div>
    )
}

export default ReportItem

function chooseType(type) {
    switch(type){
        case "vendedor": return (
            <div className={`report-item-type report-item-type-${type}`}>
                <img src={ vendedorIconColor } alt={type} />
                <b>{type.toUpperCase()}</b>
            </div>
        )

        case "reseña": return (
            <div className={`report-item-type report-item-type-${type}`}>
                <img src={ reviewIconColor } alt={type} />
                <b>{type.toUpperCase()}</b>
            </div>
        )

        case "publicacion": return (
            <div className={`report-item-type report-item-type-${type}`}>
                <img src={ announcementiconColor } alt={type} />
                <b>{type.toUpperCase()}</b>
            </div>
        )

        default: return null;

    }
}