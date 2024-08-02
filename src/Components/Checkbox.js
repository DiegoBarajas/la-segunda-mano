import React from 'react'

import '../Styles/Components/Checkbox.css'

const Checkbox = ({id, name, className, label, title, checked, value, width, onChange, ref=null}) => {
    return (
        <section className={`checkbox ${className}`} title={title} style={{ width: width }} >
            <input 
                ref={ref}
                id={id}
                name={name}
                type='checkbox'
                className='input-checkbox'
                checked={checked}
                onChange={onChange}
                value={value}
            />
            <label
                htmlFor={id}
            >{label}</label>
        </section>
    )
}

export default Checkbox