import React from 'react'

import placeholderSvg from '../Assets/Icons/notificationPlaceholder.svg'
import deletedNotificationSvg from '../Assets/Icons/deletedNotification.svg'
import selledNotificationSvg from '../Assets/Icons/selledNotification.svg'
import annoucementDeletedSvg from '../Assets/Icons/annoucementDeleted.svg'
import annoucementCaducedSvg from '../Assets/Icons/annoucementCaduced.svg'

import '../Styles/Fragments/Notification.css'
import { Link } from 'react-router-dom'

const Notification = ({ notification }) => {
    return (
        <Link className='notification' to={notification.link}>
            <img src={renderIcon(notification.icono)} alt='Icono'/>

            <section className='content-notification'>
                <div className='content-notification-date'><p>{notification.fecha}</p></div>
                <h3>{notification.titulo}</h3>
                <p>{notification.contenido}</p>
            </section>
        </Link>
    )
}

export default Notification

const renderIcon = (icon) => {
    switch(icon){
        case "default": return placeholderSvg;
        case "deleteNotification": return deletedNotificationSvg;
        case "selledNotification": return selledNotificationSvg;
        case "annoucementDeleted": return annoucementDeletedSvg;
        case "annoucementCaduced": return annoucementCaducedSvg;
        default: return placeholderSvg;
    }
}