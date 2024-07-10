import React from 'react'
import ContentLayout from '../Layouts/ContentLayout'
import Steper from '../Components/Steper'

import constants from '../constants.json';
import '../Styles/Pages/CreateAnnouncement.css';

const HeadCreateAnn = ({ currentStep, description, type=null }) => {
    return (
        <ContentLayout horizontalAlign='center'>
                <h1 style={{ width: '100%', textAlign: 'center' }} >Crear publicación  {type ? `(${type})` : ''}</h1>
                <h3>Paso {currentStep+1}</h3>
                
                <Steper
                    steps={constants.pasosCrearAnuncio}
                    current={currentStep}
                />
            <p className='head-create-ann-descr'>{description}</p>
        </ContentLayout>
    )
}

export default HeadCreateAnn