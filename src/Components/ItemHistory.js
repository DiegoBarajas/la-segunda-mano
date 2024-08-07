import React from 'react'
import { Link } from 'react-router-dom'

import historySvg from '../Assets/Icons/history.svg'

import '../Styles/Fragments/HistoryNavbar.css'

const ItemHistory = ({ children }) => {

    const handleRedirect = () => {
        window.location.href = `/buscar?nombre=${children}`;
    }

    return (
        <Link className='item-history' onClick={handleRedirect} title={`Buscar "${children}"`}>
            <img className='icon-item-history' src={historySvg} alt='Hist'/>
            <p>{ children }</p>
        </Link>
    )
}

export default ItemHistory