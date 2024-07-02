import React, { useState } from 'react'
import '../Styles/Pages/Login.css'

import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout.js'
import Button from '../Components/Button'
import Input from '../Components/Input'
import Title from '../Components/Title'
import Logo from '../Components/Logo'
import { Link } from 'react-router-dom'
import Modals from '../Modals.js'
import axios from 'axios'

import EmailSvg from '../Assets/Icons/email.svg'
import PasswordSvg from '../Assets/Icons/password.svg'

import backend from '../backend';

const Login = () => {
    const [ redirect, setRedirect ] = useState(null);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ disabled, setDisabled ] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(disabled) return;

        if(email === '' || password === ''){
            return Modals.alert("Atención", "Debes llenar <b>CORREO</b> y <b>CONTRASEÑA</b>", 'warning');
        }

        setDisabled(true);

        try{
            const response = await axios.post(`${backend}/api/login`, { correo: email, contraseña: password });
            
            Modals.toast('Iniciaste sesión!', 'success');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));    

            setRedirect('/');
        }catch(err){
            setDisabled(false);

            if (err.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                Modals.alert("Ups", `${err.response.data}`, 'error');
                //Modals.alert("Ups", `<b>[${err.response.status}]</b> ${err.response.data}`, 'error');
            } else if (err.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error('No se recibió respuesta del servidor:', err.request);
                Modals.alert("Ha ocurrido un error", `No se recibió respuesta del servidor`, 'error');
            } else {
                // Ocurrió un error antes de enviar la solicitud
                console.error('Error al enviar la solicitud:', err.message);
                Modals.alert("Ha ocurrido un error", `<b>Error al enviar la solicitud</b> ${err.message}`, 'error');
            }
        }
    }

    return (
        <PageLayout navbar={false} footer={false}>

            <Logo className='logo-login' onClick={() => setRedirect('/')} />

            <ContentLayout complete size='small' horizontalAlign='center' className='login-content-layout' form redirect={redirect} onSubmit={handleSubmit}>
                <Title mb={50}>Iniciar Sesión</Title>

                <form className='form-login' onSubmit={handleSubmit}>
                    <Input
                        label="Correo Electronico"
                        width="75%"
                        type='email'
                        placeholder="Ej. juanito@correo.com"
                        title="Ingresa tu correo electronico"
                        required
                        icon={EmailSvg}
                        mb='12px'

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Contraseña"
                        width="75%"
                        type='password'
                        placeholder="Ingresa tu contraseña"
                        title="Ingresa tu contraseña"
                        required
                        minLength="8"
                        icon={PasswordSvg}
                        mb='10px'

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link 
                        className='link-forgot-password' 
                        title='¿No recuerdas tú contraseña? Recuperala ahora'
                        to={email === '' ? '/forgot' : `/forgot?email=${email}`} 
                    >¿Olvidaste tu contraseña?</Link>

                    <Button
                        width="75%"
                        mb='10px'
                        disabled={disabled}
                        title="Inicia sesión"
                        type='submit'

                    >Iniciar sesión</Button>
                </form>

                <Button
                    width="75%"
                    color='red'
                    onClick={() => setRedirect('/signin')}
                    mb='10px'
                    title="¿No tienes una cuenta? Crea una"

                >Crear cuenta</Button>

            </ContentLayout>
        </PageLayout>
    )
}

export default Login