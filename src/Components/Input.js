import React, { useRef } from 'react'
import '../Styles/Components/Input.css';

const Input = ({ label, id, name, className, placeholder, auxText, min, value=null, type='text', title, minLength, width='100%', mb='5px', pattern, required=false, icon=null, textArea=false, onChange }) => {

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
                {
                    textArea
                        ?  <textarea
                                id={id}
                                name={name}
                                className={`input ${icon ? 'input-with-icon' : ''} `}
                                placeholder={placeholder}
                                minLength={minLength}
                                type={type}
                                onChange={onChange}
                                value={value}
                                style={{ 
                                    minHeight: '100px',
                                    minWidth: width
                                }}
                                required={required}
                            >

                            </textarea>
                        : <input
                            id={id}
                            name={name}
                            className={`input ${icon ? 'input-with-icon' : ''} `}
                            placeholder={placeholder}
                            minLength={minLength}
                            type={type}
                            onChange={onChange}
                            value={value}
                            required={required}
                            min={min}
                            pattern={pattern}
                        />
                }
            </div>
            <p ref={afterTextElement} className='input-aux-text'>{auxText}</p>
        </div>
    )
}

export default Input