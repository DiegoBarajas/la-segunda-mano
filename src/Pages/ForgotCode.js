import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Title from '../Components/Title'
import ContentLayout from '../Layouts/ContentLayout'
import PageLayout from '../Layouts/PageLayout'
import Logo from '../Components/Logo'
import CodeInput from '../Components/CodeInput'
import Button from '../Components/Button'
import Modals from '../Modals';
import { Link, useLocation } from 'react-router-dom'
import Input from '../Components/Input'

import PasswordSvg from '../Assets/Icons/password.svg'
import RepeatSvg from '../Assets/Icons/repeat.svg'

import constants from '../constants.json'
import '../Styles/Pages/Login.css'

const useEmail = () => {
    const query = new URLSearchParams(useLocation().search)
    const searchValue = query.get('email');

    return searchValue;
}

const ForgotCode = () => {

    const email = useEmail();

    const [ redirect, setRedirect ] = useState(null);
    const [ disabled, setDisabled ] = useState(true);

    const [ code, setCode ] = useState('');
    const [ contraseña, setContraseña ] = useState('');
    const [ repetirContraseña, setRepetirContraseña ] = useState('');

    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const changeDisabled = () => {
            if(code.length === 6) setDisabled(false)
            else setDisabled(true)
        }    

        changeDisabled();
    }, [code]);

    useEffect(() => {
        let timer;
        if(seconds <= 0) return;
        if(isActive) return;

        timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds <= 1) {
                    clearInterval(timer);
                    setIsActive(true);
                    return 60;
                }
                if(prevSeconds-1 <= 0) console.log('Hola')
                return prevSeconds - 1;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, [isActive]);

    const startCountdown = () => {
        setIsActive(false);
        setSeconds(60);
    };

    useEffect(() => {
        const changeDisabled = () => {
            if(code.length === 6) setDisabled(false)
            else setDisabled(true)
        }    

        changeDisabled();
    }, [code]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(code.length < 6) return Modals.alert("Atención", "El código esta incompleto, deben ser 6 dígitos", "warning");
        if(contraseña.length === 0 || repetirContraseña.length === 0) return Modals.alert("Atención", "Debes ingresar las contraseñas", "warning");
        if(contraseña !== repetirContraseña ) return Modals.alert("Atención", "Las contraseñas no coinciden", "warning");

        setDisabled(true);

        try{
            const response = await axios.patch(`${constants.backend}/api/login/forgot`, {
                correo: email,
                codigo: code,
                contraseña: contraseña
            });

            Modals.toast('Contraseña actualizada con exito!');
            
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

    const handleResendCode = async(e) => {
        e.preventDefault()
        if(!isActive) return;

        try{
            const response = await axios.post(`${constants.backend}/api/login/forgot/resend`, {
                correo: email
            });

            Modals.toast('Correo electronico reenviado!');
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
        
        startCountdown();
    }

    return (
        <PageLayout navbar={false} footer={false}>

            <Logo className='logo-login' onClick={() => setRedirect('/login')} />

            <ContentLayout complete size='small' horizontalAlign='center' className='login-content-layout' form redirect={redirect} onSubmit={handleSubmit}>
                <Title>Recuperar contraseña</Title>
                <h3>Paso 2: Recuperar cuenta</h3>

                <p className='p-description-code'>Se te envió un código al correo (<b>{email}</b>), ingresa el codigo para confirmar tu correo.</p>

                <form className='form-login' onSubmit={handleSubmit}>

                    <CodeInput
                        code={code}
                        setCode={setCode}
                        length={6}
                    />

                    <Link
                        className={`link-forgot-password link-signin-code ${isActive ? '' : 'link-disabled'}`}
                        title='¿No te llego el correo? Reenvialo'
                        onClick={handleResendCode}
                        onLoad={startCountdown}
                    >{
                        isActive ? "Reenviar código": `Reenviar código (0:${seconds<10 ? '0'+seconds : seconds})`
                    }</Link>

                    <Input
                        label="Contraseña"
                        name='contraseña'
                        width="75%"
                        type='password'
                        placeholder="Ingresa tu contraseña"
                        title="Crea una contraseña"
                        required
                        minLength="8"
                        mb='12px'
                        icon={PasswordSvg}

                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                    />

                    <Input
                        label="Repetir contraseña"
                        name='repetirContraseña'
                        width="75%"
                        type='password'
                        placeholder="Ingresa tu contraseña nuevamente"
                        title="Ingresa tu contraseña nuevamente"
                        required
                        minLength="8"
                        mb='35px'
                        icon={RepeatSvg}

                        value={repetirContraseña}
                        onChange={(e) => setRepetirContraseña(e.target.value)}
                    />

                    <Button
                        width="75%"
                        mb='10px'
                        disabled={disabled}
                        title="Confirmar codigo"
                        type='submit'
                    >Confirmar codigo</Button>
                </form>

                <Button
                    width="75%"
                    color='red'
                    onClick={() => setRedirect('/login')}
                    mb='10px'
                    title="Volver al inicio de sesión"
                >Cancelar</Button>

            </ContentLayout>
        </PageLayout>
    )
}

export default ForgotCode