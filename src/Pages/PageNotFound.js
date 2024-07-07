import React, { useEffect } from 'react'
import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import { Link } from 'react-router-dom'
import Button from '../Components/Button'

import '../Styles/Pages/PageNotFound.css'

const PageNotFound = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    return (
        <PageLayout>
            <ContentLayout horizontalAlign='center'>
                <h1 className='h1-page-not-found'>:-(</h1>
                <p>Página no encontrada</p>
                <Link className='link-page-not-found' to='/'><Button>Volver al incio</Button></Link>
            </ContentLayout>
        </PageLayout>
    )
}

export default PageNotFound