import React from 'react'
import { Navigate } from 'react-router-dom'
import '../Styles/Layouts/ContentLayout.css'

const ContentLayout = ({children, id, className, complete=false, size="regular", verticalAlign='start', horizontalAlign='start', redirect=null}) => {    
      return (
            <section 
                id={id}
                style={{ alignItems: horizontalAlign, justifyContent: verticalAlign }}
                className={
                    complete 
                        ? `complete-layout content-layout ${size} ${className}`
                        : `content-layout ${size} ${className}`
                }
            >
                {children}
                { redirect ? <Navigate to={redirect}/> : <></> }
            </section>
        )
    
}

export default ContentLayout