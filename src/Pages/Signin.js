import React, { useState } from 'react'
import PageLayout from '../Layouts/PageLayout';
import ContentLayout from '../Layouts/ContentLayout';
import Title from '../Components/Title';
import Logo from '../Components/Logo';
import Modals from '../Modals';
import Input from '../Components/Input';
import Button from '../Components/Button';

import PersonSvg from '../Assets/Icons/person.svg'
import IdCardSvg from '../Assets/Icons/id_card.svg'
import EmailSvg from '../Assets/Icons/email.svg'
import PasswordSvg from '../Assets/Icons/password.svg'
import RepeatSvg from '../Assets/Icons/repeat.svg'

const Signin = () => {
    const [ redirect, setRedirect ] = useState(null);
    const [ disabled, setDisabled ] = useState(false);

    const [ formData, setFormData ] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(disabled) return;

        for (let key in formData) 
            if (formData[key] === '') return Modals.alert("Atención", "Debes llenar <b>TODOS</b> los campos", 'warning');
        if(formData.password !== formData.repeatPassword) return Modals.alert("Atención", "Las contraseñas <b>NO</b> coinciden", 'warning');


        setDisabled(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({...formData, [name]: value});
    }

    return (
        <PageLayout navbar={false} footer={false}>

            <Logo className='logo-login' onClick={() => setRedirect('/')} />

            <ContentLayout complete size='small' horizontalAlign='center' className='login-content-layout' form redirect={redirect} onSubmit={handleSubmit}>
                <Title mb={50}>Crear Cuenta</Title>

                <form className='form-login' onSubmit={handleSubmit}>

                    <Input
                        label="Nombre"
                        name='name'
                        width="75%"
                        placeholder="Ej. Juan Carlos"
                        title="Ingresa tu(s) nombre(s)"
                        required
                        mb='12px'
                        icon={PersonSvg}

                        value={formData.name}
                        onChange={handleChange}
                    />

                    <Input
                        label="Apellido"
                        name='lastname'
                        width="75%"
                        placeholder="Ej. Lopez Perez"
                        title="Ingresa tu(s) appelido(s)"
                        required
                        mb='12px'
                        icon={IdCardSvg}

                        value={formData.lastname}
                        onChange={handleChange}
                    />

                    <Input
                        label="Correo Electronico"
                        name='email'
                        width="75%"
                        type='email'
                        placeholder="Ej. juanito@correo.com"
                        title="Ingresa un correo electronico"
                        required
                        mb='12px'
                        icon={EmailSvg}

                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="Contraseña"
                        name='password'
                        width="75%"
                        type='password'
                        placeholder="Ingresa tu contraseña"
                        title="Crea una contraseña"
                        required
                        minLength="8"
                        mb='12px'
                        icon={PasswordSvg}

                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Input
                        label="Repetir contraseña"
                        name='repeatPassword'
                        width="75%"
                        type='password'
                        placeholder="Ingresa tu contraseña nuevamente"
                        title="Ingresa tu contraseña nuevamente"
                        required
                        minLength="8"
                        mb='35px'
                        icon={RepeatSvg}

                        value={formData.repeatPassword}
                        onChange={handleChange}
                    />

                    <Button
                        width="75%"
                        mb='10px'
                        disabled={disabled}
                        title="Crear nueva cuenta"
                    >Crear cuenta</Button>
                    
                </form>

                <Button
                    width="75%"
                    color='red'
                    onClick={() => setRedirect('/login')}
                    mb='10px'
                    title="¿Ya tienes una cuenta? Inicia sesión"
                >Iniciar sesión</Button>

            </ContentLayout>
        </PageLayout>
    )
}

export default Signin