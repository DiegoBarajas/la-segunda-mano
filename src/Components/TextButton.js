import React from 'react'
import '../Styles/Components/Button.css'

const TextButton = ({ children, className, underline=true, mb, mt, width, textAlign, icon, disabled, onClick }) => {

    const handleClick = () => {
        if(disabled) return;
        if(onClick) onClick();
    }

    return (
        <button 
            className={`text-button ${disabled ? 'text-button-disabled' : ''} ${className}`} 
            onClick={handleClick}
            style={{
                textAlign: textAlign,
                width: width,
                marginTop: mt,
                marginBottom: mb,
                textDecoration: underline ? 'underline' : 'none'
            }}
        >
            { icon ? <img src={icon} alt='icono'/> : <></> }
            { children }
        </button>
    )
}

export default TextButton