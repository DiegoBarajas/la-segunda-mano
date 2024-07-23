import React, { useState } from 'react'

import '../Styles/Layouts/PaginationLayout.css'

const PaginationLayout = ({ titles=[], components=[], defaultIndex=0 }) => {

    const [ currentIndex, setCurrentIndex ] = useState(defaultIndex);

    const renderElement = () => {
        return components[currentIndex] ? components[currentIndex] : <p>No hay contenido en esta página.</p>;
    }

    return (
        <section className='pagination-layout'>
            <section className='pagination-buttons'>
                {
                    titles.map((title, index) => 
                        <button key={title} className={`button-pagination ${currentIndex === index ? 'button-pagination-active' : ''}`} onClick={() => setCurrentIndex(index)}title={title}>{title}</button>
                    )
                }
            </section>

            <section className='content-pagination'>
                { renderElement() }
            </section>
        </section>
    )
}

export default PaginationLayout