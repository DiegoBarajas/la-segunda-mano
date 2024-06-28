import React, { useState } from 'react'
import '../Styles/Pages/Login.css'

import PageLayout from '../Layouts/PageLayout'
import ContententLayout from '../Layouts/ContentLayout.js'
import Button from '../Components/Button'
import Input from '../Components/Input'
import Title from '../Components/Title'
import Logo from '../Components/Logo'

import EmailSvg from '../Assets/Icons/email.svg'
import PasswordSvg from '../Assets/Icons/password.svg'
import { Link, Navigate } from 'react-router-dom'
import Modals from '../Modals.js'

const Login = () => {
    const [ redirect, setRedirect ] = useState(null);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ disabled, setDisabled ] = useState(false);

    const handelSubmit = (e) => {
        e.preventDefault();
        if(disabled) return;

        if(email === '' || password === ''){
            return Modals.alert("Atención", "Debes escribir correo y contraseña", 'warning');
        }

        setDisabled(true);
    }

    return (
        <PageLayout navbar={false} footer={false}>

            <Logo className='logo-login' onClick={() => setRedirect('/')} />

            <ContententLayout complete size='small' horizontalAlign='center' className='login-content-layout' form onSubmit={handelSubmit}>
                <Title mb={50}>Iniciar Sesión</Title>

                <Input
                    label="Correo Electronico"
                    width="75%"
                    type='email'
                    placeholder="Ej. juanito@correo.com"
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
                    required
                    minLength="8"
                    icon={PasswordSvg}
                    mb='5px'

                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link className='link-forgot-password' to='/'>¿Olvidaste tu contraseña?</Link>

                <Button
                    width="75%"
                    mb='10px'
                    disabled={disabled}
                >Iniciar sesión</Button>
                <Button
                    width="75%"
                    color='red'
                    onClick={() => setRedirect('/signin')}
                    mb='10px'
                >Crear cuenta</Button>

            </ContententLayout>

            { redirect ? <Navigate to={redirect}/> : <></> }
        </PageLayout>
    )
}

export default Login