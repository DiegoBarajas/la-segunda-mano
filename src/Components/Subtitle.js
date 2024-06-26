import React from 'react'
import '../Styles/Components/Text.css'

const Subtitle = ({children, center=false, mb=-1}) => {
    return (
        <h1
            className={`subtitle ${center ? 'center' : ''}`}
            style={{ marginBottom: mb > 0 ? `${mb}px` : 0 }}

        >{children}</h1>
    )
}

export default Subtitle