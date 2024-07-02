import React, { useState } from 'react'
import Button from '../Components/Button'
import Logo from '../Components/Logo'
import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import { useLocation } from 'react-router-dom'

import EmailSvg from '../Assets/Icons/email.svg'
import Title from '../Components/Title'
import Input from '../Components/Input'
import modals from '../Modals'
import axios from 'axios'

import constants from '../constants.json'

const useEmail = () => {
    const query = new URLSearchParams(useLocation().search)
    const searchValue = query.get('email');

    return searchValue;
}

const Forgot = () => {

    const queryEmail = useEmail();

    const [ redirect, setRedirect ] = useState(null);
    const [ disabled, setDisabled ] = useState(false);
    const [ email, setEmail ] = useState(queryEmail);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setDisabled(true);
        try{
            const response = await axios.post(`${constants.backend}/api/login/forgot`, {correo: email});
            
            //localStorage.setItem('token', response.data.token);
            setRedirect(`/forgot/code?email=${email}`);
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

    return (
        <PageLayout navbar={false} footer={false}>

            <Logo className='logo-login' onClick={() => setRedirect('/login')} />

            <ContentLayout complete size='small' horizontalAlign='center' className='login-content-layout' form redirect={redirect} onSubmit={handleSubmit}>
                <Title>Recuperar contraseña</Title>
                <h3>Paso 1: Enviar código</h3>

                <p className='p-description-code'>Ingresa tu correo electronico, se te enviará un codigo de recuperación.</p>


                <form className='form-login' onSubmit={handleSubmit}>
                    <Input
                        label="Correo Electronico"
                        width="75%"
                        type='email'
                        placeholder="Ej. juanito@correo.com"
                        title="Ingresa tu correo electronico"
                        required
                        icon={EmailSvg}
                        mb='35px'
                        
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        width="75%"
                        mb='10px'
                        disabled={disabled}
                        title="Inicia sesión"
                        type='submit'

                    >Enviar codigo</Button>
                </form>

                <Button
                    width="75%"
                    color='red'
                    onClick={() => setRedirect('/login')}
                    mb='10px'
                    title="Volver al inciio de sesión"

                >Cancelar</Button>

            </ContentLayout>
        </PageLayout>
    )
}

export default Forgot