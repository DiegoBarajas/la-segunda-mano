import React, { useState } from 'react'
import HeadCreateAnn from '../Fragments/HeadCreateAnn';
import PageLayout from '../Layouts/PageLayout';
import GeneralVehiculo from '../Fragments/GeneralVehiculo';
import CaracteristicasVehiculo from '../Fragments/CaracteristicasVehiculo';
import ContactoVehiculo from '../Fragments/ContactoVehiculo';
import '../Styles/Pages/CreateAnnouncement.css';


const CreateVehicle = () => {
    
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ formData, setFormData ] = useState(new FormData());

    const [ formDataGeneral, setFormDataGeneral ] = useState(null);
    
    const renderForm = () => {
        switch(currentStep){
            case 1: return (
                    <GeneralVehiculo 
                        setFormData={setFormData} 
                        setCurrentFormData={setFormDataGeneral}
                        callBack={() => setCurrentStep(2)} 
                    />
                )
            case 2: return (
                    <CaracteristicasVehiculo 
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
                    <ContactoVehiculo
                        formData={formData} 
                        handleBack={() => {
                            setFormData(formDataGeneral);
                            setCurrentStep(2);
                        }}
                    />
                )
            default: return (
                    <GeneralVehiculo 
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
            case 2: return "Agrega las características especificas de tu vehiculo, no es necesario agregar todas, solo las que se ajusten a tu vehiculo."
            case 3: return ""
        }
    }

    return (
        <PageLayout footer={false}>

            <HeadCreateAnn
                type="Vehiculo"
                currentStep={currentStep}
                description={getDescription()}
            />
    
            { renderForm() }
              
        </PageLayout>
    )
}

export default CreateVehicle