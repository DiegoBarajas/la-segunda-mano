import React from 'react';
import '../Styles/Components/Button.css';

const Button = ({children, title, type='button', width='auto', horizontal=false, icon=null, color='mint', iconSize='30px', mb='5px', disabled=false, onClick }) => {
    return (
        <button
            title={title}
            style={{ width: width, marginBottom: mb }}
            className={`button ${color} ${horizontal ? 'horizontal' : ''} ${disabled ? 'btn-disabled' : ''}`}
            type={type}
            onClick={
                disabled 
                    ? () => {}
                    : onClick
            }
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