import React, { useRef } from 'react'
import '../Styles/Components/Select.css'

const Select = ({ label, id, name, className, auxText, title, value=null, options=[], width='100%', mb='5px', required=false, icon=null, selectedOption,  onChange }) => {

    const afterTextElement = useRef(null);

    return (
        <div className={`input-container ${className}`} style={{ width: width, marginBottom: mb }} title={title}>
            <label htmlFor={id}><b>{label}{required ? <span className='required'>*</span> : ""}</b></label>
            <div className='input-element'>
                {
                    icon 
                        ? <img src={icon} alt='Icon' className='icon-input' />
                        : <></> 
                }
                <select 
                    id={id} 
                    name={name}
                    value={value}
                    className={`input select ${icon ? 'input-with-icon' : ''} `}
                    onChange={onChange}
                    required={required}
                    defaultChecked='Jalisco'
                >
                    {
                        options.map((opt, index) => 
                            <option 
                                className='option' 
                                key={'option-'+index}
                                value={opt.value}
                                selected={ ( selectedOption === opt.value ) || (selectedOption === opt.text) }
                            >{opt.text}</option>
                        )
                    }
                </select>
            </div>
            <p ref={afterTextElement} className='input-aux-text'>{auxText}</p>
        </div>
    )
}
export default Select