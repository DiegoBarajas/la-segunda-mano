import React from 'react'
import '../Styles/Components/Text.css'

const P = ({children, lines, mb=-1}) => {
    return (
        <p 
            style={{ WebkitLineClamp: lines, marginBottom: mb > 0 ? `${mb}px` : 0 }}
            className='parragraph'
        >{children}</p>
    )
}

export default P