import React, { useState } from 'react'
import HeadCreateAnn from '../Fragments/HeadCreateAnn';
import PageLayout from '../Layouts/PageLayout';
import GeneralInmueble from '../Fragments/GeneralInmueble';
import CaracteristicasInmueble from '../Fragments/CaracteristicasInmueble';

import '../Styles/Pages/CreateAnnouncement.css';
import ContactoInmueble from '../Fragments/ContactoInmueble';

const CreateInmueble = () => {
    
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ formData, setFormData ] = useState(new FormData());

    const [ formDataGeneral, setFormDataGeneral ] = useState(null);
    
    const renderForm = () => {
        switch(currentStep){
            case 1: return (
                    <GeneralInmueble 
                        setFormData={setFormData}
                        setCurrentFormData={setFormDataGeneral}
                        callBack={() => setCurrentStep(2)} 
                    />
                )
            case 2: return (
                    <CaracteristicasInmueble 
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
                    <ContactoInmueble
                        formData={formData} 
                        handleBack={() => {
                            setFormData(formDataGeneral);
                            setCurrentStep(2);
                        }} 
                    />
                )
            default: return (
                    <GeneralInmueble 
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
            case 2: return "Agrega las características especificas de tu inmueble, no es necesario agregar todas, solo las que se desee compartir."
            case 3: return ""
        }
    }

    return (
        <PageLayout footer={false}>

            <HeadCreateAnn
                type='Inmueble'
                currentStep={currentStep}
                description={getDescription()}
            />
    
            { renderForm() }
              
        </PageLayout>
    )
}

export default CreateInmueble