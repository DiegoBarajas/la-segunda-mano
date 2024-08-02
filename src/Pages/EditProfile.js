import React, { useEffect, useRef, useState } from 'react'
import ContentLayout from '../Layouts/ContentLayout'
import InputImage from '../Components/InputImage'
import PageLayout from '../Layouts/PageLayout'
import Title from '../Components/Title'
import Select from '../Components/Select'
import Button from '../Components/Button'

import deleteWhiteSvg from '../Assets/Icons/deleteWhite.svg'
import cancelSvg from '../Assets/Icons/cancel.svg'
import imageSvg from '../Assets/Icons/image.svg'
import stateSvg from '../Assets/Icons/state.svg'

import CutImage from '../Components/CutImage'

import '../Styles/Pages/Profile.css';
import constants from '../constants.json'
import backend from '../backend';
import modals from '../Modals'
import axios from 'axios'
import Input from '../Components/Input'

const EditProfile = () => {
    document.title = 'La Segunda Mano - Editar mi perfil';
    const user = JSON.parse(localStorage.getItem('user'));
    const formRef = useRef(null);

    const [ redirect, setRedirect ] = useState(null);

    const [ image, setImage ] = useState(null);
    const [ croppedImage, setCroppedImage ] = useState(user.foto);
    
    const [ newImage, setNewImage ] = useState(null);
    const [ nombre, setNombre ] = useState(user.nombre);
    const [ apellido, setApellido ] = useState(user.apellido);
    const [ password, setPassword ] = useState('');
    const [ confPassword, setConfPassword ] = useState('');

    const handleSelectImage = (e) => {
        const { files } = e.target;
        
        setImage(files[0]);
    }

    const handleCutPhoto = (photo) => {
        setNewImage(photo);
        setCroppedImage(URL.createObjectURL(photo));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if((password !== '') && (password !== confPassword)) return modals.alert("Atención", "Las contraseñas <b>NO</b> coinciden", 'warning');

        const formData = new FormData(formRef.current);
        formData.append("foto", newImage);
        formData.append("eliminarFoto", croppedImage ? false : true);

        if(password !== '') formData.append("password", password);

        try{
            const modal = modals.petitionAlert("Actualizando información", "Espere un momento...", 'info');
            const response = await axios.patch(`${backend}/api/user`, formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            modal.close();
            
            modals.toast('Perfil actualizado!', 'success');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));    

            setRedirect('/perfil');
        }catch(err){
            if (err.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                modals.alert("Ups", `${err.response.data}`, 'error');
                //modals.alert("Ups", `<b>[${err.response.status}]</b> ${err.response.data}`, 'error');
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

    const cleanImage = () => {
        const fotoInput = document.querySelector('#foto-input');
        fotoInput.value = '';

        setImage(null)
    }

    return (
        <PageLayout>
            <ContentLayout horizontalAlign='center' size='small' complete redirect={redirect}>
                <Title>Editar mi perfil</Title>

                <form className='form-login mt-25' onSubmit={handleSubmit} ref={formRef}>

                    <InputImage
                        id='foto-input'
                        accept=".png,.jpg,.jpeg,.tiff,.tif,.webp"

                        title="Seleccione una foto de perfil"
                        label="Foto de perfil"
                        width='75%'
                        mb='12px'
                        icon={imageSvg}
                        selectedFile={croppedImage}
                        onQuitFile={() => setCroppedImage(null)}

                        onChange={handleSelectImage}
                    >{ croppedImage 
                            ? ( newImage ? newImage.name : "Imagen actual" )
                            : "Seleccionar una imagen" 
                    }</InputImage>
                    {
                        newImage
                            ? <Button 
                                width='75%' 
                                horizontal 
                                color='red' 
                                icon={cancelSvg} 
                                onClick={() => {
                                    setNewImage(null);
                                    setCroppedImage(user.foto)
                                }}
                            >Quitar foto seleccionada</Button>
                            : null
                    }
                    {
                        (user.foto && croppedImage)
                            ? <Button
                                width='75%' 
                                horizontal 
                                color='red' 
                                icon={deleteWhiteSvg} 
                                onClick={() => {
                                    setNewImage(null);
                                    setCroppedImage(null)
                                }}
                            >Eliminar foto</Button>
                            : null
                    }

                    <Input
                        className='mt-15'
                        id='input-nombre'
                        name='nombre'
                        width='75%'
                        mb='15px'
                        label='Nombre'
                        placeholder='Ej. Juan'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                        required
                    />

                    <Input
                        id='input-apellido'
                        name='apellido'
                        width='75%'
                        mb='15px'
                        label='Apellido'
                        placeholder='Ej. Lopez'
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}

                        required
                    />

                    <Select
                        id='estado-select'
                        name='estado'
                        
                        selectedOption={user.estado}
                        options={constants.estados}
                        icon={stateSvg}
                        title="Selecciona un estado"
                        label="Estado"
                        width='75%'
                        mb='15px'
                    />

                    <Input
                        id='input-contraseña'
                        width='75%'
                        mb='15px'
                        label='Cambiar contraseña'
                        placeholder='Ingrese la nueva contraseña'
                        minLength="8"
                        type='password'

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Input
                        id='input-contraseña-2'
                        width='75%'
                        mb='45px'
                        label='Confirmar nueva contraseña'
                        placeholder='Ingrese la nueva contraseña nuevamente'
                        minLength="8"
                        type='password'
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                    />

                    <Button
                        title="Guardar cambios"
                        width="75%"
                        mb='10px'
                        type='submit'
                    >Actualizar</Button>

                    <Button
                        title="Guardar cambios"
                        width="75%"
                        mb='10px'
                        color='red'
                        onClick={() => setRedirect('/perfil')}
                    >Cancelar</Button>
                </form>
            </ContentLayout>

            <CutImage
                image={image}
                setCroppedImage={handleCutPhoto}
                onCancel={cleanImage}
            />
        </PageLayout>
    )
}

export default EditProfile