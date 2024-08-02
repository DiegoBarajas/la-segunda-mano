import React, { useState } from 'react'
import CreateAnnStep1 from '../Fragments/CreateAnnStep1';
import CreateAnnStep2 from '../Fragments/CreateAnnStep2';
import CreateAnnStep3 from '../Fragments/CreateAnnStep3';
import HeadCreateAnn from '../Fragments/HeadCreateAnn';
import PageLayout from '../Layouts/PageLayout';
import { Navigate } from 'react-router-dom';

import '../Styles/Pages/CreateAnnouncement.css';
import modals from '../Modals';
import backend from '../backend';
import axios from 'axios';

const TYPE = 'gratis';

const CreateGratis = () => {
    document.title = 'La Segunda Mano - Crear anuncio (Gratis)';
    
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ formData, setFormData ] = useState(new FormData());

    const [ redirect, setRedirect ] = useState(null);

    const handleSubmit = async() => {
        const data = new FormData();
        for( let key in formData){
            const value = formData[key];
            if(key === 'fotos'){
                value.forEach((element) => data.append('imagenes', element));
                continue;
            }

            if((key === 'caracteristicas') || (key === 'formasEntrega') || (key === 'contacto')){
                data.append(key, JSON.stringify(value));
                continue;
            }

            data.append(key, value)
        }

        data.append('tipoAnuncio', TYPE);
        data.append('precio', 0);

        try{
            const modal = modals.petitionAlert("Creando anuncio", "Espere un momento...", 'info');
            const response = await axios.post(`${backend}/api/announcement`, data, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data',
                }
            });

            modal.close();
            modals.toast('Anuncio creado con exito!', 'success');
            setRedirect('/anuncio/'+response.data+'?modal=true');
        }catch(err){
            if (err.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                modals.alert("Ups", `${err.response.data}`, 'error');
                //Modals.alert("Ups", `<b>[${err.response.status}]</b> ${err.response.data}`, 'error');
            } else if (err.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error('No se recibió respuesta del servidor:', err.request);
                modals.alert("Ha ocurrido un error", `No se recibió respuesta del servidor`, 'error');
            } else {
                // Ocurrió un error antes de enviar la solicitud
                console.error('Error al enviar la solicitud:', err.message);
                modals.alert("Ha ocurrido un error", `<b>Error al enviar la solicitud</b> ${err.message}`, 'error');
            }
        }
    }

    const renderForm = () => {
        switch(currentStep){
            case 1: return (
                    <CreateAnnStep1
                        type={TYPE}
                        formData={formData}
                        setFormData={setFormData}
                        callBack={() => setCurrentStep(2)}
                    />
                )
            case 2: return (
                    <CreateAnnStep2 
                        type={TYPE}
                        formData={formData} 
                        setFormData={setFormData} 
                        callBack={() => setCurrentStep(3)} 
                        handleBack={() =>  setCurrentStep(1)} 
                    />
                )
            case 3: return (
                    <CreateAnnStep3
                        type={TYPE}
                        formData={formData} 
                        setFormData={setFormData} 
                        handleBack={() =>  setCurrentStep(2)} 
                        callBack={handleSubmit} 
                    />
                )
            default: return (
                    <CreateAnnStep1
                        type='gratis'
                        formData={formData}
                        setFormData={setFormData}
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

    return (
        <PageLayout footer={false}>

            <HeadCreateAnn
                type='Gratis'
                currentStep={currentStep}
                description={getDescription()}
            />
    
            { renderForm() }

            { redirect ? <Navigate to={redirect}/> : null }
              
        </PageLayout>
    )
}

export default CreateGratis