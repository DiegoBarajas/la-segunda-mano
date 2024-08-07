import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import backend from '../backend';
import modals from '../Modals';
import PageLayout from '../Layouts/PageLayout';
import HeadCreateAnn from '../Fragments/HeadCreateAnn';
import EditAnnStep1 from '../Fragments/EditAnnStep1';
import CreateAnnStep2 from '../Fragments/CreateAnnStep2';
import CreateAnnStep3 from '../Fragments/CreateAnnStep3';
import EditAnnStep2 from '../Fragments/EditAnnStep2';

const EditAnnouncement = () => {

    const { id } = useParams();

    const [ currentStep, setCurrentStep ] = useState(1);
    const [ announcement, setAnnouncement ] = useState(null);
    const [ formData, setFormData ] = useState(null);

    const [ redirect, setRedirect ] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const getAnnouncement = async() => {
            try{
                document.title = 'La Segunda Mano - Editar Anuncio';
                const modal = modals.petitionAlert("Cargando información...", "Espere un momento...", 'info');

                const response = await axios.get(`${backend}/api/announcement/${id}/protected`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                document.title = `La Segunda Mano - Editar "${response.data.titulo}"`;
                setAnnouncement(response.data);
                setFormData({...response.data, 'fotos': response.data.imagenes});
                
                modal.close();
            }catch(err){

                if (err.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                    modals.alert("Ups", `${err.response.data}`, 'error', 'Volver atras')
                        .then((answer) => {
                            if(answer.isConfirmed){
                                window.history.back();
                            }
                        });
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

        if(!announcement) getAnnouncement();
    }, [id]);

    const handleSubmit = async() => {
        const data = new FormData();
        for( let key in formData){
            const value = formData[key];
            if(key === 'fotos'){
                value.forEach((element) => data.append('fotos', element));
                continue;
            }

            if((key === 'caracteristicas') || (key === 'formasEntrega') || (key === 'contacto')){
                data.append(key, JSON.stringify(value));
                continue;
            }

            data.append(key, value)
        }

        try{
            const modal = modals.petitionAlert("Editando anuncio", "Espere un momento...", 'info');
            const response = await axios.patch(`${backend}/api/announcement/${id}`, data, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data',
                }
            });

            modal.close();
            modals.toast('Anuncio actualizado con exito!', 'success');
            setRedirect('/anuncio/'+response.data);
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
        const TYPE = announcement.tipoAnuncio;

        switch(currentStep){
            case 1: return (
                    <EditAnnStep1
                        id={id}
                        type={TYPE}
                        formData={formData}
                        setFormData={setFormData}
                        callBack={() => setCurrentStep(2)}
                    />
                )
            case 2: return (
                    <EditAnnStep2
                        id={id}
                        type={TYPE}
                        formData={formData}
                        setFormData={setFormData}
                        callBack={() => setCurrentStep(3)}
                        handleBack={() => setCurrentStep(1)} 
                    />
                )
            case 3: return (
                    <CreateAnnStep2
                        type={TYPE}
                        formData={formData} 
                        setFormData={setFormData} 
                        callBack={() => setCurrentStep(4)} 
                        handleBack={() => setCurrentStep(2)} 
                    />
                )
            case 4: return (
                    <CreateAnnStep3 
                        type={TYPE}
                        formData={formData} 
                        setFormData={setFormData} 
                        handleBack={() => setCurrentStep(3)} 
                        callBack={handleSubmit} 
                        update
                    />
                )
            default: return (
                    <EditAnnStep1
                        type={TYPE}
                        formData={formData}
                        setFormData={setFormData}
                        callBack={() => setCurrentStep(2)}
                    />
                )
        }
    }
    

    return announcement ? (
        <PageLayout footer={false}>

            <HeadCreateAnn
                type={announcement.tipoAnuncio}
                currentStep={currentStep}
                description=''
                edit
            />

            {
                renderForm()
            }

            { redirect ? <Navigate to={redirect}/> : null }

        </PageLayout>
    ) : (
        null
    )
}

export default EditAnnouncement