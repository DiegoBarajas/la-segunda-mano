import React from 'react'
import '../Styles/Layouts/ColumnLayout.css'

const ColumnLayout = ({children, className, horizontalAlign, verticalAlign, width}) => {
    return (
        <div 
            className={`column ${className}`}
            style={{
                justifyContent: horizontalAlign,
                alignItems: verticalAlign,
                width: width,
            }}
        >
            {children}
        </div>
    )
}

export default ColumnLayout