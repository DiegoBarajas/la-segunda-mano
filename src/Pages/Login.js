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

const Login = () => {
    const [ redirect, setRedirect ] = useState(null);

    const handelSubmit = (e) => {
        e.preventDefault();
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
                    placeholder="Correo Electronico"
                    icon={EmailSvg}
                    mb='12px'
                />

                <Input
                    label="Contraseña"
                    width="75%"
                    type='password'
                    placeholder="Contraseña"
                    icon={PasswordSvg}
                    mb='5px'
                />
                <Link className='link-forgot-password' to='/'>Olvide mi contraseña</Link>

                <Button
                    width="75%"
                    onClick={() => {}}
                >Iniciar sesión</Button>
                <Button
                    width="75%"
                    color='red'
                    onClick={() => setRedirect('/signin')}
                >Crear cuenta</Button>

            </ContententLayout>

            { redirect ? <Navigate to={redirect}/> : <></> }
        </PageLayout>
    )
}

export default Login