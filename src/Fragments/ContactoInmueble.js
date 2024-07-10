import React, { useEffect, useRef, useState } from 'react'
import ContentLayout from '../Layouts/ContentLayout';
import Checkbox from '../Components/Checkbox';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

import emailSvg from '../Assets/Icons/email.svg'
import phoneSvg from '../Assets/Icons/phone.svg'
import whatsappSvg from '../Assets/Icons/whatsapp.svg'
import addSvg from '../Assets/Icons/add.svg'

import backend from '../backend';
import modals from '../Modals';
import '../Styles/Pages/CreateAnnouncement.css';

const ContactoInmueble = ({handleBack, formData}) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    const formRef = useRef(null);
    const user = JSON.parse( localStorage.getItem('user') );

    const [ redirect, setRedirect ] = useState(null)
    const [ disabled, setDisabled ] = useState(true);

    const [ contact, setContact ] = useState([
        {
            tipo: 'email',
            contenido: user.correo
        }
    ]);

    const handleChange = (e, index) => {
        const { value } = e.target;

        const contactCopy = [...contact];
        contactCopy[index].contenido = value;

        setContact(contactCopy);
    }

    const handleQuit = (index) => {
        const contactCopy = [...contact];
        contactCopy.splice(index, 1);

        setContact(contactCopy);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(disabled) return;

        const newFormData = new FormData(formRef.current);

        formData.forEach((value, key) => {
            newFormData.append(key, value);
        });

        newFormData.append('contacto', JSON.stringify(contact));

        try{
            const modal = modals.petitionAlert("Creando anuncio", "Espere un momento...", 'info');
            const response = await axios.post(`${backend}/api/announcement`, newFormData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            modal.close();
            modals.toast('Anuncio creado con exito!', 'success');
            setRedirect('/'+response.data);
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

    const renderInput = (element, index) => {
        if(contact.length > 1){
            switch(element.tipo){
                case "email": return (
                    <section className='button-quit-contact'>
                        <Input
                            key={'contact-'+index}
                            id={`contacto-${index}`}
                            label="Correo electronico"
                            placeholder="Ej. juanlopez@correo.com"
                            type='email'
                            icon={emailSvg}
                            value={element.contenido}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                        <Button color='red' onClick={() => handleQuit(index)}>Quitar</Button>
                    </section>
                )
                case "phone": return (
                    <section className='button-quit-contact'>
                        <Input
                            key={'contact-'+index}
                            id={`contacto-${index}`}
                            label="Telefono"
                            placeholder="Ej. 3330258878"
                            type='tel'
                            icon={phoneSvg}
                            value={element.contenido}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                        <Button color='red' onClick={() => handleQuit(index)}>Quitar</Button>
                    </section>
                )
                case "whatsapp": return (
                    <section className='button-quit-contact'>
                        <Input
                            key={'contact-'+index}
                            id={`contacto-${index}`}
                            label="WhatsApp"
                            placeholder="Ej. +52 3325875689"
                            type='tel'
                            icon={whatsappSvg}
                            pattern="^\+\d{1,3}\s\d{6,14}$"                            
                            value={element.contenido}
                            onChange={(e) => handleChange(e, index)}
                            auxText="Requiere el formato +52 1234567890"
                            required
                        />
                        <Button color='red' onClick={() => handleQuit(index)}>Quitar</Button>

                    </section>
                )
            }

        }

        switch(element.tipo){
            case "email": return <Input
                key={'contact-'+index}
                id={`contacto-${index}`}
                label="Correo electronico"
                placeholder="Ej. juanlopez@correo.com"
                type='email'
                icon={emailSvg}
                value={element.contenido}
                onChange={(e) => handleChange(e, index)}
                required

                mb='12px'
            />
            case "phone": return <Input
                key={'contact-'+index}
                id={`contacto-${index}`}
                label="Telefono"
                placeholder="Ej. 3330258878"
                type='tel'
                icon={phoneSvg}
                value={element.contenido}
                onChange={(e) => handleChange(e, index)}
                required

                mb='12px'
            />
            case "whatsapp": return <Input
                key={'contact-'+index}
                id={`contacto-${index}`}
                label="WhatsApp"
                placeholder="Ej. +52 3325875689"
                pattern="^\+\d{1,3}\s\d{6,14}$"                            
                auxText="Requiere el formato +52 1234567890"
                type='tel'
                icon={whatsappSvg}
                value={element.contenido}
                onChange={(e) => handleChange(e, index)}
                required

                mb='12px'
            />
        }
    }

    const addContact = () => {
        Swal.fire({
            title: "¿Qué medio de contacto deseas agregar?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Correo",
            confirmButtonColor: '#1ABC9C',

            denyButtonText: "Telefono",
            denyButtonColor: "#FF5E58",

            cancelButtonText: "WhatsApp",
            cancelButtonColor: "#08BE3E"
        }).then((result) => {
            if (result.isConfirmed) {
                setContact([...contact, { tipo: 'email', contenido: '' }])
            } else if (result.isDenied) {
                setContact([...contact, { tipo: 'phone', contenido: '' }])
            } else{
                setContact([...contact, { tipo: 'whatsapp', contenido: '' }])
            }
        });          
    }

    return (
        <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '35px' }} onSubmit={handleSubmit} ref={formRef}>
            <ContentLayout horizontalAlign='center' redirect={redirect}>
                <div className='form-create-ann'>
                    <h2>Medios de contacto</h2>
                    <p className='p-nota-create-ann'><b>NOTA:</b> Es necesario al menos un medio de contacto.</p>
                    <p className='p-nota-create-ann'>Agrega los medios de como los compradores se pueden comunicar contigo.</p>
                    <br/>
                    <p className='p-nota-create-ann'><b>ADVERTENCIA: Recuerda que la información proporcionada es publica, por lo que es importante tener cuidado de que información agregas en este apartado</b></p>

                    {
                        contact.map((cont, index) => renderInput(cont, index))
                    }

                    <section className='section-button-add-contact'>
                        <Button
                            icon={addSvg}
                            horizontal
                            onClick={addContact}
                        >Agregar medio de contacto</Button>
                    </section>

                </div>
            </ContentLayout>

            <ContentLayout horizontalAlign='center'>
                <div className='form-create-ann'>
                    <h2>Condiciones de uso</h2>
                    <p className='p-nota-create-ann'>Para publicar es necesario que aceptes las condiciones de uso de nuestra plataforma.</p>    
                </div>

                <Checkbox
                    id='accept-terms'
                    label={ <p>Acepto las <Link to='/condiciones'>Condiciones de uso</Link> y deseo continuar.</p> }
                    width='auto'
                    onChange={(e) => { setDisabled(!e.target.checked) }}
                />
            </ContentLayout>
                
            <section style={{ width: '50%' }} className='buttons-create-ann'>
                <Button
                    color='red'
                    onClick={handleBack}
                    >Volver atras</Button>

                <Button
                    disabled={disabled}
                    type='submit'
                    title={ disabled ? "Para continuar acepta las Condiciones de uso" : "Crear publicación" }
                >Crear publicación</Button>
            </section>

        </form>

    )
}

export default ContactoInmueble