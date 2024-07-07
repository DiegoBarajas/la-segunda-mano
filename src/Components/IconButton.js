import React from 'react';
import '../Styles/Components/Button.css'

const IconButton = ({ icon, type='button', color='mint', title, alt, style, className, onClick }) => {
    return (
        <button 
            className={`icon-button ${color} ${className}`} 
            title={title}
            style={style}
            type={type}
            onClick={onClick}
        >
            <img className='icon-button-img' src={icon} alt={alt}/>
        </button>
    )
}

export default IconButton