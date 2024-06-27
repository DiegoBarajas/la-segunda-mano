import React from 'react'
import '../Styles/Fragments/HistoryNavbar.css'

import historySvg from '../Assets/Icons/history.svg'
import { Link } from 'react-router-dom'

const ItemHistory = ({ children }) => {

    return (
        <Link className='item-history' to={`/search?busqueda=${children}`} title={`Buscar "${children}"`}>
            <img className='icon-item-history' src={historySvg} alt='Hist'/>
            <p>{ children }</p>
        </Link>
    )
}

export default ItemHistory