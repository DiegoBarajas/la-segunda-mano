import React from 'react'

import reviewIconColor from '../Assets/Icons/reviewIconColor.svg'
import vendedorIconColor from '../Assets/Icons/vendedorIconColor.svg'
import announcementiconColor from '../Assets/Icons/announcementiconColor.svg'

const ReportItem = ({ report }) => {
    return (
        <tr className='table-row-report'>
            <td className='table-field td-center' title={report._id} >{report._id}</td>
            <td className='table-field td-center' title={report.fechaCreacion} >{parseDate(report.fechaCreacion)}</td>
            <td className='table-field' title={report.razon} >{report.razon}</td>
            <td className='table-field' title={report.descripcion} >{report.descripcion}</td>
            <td className='table-field td-center' title={report.estado} ><p>{report.estado}</p></td>
            <td className='table-field' title={report.tipo.toUpperCase()} >{ chooseType(report.tipo) }</td>
        </tr>
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

function parseDate(date){
    try{
        const [dia, mes, año] = date.split('-');
        const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];


        return `${dia} ${meses[mes-1].toLowerCase()} ${año}`;
    }catch(err){       
        return date;
    }
}