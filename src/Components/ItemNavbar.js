import React from 'react';
import { Link } from 'react-router-dom';

import '../Styles/Components/ItemNavbar.css';

const ItemNavbar = ({icon, to, children, direction='horizontal'}) => {
  return (
	<li className='item-navbar'>
        <Link className={`link-item-navbar ${direction}-item-navbar`} to={to}>
            <img className='icon-item-navbar' src={icon} alt='Vender'/>
            {children}
        </Link>
    </li>  
  )
}

export default ItemNavbar