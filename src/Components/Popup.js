import React from 'react'
import '../Styles/Components/Popup.css'

const Popup = ({children, active}) => {
    return active
        ? (
            <div className='background-popup'>
                { children }
            </div>
        ) : <></>
}

export default Popup