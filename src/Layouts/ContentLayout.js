import React from 'react'
import '../Styles/Layouts/ContentLayout.css'

const ContentLayout = ({children}) => {
    return (
        <section className='content-layout'>
            {children}
        </section>
    )
}

export default ContentLayout