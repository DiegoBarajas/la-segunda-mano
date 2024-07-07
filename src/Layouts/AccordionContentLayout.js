import React, { useState } from 'react'
import ContentLayout from './ContentLayout'

import upArrowSvg from '../Assets/Icons/upArrow.svg'
import downArrowSvg from '../Assets/Icons/downArrow.svg'

import '../Styles/Layouts/ContentLayout.css'

const AccordionContentLayout = ({children, id, className, complete=false, size="regular", verticalAlign='start', horizontalAlign='start', redirect=null, titulo}) => {
    
    const [ opened, setOpened ] = useState(false);

    return (
        <ContentLayout 
            id={id}
            className={`content-layout accordion-content-layout ${className}`}
            complete={complete}
            size={size}
            verticalAlign={verticalAlign}
            horizontalAlign={horizontalAlign}
            redirect={redirect}
        >
            <section className={opened ? 'accordion-content-layout-open' : 'accordion-content-layout-closed'} onClick={() => setOpened(!opened)} title='Cerrar sección'>
                <h1>{titulo}</h1>
                <img 
                    className={`image-arrow-accordion ${opened ? 'icon-rotated' : ''}`} 
                    src={downArrowSvg} 
                    alt={opened ? "Cerrar" : 'Abrir'}/>
            </section>
            { opened ? children : null }
        </ContentLayout>
        )
}

export default AccordionContentLayout