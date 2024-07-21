import React, { useEffect } from 'react'
import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import Loader from '../Components/Loader'

import '../Styles/Pages/LoadingPage.css'

const LoadingPage = ({ children='Cargando...' }) => {

    document.title = 'La Segunda Mano - Cargando...';

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    return (
        <PageLayout navbar={false} footer={false}>

            <ContentLayout size='small' horizontalAlign='center' className='loading-page-layout'>
                <Loader/>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>{children}</p>
            </ContentLayout>

        </PageLayout>
    )
}

export default LoadingPage