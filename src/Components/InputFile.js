import React from 'react'
import '../Styles/Components/Input.css'
import Button from './Button'

import removeFileSvg from '../Assets/Icons/removeFile.svg'

const InputFile = ({ children, id, className, title, name, accept, width, mb, label, icon, selectedFile=null, multiple=false, required=false, onChange, onQuitFile }) => {
    return selectedFile
        ? (
            <section className={`input-container ${className}`} style={{ width: width, marginBottom: mb }} title={title}>
                <label htmlFor={id}><b>{label}{required ? <span className='required'>*</span> : ""}</b></label>
                <label htmlFor={id} className='label-input-file label-input-file-vertical'>
                    {children}
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
                />
                <Button icon={removeFileSvg} horizontal className='btn-quit-file' color='red' onClick={onQuitFile}>Quitar archivo</Button>
            </section>
        )
        : (
            <section className={`input-container ${className}`} style={{ width: width, marginBottom: mb }} title={title}>
                <label htmlFor={id}><b>{label}{required ? <span className='required'>*</span> : ""}</b></label>
                <label htmlFor={id} className='label-input-file'>
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
                />
            </section>
        )
}

export default InputFile