import React, { useEffect, useState } from 'react'
import '../Styles/Pages/Login.css'

import Title from '../Components/Title'
import ContentLayout from '../Layouts/ContentLayout'
import PageLayout from '../Layouts/PageLayout'
import Logo from '../Components/Logo'
import CodeInput from '../Components/CodeInput'
import Button from '../Components/Button'
import Modals from '../Modals';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

import backend from '../backend';

const useEmail = () => {
    const query = new URLSearchParams(useLocation().search)
    const searchValue = query.get('email');

    return searchValue;
}

const SigninCode = () => {
    document.title = 'La Segunda Mano - Crear cuenta';
    const email = useEmail();
    
    const [ code, setCode ] = useState('');
    const [ redirect, setRedirect ] = useState(null);
    const [ disabled, setDisabled ] = useState(true);
    
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

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
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(code.length < 6) return Modals.alert("Atención", "El código esta incompleto, deben ser 6 dígitos", "warning");
        setDisabled(true);

        try{
            const modal = Modals.petitionAlert("Creando cuenta", "Espere un momento...", 'info');
            const response = await axios.patch(`${backend}/api/login/signin`, {
                correo: email,
                codigo: code
            });

            modal.close();

            Modals.toast('Cuenta creada con exito!');
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));    
            setRedirect('/signin/last');
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

        startCountdown();
        try{
            const response = await axios.post(`${backend}/api/login/signin/resend`, {
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
    }

    return (
        <PageLayout navbar={false} footer={false}>

            <Logo className='logo-login'/>

            <ContentLayout complete size='small' horizontalAlign='center' className='login-content-layout' redirect={redirect}>
                <Title>Crear Cuenta</Title>
                <h3>Confirmar correo electrónico</h3>

                <p className='p-description-code'>Se te envió un código al correo (<b>{email}</b>), ingresa el código para confirmar tu correo.</p>

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

                    <p className='p-description-code' style={{ marginTop: -10 }}>Si el correo no llega, intenta revisar en la sección de <b>Spam</b> o <b>Correo no deseado</b>.</p>

                    <Button
                        width="75%"
                        mb='10px'
                        disabled={disabled}
                        title="Confirmar código"
                        type='submit'
                    >Confirmar codigo</Button>
                </form>

                <Button
                    width="75%"
                    color='red'
                    onClick={() => setRedirect('/signin')}
                    mb='10px'
                    title="Volver al inicio de sesión"
                >Cancelar</Button>

            </ContentLayout>
        </PageLayout>
    )
}

export default SigninCode