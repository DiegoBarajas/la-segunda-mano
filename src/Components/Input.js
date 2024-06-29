import React, { useRef } from 'react'
import '../Styles/Components/Input.css';

const Input = ({ label, id, name, className, placeholder, auxText, value=null, type='text', title, minLength, width='100%', mb='5px', required=false, icon=null, onChange }) => {

    const afterTextElement = useRef(null);

    return (
        <div className={`input-container ${className}`} style={{ width: width, marginBottom: mb }}>
            <label title={title} htmlFor={id}><b>{label}{required ? <span className='required'>*</span> : ""}</b></label>
            <div className='input-element'>
                {
                    icon 
                        ? <img src={icon} alt='Icon' className='icon-input' />
                        : <></> 
                }
                <input
                    id={id}
                    name={name}
                    className={`input ${icon ? 'input-with-icon' : ''} `}
                    placeholder={placeholder}
                    minLength={minLength}
                    type={type}
                    onChange={onChange}
                    value={value}
                />
            </div>
            <p ref={afterTextElement} className='input-aux-text'>{auxText}</p>
        </div>
    )
}

export default Input