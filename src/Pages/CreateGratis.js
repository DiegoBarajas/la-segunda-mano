import React, { useState } from 'react'
import CaracteristicasGratis from '../Fragments/CaracteristicasGratis';
import ContactoProducto from '../Fragments/ContactoProducto';
import HeadCreateAnn from '../Fragments/HeadCreateAnn';
import GeneralGratis from '../Fragments/GeneralGratis';
import PageLayout from '../Layouts/PageLayout';

import '../Styles/Pages/CreateAnnouncement.css';

const CreateGratis = () => {
    document.title = 'La Segunda Mano - Crear anuncio (Gratis)';
    
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ formData, setFormData ] = useState(new FormData());

    const [ formDataGeneral, setFormDataGeneral ] = useState(null);

    const renderForm = () => {
        switch(currentStep){
            case 1: return (
                    <GeneralGratis 
                        setFormData={setFormData} 
                        setCurrentFormData={setFormDataGeneral}
                        callBack={() => setCurrentStep(2)} 
                    />
                )
            case 2: return (
                    <CaracteristicasGratis 
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
                    <ContactoProducto 
                        formData={formData} 
                        handleBack={() => {
                            setFormData(formDataGeneral);
                            setCurrentStep(2);
                        }} 
                    />
                )
            default: return (
                    <GeneralGratis 
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
            case 2: return "Agrega las características especificas de tu articulo, no es necesario agregar todas, solo las que se ajusten a tu articulo. Por ejemplo “Procesador” para una laptop."
            case 3: return ""
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
    }

    return (
        <PageLayout footer={false}>

            <HeadCreateAnn
                type='Gratis'
                currentStep={currentStep}
                description={getDescription()}
            />
    
            { renderForm() }
              
        </PageLayout>
    )
}

export default CreateGratis