import React from 'react'
import '../Styles/Components/Select.css'

const Select = ({id, options=[], width=null, label, className}) => {
    return (
        <div className={`select-container ${className}`}>
            <label htmlFor={id}><b>{label}:</b></label>
            <select id={id} className='select'>
                {
                    options.map((opt, index) => 
                        <option key={'option-'+opt}>{opt}</option>
                    )
                }
            </select>
        </div>
    )
}

export default Select