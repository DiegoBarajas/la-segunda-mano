import React, { useState } from 'react'
import HeadCreateAnn from '../Fragments/HeadCreateAnn';
import PageLayout from '../Layouts/PageLayout';
import GeneralServicio from '../Fragments/GeneralServicio';
import CaracteristicasServicio from '../Fragments/CaracteristicasServicio';
import ContactoProducto from '../Fragments/ContactoProducto';

import '../Styles/Pages/CreateAnnouncement.css';
import ContactoServicio from '../Fragments/ContactoServicio';

const CreateService = () => {
    document.title = 'La Segunda Mano - Crear anuncio (Servicio)';
    
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ formData, setFormData ] = useState(new FormData());

    const [ formDataGeneral, setFormDataGeneral ] = useState(null);
    
    const renderForm = () => {
        switch(currentStep){
            case 1: return (
                    <GeneralServicio 
                        setFormData={setFormData}
                        setCurrentFormData={setFormDataGeneral}
                        callBack={() => setCurrentStep(2)} 
                    />
                )
            case 2: return (
                    <CaracteristicasServicio 
                        formData={formData} 
                        setFormData={setFormData} 
                        callBack={() => setCurrentStep(3)} 
                        handleBack={() => {
                            setFormData(new FormData());
                            setCurrentStep(1);
                        }} 
                    />
                )
            case 3: return (
                    <ContactoServicio 
                        formData={formData} 
                        handleBack={() => {
                            setFormData(formDataGeneral);
                            setCurrentStep(2);
                        }} 
                    />
                )
            default: return (
                    <GeneralServicio 
                        setFormData={setFormData}
                        setCurrentFormData={setFormDataGeneral}
                        callBack={() => setCurrentStep(2)} 
                    />
                )
        }
    }

    const getDescription = () => {
        switch(currentStep){
            case 1: return ""
            case 2: return ""
            case 3: return ""
        }
    }

    return (
        <PageLayout footer={false}>

            <HeadCreateAnn
                type='Servicio'
                currentStep={currentStep}
                description={getDescription()}
            />
    
            { renderForm() }
              
        </PageLayout>
    )
}

export default CreateService