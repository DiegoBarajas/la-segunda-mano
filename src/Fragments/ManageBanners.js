import React, { useEffect, useRef, useState } from 'react'
import AccordionContentLayout from '../Layouts/AccordionContentLayout'
import ContentLayout from '../Layouts/ContentLayout'
import Button from '../Components/Button'
import { PhotoProvider, PhotoView } from 'react-image-previewer'

import addSvg from '../Assets/Icons/add.svg'
import closeSvg from '../Assets/Icons/cancelBlack.svg'
import addPhotoSvg from '../Assets/Icons/addPhoto.svg'
import sendSvg from '../Assets/Icons/send.svg'
import Input from '../Components/Input'
import modals from '../Modals'
import axios from 'axios'
import backend from '../backend'
import Loader from '../Components/Loader'

const ManageBanners = () => {

    const formRef = useRef(null);

    const [ isOpen, setIsOpen ] = useState(false);
    const [ photo, setPhoto ] = useState(null);
    const [ file, setFile ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ dims, setDims ] = useState(null);

    const [ banners, setBanners ] = useState(null);

    useEffect(() => {
        async function getBanners() {
            try{
                const response = await axios.get(`${backend}/api/banner`);
                
                setBanners(response.data);
            }catch(err){
    
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

        getBanners();
    }, []);

    useEffect(() => {
        if(!file) {
            setPhoto(null);
            setDims(null);
        }
    }, [file]);


    const handleChangeFile = (e) => {
        const file = e.target.files[0]; 
        
        if (file) {
            const reader = new FileReader();
            setPhoto(URL.createObjectURL(file))
        
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result; 
        
                img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
        
                canvas.width = img.width;
                canvas.height = img.height;
                setDims({
                    width: img.width,
                    height: img.height,
                })
        
                ctx.drawImage(img, 0, 0);
        
                const dataURL = canvas.toDataURL('image/png');
                setFile(dataURL);
        
                };
            };
        
            // Leer el archivo como DataURL (base64)
            reader.readAsDataURL(file);
        } else {
            modals.toast('Por favor selecciona un archivo válido.', 'error');
            setPhoto(null);
            setDims(null);
        }
      };
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!file) return modals.alert("Debes subir una imagen", "Para continuar sube una imagen", "warning");

        const formData = new FormData(formRef.current);
        formData.append('banner', file);
        try{
            setLoading(true);
            const response = await axios.post(`${backend}/api/banner`, formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            window.location.reload();
        }catch(err){
            setLoading(false);
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

    const handleDelete = async(banner) => {
        modals.confirm("¿Seguro que desea eliminar el banner?", "El banner se eliminará permanente mente, ¿Desea proceder?", 'question', onConfirm, () => {})

        async function onConfirm() {
            try{
                modals.petitionAlert("Eliminando", "Espere un momento...", 'infor');
                const response = await axios.delete(`${backend}/api/banner/${banner._id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
    
                window.location.reload();
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
    }

    return (
        <AccordionContentLayout complete titulo="Administrar Banners">
            <Button horizontal icon={addSvg} onClick={() => setIsOpen(true)}>Agregar banner</Button>
            <p style={{ marginTop: '10px', fontSize: '12px' }}>Haz doble click en algun banner para eliminarlo.</p>
            {
                banners ? (
                    banners.map((b, index) => 
                        <section className='banner-info-container' key={`banner-${index}`} onDoubleClick={() => handleDelete(b)} title='Haz doble click para elmininar el banner'>
                            <img src={b.data} className='banner-info-img' alt='Imagen'/>
                            <div className='banner-info-data'>
                                <p><b>Aux: </b>{b.title}</p>
                                <p><b>URL: </b>{b.url ? b.url : 'N/A'}</p>
                            </div>
                        </section>
                    )
                ) : null
                
            }
            {
                banners && banners.length === 0 ? <p>No hay banners</p> : null
            }

            <dialog open={isOpen} className='modal-dialog'>
                <ContentLayout className='modal-body' size='small' horizontalAlign='center'>
                    
                    <div className='close-btn-container'>
                        <img className='close-btn-modal' src={closeSvg} alt='Cerrar' title='Cerrar' onClick={() => { setIsOpen(false); setFile(null); setPhoto(null); }}/>
                    </div>

                    <h2>Agregar banner</h2>

                    <form onSubmit={handleSubmit} ref={formRef} className='form-modal-banner'>

                        <Input
                            label="Texto auxiliar del banner"
                            name='title'
                            placeholder="Ej. Ir al menú principal"
                            type='text'
                            required
                        />

                        <Input
                            label="Redireccionar a"
                            name='url'
                            placeholder="/buscar"
                            type='text'
                        />

                        <div style={{ display: 'none' }}>
                            <input id='file' onChange={handleChangeFile} type='file' accept='image/*'/>
                            <input id='input-submit' type='submit'/>
                        </div>

                    </form>

                    <AccordionContentLayout className='accordion-info' titulo='INFO: Subir imagen'>
                        <p style={{ width: '100%' }}>Se recomienda subir imagenes con proporción <b>17:9</b>, por ejemplo:</p>
                        <ul style={{ marginLeft: '50px', width: '100%', marginBottom: '15px' }}>
                            <li><b>2160 píxeles:</b> 5863×2160px</li>
                            <li><b>1440 píxeles:</b> 3909×1440px</li>
                            <li><b>1080 píxeles:</b> 2931×1080px</li>
                            <li><b>720 píxeles:</b> 1954×720px</li>
                        </ul>
                    </AccordionContentLayout>

                    

                    { photo ? 
                        <React.Fragment>
                            <h4 style={{ width: '95%', textAlign: 'start', marginTop: '0px'}}>Vista previa: {dims ? <u style={{ fontWeight: 'normal' }}>{dims.width}px×{dims.height}px</u> : null}</h4>
                            <PhotoProvider>
                                <PhotoView src={ photo }>
                                    <img className='preview-banner' src={ photo } alt='Foto' title='Haz click para ver la imagen completa'/> 
                                </PhotoView>
                            </PhotoProvider>
                        </React.Fragment>
                        : null 
                    }

                    {
                        loading ? (
                            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Loader/>
                                <p>Cargando, espere un momento...</p>
                            </div>
                        ) : (
                            <React.Fragment>
                                <label 
                                    style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', gap: '10px', marginTop: '7.5px', marginBottom: '5px'}}
                                    htmlFor='file' 
                                    className='button' 
                                >
                                    <img src={addPhotoSvg} alt='Photo'/>
                                    { photo ? "Cambiar imagen" : "Subir Imagen"}
                                </label>

                                { file ? <Button color='red' horizontal icon={sendSvg} onClick={() => document.querySelector('#input-submit').click()}>Subir Imagen</Button> : null }
                            </React.Fragment>
                        )
                    }

                </ContentLayout>
            </dialog>
        </AccordionContentLayout>
    )
}

export default ManageBanners