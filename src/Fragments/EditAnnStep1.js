import React, { useEffect, useRef, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import ContentLayout from '../Layouts/ContentLayout';
import InputFile from '../Components/InputFile';
import Button from '../Components/Button';
import modals from '../Modals';

import IconButton from '../Components/IconButton';
import fotosSvg from '../Assets/Icons/images.svg';
import cancelRedSvg from '../Assets/Icons/cancelRed.svg';

import '../Styles/Pages/CreateAnnouncement.css';

const EditAnnStep1 = ({ formData, setFormData, callBack, id }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const formRef = useRef(null);
    const [redirect, setRedirect] = useState(null);
    const [fotos, setFotos] = useState(formData.fotos ? formData.fotos : []);

    const handleSelectFiles = (e) => {
        if (fotos.length >= 5) {
            return modals.toast("Solo se pueden seleccionar máximo 5 imágenes", "warning");
        }

        const { files } = e.target;
        const filesArray = Array.from(files).slice(0, 5 - fotos.length);
        setFotos([...fotos, ...filesArray]);
    };

    const deleteElement = (index) => {
        setFotos(fotos.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fotos.length === 0) return modals.alert("Ups...", "Debes subir al menos una imagen", 'warning');

        setFormData({ ...formData, fotos });
        callBack();
    };

    return (
        <ContentLayout horizontalAlign='center' redirect={redirect}>
            <form className='form-create-ann' onSubmit={handleSubmit} ref={formRef}>
                <p className='p-nota-create-ann'>Elimine y agregue imágenes o pase al siguiente paso.</p>

                <InputFile
                    key={'fotos-input'}
                    id='fotos-input'
                    icon={fotosSvg}
                    width='100%'
                    label={<>Imágenes ({fotos.length}/5)<span className='required'>*</span></>}
                    auxText="Máximo 5 imágenes de 1MB"
                    accept=".png,.jpg,.jpeg,.tiff,.tif,.webp"
                    mb='15px'
                    onChange={handleSelectFiles}
                    selectedFile={null}
                    multiple
                    disabled={fotos.length >= 5}
                >
                    {fotos.length >= 5 ? "Límite de imágenes alcanzado 5/5" : "Selecciona las imágenes"}
                </InputFile>

                <section className='section-imagenes-article'>
                    {fotos.map((element, index) => (
                        <section className='section-imagen-article' key={`imagen-${index}`}>
                            <IconButton
                                icon={cancelRedSvg}
                                title="Quitar esta foto"
                                color='transparent'
                                className='button-close-imagenes-article'
                                onClick={() => deleteElement(index)}
                            />
                            <PhotoProvider>
                                <PhotoView src={getSrc(element)}>
                                    <img style={{ cursor: 'zoom-in' }} src={getSrc(element)} alt='Foto' title="Haz click para ver la imagen en pantalla completa" />
                                </PhotoView>
                            </PhotoProvider>
                        </section>
                    ))}
                </section>

                <section className='buttons-create-ann'>
                    <Button color='red' onClick={() => setRedirect('/anuncio/' + id)}>Cancelar</Button>
                    <Button type='submit'>Siguiente paso</Button>
                </section>
            </form>
        </ContentLayout>
    );

    function getSrc(element) {
        return typeof element === 'string' ? element : URL.createObjectURL(element);
    }
};

export default EditAnnStep1;
