import React from 'react'
import '../Styles/Layouts/ContentLayout.css'

const ContentLayout = ({children, complete=false}) => {
    return (
        <section className={complete ? 'complete-layout content-layout' : 'content-layout'}>
            {children}
        </section>
    )
}

export default ContentLayout