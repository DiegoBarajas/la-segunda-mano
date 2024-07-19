import React, { useState } from 'react'
import HeadCreateAnn from '../Fragments/HeadCreateAnn';
import PageLayout from '../Layouts/PageLayout';
import GeneralProducto from '../Fragments/GeneralProducto';
import CaracteristicasProducto from '../Fragments/CaracteristicasProducto';
import ContactoProducto from '../Fragments/ContactoProducto';

import '../Styles/Pages/CreateAnnouncement.css';

const CreateProducto = () => {
    document.title = 'La Segunda Mano - Crear anuncio (Producto)';
    
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ formData, setFormData ] = useState(new FormData());

    const [ formDataGeneral, setFormDataGeneral ] = useState(null);
    
    const renderForm = () => {
        switch(currentStep){
            case 1: return (
                    <GeneralProducto 
                        setFormData={setFormData}
                        setCurrentFormData={setFormDataGeneral}
                        callBack={() => setCurrentStep(2)} 
                    />
                )
            case 2: return (
                    <CaracteristicasProducto 
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
                    <GeneralProducto 
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
            case 2: return "Agrega las características especificas de tu articulo, no es necesario agregar todas, solo las que se ajusten a tu articulo. Por ejemplo “Talla” para una camisa."
            case 3: return ""
        }
    }

    return (
        <PageLayout footer={false}>

            <HeadCreateAnn
                type='Producto'
                currentStep={currentStep}
                description={getDescription()}
            />
    
            { renderForm() }
              
        </PageLayout>
    )
}

export default CreateProducto