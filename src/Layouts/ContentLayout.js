import React, { useEffect } from 'react'
import '../Styles/Layouts/ContentLayout.css'

const ContentLayout = ({children, id, className, complete=false, size="regular", verticalAlign='start', horizontalAlign='start', form=false, onSubmit}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, []);
    
      return form
      ? (
        <form 
            id={id}
            onSubmit={onSubmit}
            style={{ alignItems: horizontalAlign, justifyContent: verticalAlign }}
            className={
                complete 
                    ? `complete-layout content-layout ${size} ${className}`
                    : `complete-layout ${size} ${className}`
            }
        >
            {children}
        </form>
    )
      : (
        <section 
            id={id}
            style={{ alignItems: horizontalAlign, justifyContent: verticalAlign }}
            className={
                complete 
                    ? `complete-layout content-layout ${size} ${className}`
                    : `complete-layout ${size} ${className}`
            }
        >
            {children}
        </section>
    )
    
}

export default ContentLayout