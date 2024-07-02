import React from 'react';
import { Link } from 'react-router-dom';

import '../Styles/Components/ItemNavbar.css';

const ItemNavbar = ({children, icon, to, title, className, color, direction='horizontal', round=false, onClick}) => {
  return (
	<li className={`item-navbar ${className}`} onClick={onClick} style={{ backgroundColor: color ? color : '' }}>
        <Link className={`link-item-navbar ${direction}-item-navbar`} to={to} title={title}>
            <img className='icon-item-navbar' src={icon} alt='Vender' style={round ? { borderRadius: 10000, border: '2px solid white' } : {}}/>
            {children}
        </Link>
    </li>  
  )
}

export default ItemNavbar