import React, { useEffect, useState } from 'react'
import PageLayout from '../Layouts/PageLayout'
import Logo from '../Components/Logo'
import ContentLayout from '../Layouts/ContentLayout'
import Title from '../Components/Title'
import Button from '../Components/Button'
import Select from '../Components/Select'
import InputFile from '../Components/InputFile'

import imageSvg from '../Assets/Icons/image.svg'
import stateSvg from '../Assets/Icons/state.svg'

import '../Styles/Pages/Login.css'
import CutImage from '../Components/CutImage'
import axios from 'axios'
import modals from '../Modals'

import constants from '../constants.json'
import backend from '../backend';

const SigninLastSteps = () => {
    const token = localStorage.getItem('token');

    const [ disabled, setDisabled ] = useState(true);
    const [ redirect, setRedirect ] = useState(null);

    const [ image, setImage ] = useState(null);
    const [ croppedImage, setCroppedImage ] = useState(null);

    useEffect(() => {

        if(croppedImage) setDisabled(false);

    }, [croppedImage]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(disabled) return;

        const estadoSelect = document.querySelector('#estado-select');

        const formData = new FormData();
        formData.append('foto', croppedImage);
        formData.append('estado', estadoSelect.value);

        try {
            setDisabled(true);
            const modal = modals.petitionAlert("Actualizando información", "Espere un momento...", 'info');
            const response = await axios.patch(`${backend}/api/login/signin/last`, formData, {
                headers: {
                  Authorization: token
                }
            });
            modal.close();

            modals.toast('Información actualizada con exito!');
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));  

            setRedirect('/');
                        
        }catch(err){
            setDisabled(false);

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

    const handleSelectImage = (e) => {
        const { files } = e.target;
        
        setImage(files[0]);
    }

    const cleanImage = () => {
        const fotoInput = document.querySelector('#foto-input');
        fotoInput.value = '';

        setImage(null)
    }

    return (
        <PageLayout navbar={false} footer={false}>

            <Logo className='logo-login'/>

            <ContentLayout complete size='small' horizontalAlign='center' className='login-content-layout' redirect={redirect}>
                <Title>Crear Cuenta</Title>
                <h3>Confirmar correo electronico</h3>

                <p className='p-description-code'>Estamos por finalizar, agrega una foto de perfil y/o el estado donde resides. Este paso es opcional.</p>

                <form className='form-login' onSubmit={handleSubmit}>

                    <InputFile
                        id='foto-input'
                        name='foto'
                        accept=".png,.jpg,.jpeg,.tiff,.tif,.webp"

                        title="Seleccione una foto de perfil"
                        label="Foto de perfil"
                        width='75%'
                        mb='12px'
                        icon={imageSvg}
                        selectedFile={croppedImage}
                        onQuitFile={() => setCroppedImage(null)}

                        onChange={handleSelectImage}
                    >{ croppedImage ? `${croppedImage.name}` : "Seleccionar una imagen" }</InputFile>

                    <Select
                        id='estado-select'
                        name='estado'
                        
                        options={constants.estados}
                        icon={stateSvg}
                        title="Selecciona un estado"
                        label="Estado"
                        width='75%'
                        mb='35px'

                        onChange={() => setDisabled(false)}
                    />

                    <Button
                        title="Guardar cambios"
                        disabled={disabled}
                        width="75%"
                        mb='10px'
                        type='submit'
                    >Guardar</Button>
                </form>

                <Button
                    title="No agregar foto ni estado predeterminado"
                    width="75%"
                    color='red'
                    mb='10px'

                    onClick={() => setRedirect('/signin')}
                >Omitir</Button>

            </ContentLayout>

            <CutImage 
                image={image}
                setCroppedImage={setCroppedImage}
                onCancel={cleanImage}
            />
        </PageLayout>
    )
}

export default SigninLastSteps