import React, { useRef, useState } from 'react'
import '../Styles/Components/Input.css';

const Input = ({ label, id, name, className, placeholder, auxText, min, value=null, defaultValue='', type='text', title, minLength, width='100%', minHeight='100px', mb='5px', pattern, required=false, icon=null, textArea=false, onChange=()=>{} }) => {

    const afterTextElement = useRef(null);
    const [ currentValue, setCurrentValue ] = useState(value ? value : defaultValue);

    const handleChange = (e) => {
        const { value } = e.target;

        setCurrentValue(value);
        onChange(e);
    }

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
                                onChange={handleChange}
                                value={currentValue}
                                style={{ 
                                    minHeight: minHeight,
                                    height: minHeight,
                                    minWidth: width,
                                    maxWidth: width
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
                            onChange={handleChange}
                            value={currentValue}
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