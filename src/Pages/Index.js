import React, { useEffect } from 'react'

import PageLayout from '../Layouts/PageLayout'
import ContententLayout from '../Layouts/ContentLayout.js'
import Slider from '../Fragments/Slider.js';

import '../Styles/Pages/Index.css';

const Index = () => {
    document.title = 'La Segunda Mano - Inicio';

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <PageLayout className='no-padding'>

            <Slider/>
            
        
        </PageLayout>
    )
}

export default Index