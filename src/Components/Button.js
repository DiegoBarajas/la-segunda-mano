import React from 'react';
import '../Styles/Components/Button.css';

const Button = ({children, width='auto', horizontal=false, icon=null, color='mint', iconSize='30px', mb='5px', onClick }) => {
    return (
        <button
            style={{ width: width, marginBottom: mb }}
            className={`button ${color} ${horizontal ? 'horizontal' : ''}`}
            onClick={onClick}
        >
            {
                icon
                    ? <img src={icon} alt='Icon' style={{ width: iconSize, marginRight: horizontal ? '7px' : '0px' }}/>
                    : <></>
            }
            {children}
        </button>
    )
}

export default Button