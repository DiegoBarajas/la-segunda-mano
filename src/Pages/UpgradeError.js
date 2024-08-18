import React, { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import ContentLayout from '../Layouts/ContentLayout'
import PageLayout from '../Layouts/PageLayout'
import Button from '../Components/Button';

import errorSvg from '../Assets/Icons/error.svg'

const UpgradeError = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [ redirect, setRedirect ] = useState(null);

    // Convierte los parámetros de búsqueda en un objeto JSON
    const queryObject = Object.fromEntries([...searchParams]);

    return (
        <PageLayout>
            <ContentLayout horizontalAlign='center' redirect={redirect}>
                <img style={{ width: '100px' }} src={errorSvg} alt='Error'/>
                <h1 style={{ color: '#FF5E58' }}>{queryObject.title}</h1>
                <p style={{ marginTop: '20px', marginBottom: '50px' }}>{queryObject.message}</p>

                <Button width='70%' >¿Se hizo el cargo y no se aplicó la mejora?, Solicitar reembolso</Button>
                <Button width='70%' color='red' onClick={() => setRedirect('/')}>Ir al inicio</Button>
            </ContentLayout>
        </PageLayout>
    )
}

export default UpgradeError