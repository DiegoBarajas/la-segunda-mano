import React from 'react';
import '../Styles/Components/Button.css'

const IconButton = ({ icon, color='mint', title, alt, style }) => {
    return (
        <button 
            className={`icon-button ${color}`} 
            title={title}
            style={style}
        >
            <img className='icon-button-img' src={icon} alt={alt}/>
        </button>
    )
}

export default IconButton