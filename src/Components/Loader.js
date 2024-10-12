import React from 'react'
import '../Styles/Components/Loader.css'

const Loader = ({ small=false }) => {
    return (
        <div className={small ? 'small-loader' : 'loader'}></div>
    )
}

export default Loader