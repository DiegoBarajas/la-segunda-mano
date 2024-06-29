import React from 'react'
import '../Styles/Layouts/ContentLayout.css'
import { Navigate } from 'react-router-dom'

const ContentLayout = ({children, id, className, complete=false, size="regular", verticalAlign='start', horizontalAlign='start', redirect=null, onSubmit}) => {    
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