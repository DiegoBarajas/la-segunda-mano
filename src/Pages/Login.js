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

import EmailSvg from '../Assets/Icons/email.svg'
import PasswordSvg from '../Assets/Icons/password.svg'

const Login = () => {
    const [ redirect, setRedirect ] = useState(null);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ disabled, setDisabled ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(disabled) return;

        if(email === '' || password === ''){
            return Modals.alert("Atención", "Debes llenar <b>CORREO</b> y <b>CONTRASEÑA</b>", 'warning');
        }

        setDisabled(true);
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
                        mb='5px'

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link 
                        className='link-forgot-password' 
                        title='¿No recuerdas tú contraseña? Recuperala ahora'
                        to='/' 
                    >¿Olvidaste tu contraseña?</Link>

                    <Button
                        width="75%"
                        mb='10px'
                        disabled={disabled}
                        title="Inicia sesión"
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