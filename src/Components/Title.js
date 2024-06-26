import React from 'react'
import '../Styles/Components/Text.css'

const Title = ({children, center=true, mb=-1}) => {
    return (
        <h1
            className={`title ${center ? 'center' : ''}`}
            style={{ marginBottom: mb > 0 ? `${mb}px` : 0 }}

        >{children}</h1>
    )
}

export default Title