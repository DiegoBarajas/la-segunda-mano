import React, { useEffect } from 'react'

import PageLayout from '../Layouts/PageLayout'
import ContententLayout from '../Layouts/ContentLayout.js'

const Index = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    return (
        <PageLayout>

            <ContententLayout horizontalAlign='center'>
                <h1>Hola</h1>
            </ContententLayout>


            
        </PageLayout>
    )
}

export default Index