import React, { useState } from 'react'
import '../Styles/Pages/Login.css'

import PageLayout from '../Layouts/PageLayout';
import ContentLayout from '../Layouts/ContentLayout';
import Title from '../Components/Title';
import Logo from '../Components/Logo';
import Modals from '../Modals';
import Input from '../Components/Input';
import Button from '../Components/Button';
import axios from 'axios';

import PersonSvg from '../Assets/Icons/person.svg'
import IdCardSvg from '../Assets/Icons/id_card.svg'
import EmailSvg from '../Assets/Icons/email.svg'
import PasswordSvg from '../Assets/Icons/password.svg'
import RepeatSvg from '../Assets/Icons/repeat.svg'

import backend from '../backend';

const Signin = () => {
    document.title = 'La Segunda Mano - Crear cuenta';

    const [ redirect, setRedirect ] = useState(null);
    const [ disabled, setDisabled ] = useState(false);

    const [ formData, setFormData ] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contraseña: '',
        repetirContraseña: ''
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(disabled) return;

        for (let key in formData) 
            if (formData[key] === '') return Modals.alert("Atención", "Debes llenar <b>TODOS</b> los campos", 'warning');
        if(formData.contraseña !== formData.repetirContraseña) return Modals.alert("Atención", "Las contraseñas <b>NO</b> coinciden", 'warning');
        
        setDisabled(true);
        try{
            const modal = Modals.petitionAlert("Enviando código", "Espere un momento...", 'info');
            const response = await axios.post(`${backend}/api/login/signin`, formData);
            
            modal.close();
            //localStorage.setItem('token', response.data.token);
            setRedirect(`/signin/code?email=${formData.correo}`);
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({...formData, [name]: value});
    }

    return (
        <PageLayout navbar={false} footer={false}>

            <Logo className='logo-login' onClick={() => setRedirect('/login')} />

            <ContentLayout complete size='small' horizontalAlign='center' className='login-content-layout' form redirect={redirect} onSubmit={handleSubmit}>
                <Title mb={50}>Crear Cuenta</Title>

                <form className='form-login' onSubmit={handleSubmit}>

                    <Input
                        label="Nombre"
                        name='nombre'
                        width="75%"
                        placeholder="Ej. Juan Carlos"
                        title="Ingresa tu(s) nombre(s)"
                        required
                        mb='12px'
                        icon={PersonSvg}

                        value={formData.nombre}
                        onChange={handleChange}
                    />

                    <Input
                        label="Apellido"
                        name='apellido'
                        width="75%"
                        placeholder="Ej. Lopez Perez"
                        title="Ingresa tu(s) appelido(s)"
                        required
                        mb='12px'
                        icon={IdCardSvg}

                        value={formData.apellido}
                        onChange={handleChange}
                    />

                    <Input
                        label="Correo Electronico"
                        name='correo'
                        width="75%"
                        type='email'
                        placeholder="Ej. juanito@correo.com"
                        title="Ingresa un correo electronico"
                        required
                        mb='12px'
                        icon={EmailSvg}

                        value={formData.correo}
                        onChange={handleChange}
                    />

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

                        value={formData.contraseña}
                        onChange={handleChange}
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

                        value={formData.repetirContraseña}
                        onChange={handleChange}
                    />

                    <Button
                        width="75%"
                        mb='10px'
                        disabled={disabled}
                        title="Crear nueva cuenta"
                        type='submit'
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