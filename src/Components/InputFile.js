import React, { useRef } from 'react'
import '../Styles/Components/Input.css'
import Button from './Button'

import removeFileSvg from '../Assets/Icons/removeFile.svg'

const InputFile = ({ children, id, className, title, name, accept, width, mb, label, icon, selectedFile=null, auxText, multiple=false, required=false, disabled, onChange, onQuitFile }) => {
    
    const afterTextElement = useRef(null);

    return selectedFile
        ? (
            <section className={`input-container ${className}`} style={{ width: width, marginBottom: mb }} title={title}>
                <label htmlFor={id}><b>{label}{required ? <span className='required'>*</span> : ""}</b></label>
                <label htmlFor={id} className={`label-input-file label-input-file-vertical ${disabled ? 'label-input-file-disabled' : ''}`}>
                    <p>{children}</p>
                    {
                        <img className='image-input-file' src={ URL.createObjectURL(selectedFile) } alt='Imagen'/>
                    }
                </label>
                <input 
                    type='file'
                    id={id}
                    name={name}
                    accept={accept}
                    multiple={multiple}
                    required={required}
                    className='none'
                    onChange={onChange}
                    disabled={disabled}
                />
                <p ref={afterTextElement} className='input-aux-text'>{auxText}</p>

                { multiple ? <></> : <Button icon={removeFileSvg} horizontal className='btn-quit-file' color='red' onClick={onQuitFile}>Quitar imagen</Button> }
            </section>
        )
        : (
            <section className={`input-container ${className}`} style={{ width: width, marginBottom: mb }} title={title}>
                <label htmlFor={id}><b>{label}{required ? <span className='required'>*</span> : ""}</b></label>
                <label htmlFor={id} className={`label-input-file ${disabled ? 'label-input-file-disabled' : ''}`}>
                    {children}
                    {
                        icon ? <img className='icon-input-file' src={icon} alt='Imagen'/> : <></>
                    }
                </label>
                <input 
                    type='file'
                    id={id}
                    name={name}
                    accept={accept}
                    multiple={multiple}
                    required={required}
                    className='none'
                    onChange={onChange}
                    disabled={disabled}
                />
                <p ref={afterTextElement} className='input-aux-text'>{auxText}</p>
            </section>
        )
}

export default InputFile