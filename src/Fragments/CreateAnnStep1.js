import React, { useEffect, useRef, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-image-previewer';
import ContentLayout from '../Layouts/ContentLayout';
import InputFile from '../Components/InputFile';
import Select from '../Components/Select';
import Button from '../Components/Button';
import Input from '../Components/Input';
import modals from '../Modals';

import IconButton from '../Components/IconButton';
import fotosSvg from '../Assets/Icons/images.svg';
import cancelRedSvg from '../Assets/Icons/cancelRed.svg';

import constants from '../constants.json';
import '../Styles/Pages/CreateAnnouncement.css';

const CreateAnnStep1 = ({ type, formData, setFormData, callBack }) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
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
        const newFotos = fotos.filter((_, i) => i !== index);
        setFotos(newFotos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fotos.length === 0) return modals.alert("Ups...", "Debes subir al menos una imagen", 'warning');

        const newFormData = new FormData(formRef.current);
        const jsonData = { ...formData };

        jsonData.fotos = fotos;
        newFormData.forEach((value, key) => (jsonData[key] = value));

        setFormData(jsonData);
        callBack();
    };

    const renderInputs = () => {
        const inputs = constants.forms[type].general;
        return inputs.map((opt) => {
            switch (opt.kind) {
                case "input":
                    return (
                        <Input
                            key={opt.name}
                            id={opt.name}
                            name={opt.name}
                            type={opt.type}
                            width="100%"
                            label={opt.label}
                            placeholder={opt.placeholder}
                            auxText={opt.auxText}
                            mb="15px"
                            required={opt.required}
                            textArea={opt.textArea}
                            defaultValue={formData[opt.name]}
                        />
                    );
                case "select":
                    return (
                        <Select
                            key={opt.name}
                            id={opt.name}
                            name={opt.name}
                            label={opt.label}
                            width="100%"
                            auxText={opt.auxText}
                            options={constants[opt.options]}
                            mb="15px"
                            required={opt.required}
                            selectedOption={formData[opt.name]}
                        />
                    );
                case "inputFile":
                    return (
                        <>
                            <InputFile
                                key={'fotos-input'}
                                id='fotos-input'
                                icon={fotosSvg}
                                width='100%'
                                label={<>Imagenes ({fotos.length}/5)<span className='required'>*</span></>}
                                auxText="Maximo 5 imágenes de 1MB"
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
                                    <section className='section-imagen-article' key={`section-imagen-article-${index}`}>
                                        <IconButton
                                            icon={cancelRedSvg}
                                            title="Quitar esta foto"
                                            color='transparent'
                                            className='button-close-imagenes-article'

                                            onClick={() => deleteElement(index)}
                                        />
                                        <PhotoProvider>
                                            <PhotoView src={URL.createObjectURL(element)}>
                                                <img style={{ cursor: 'zoom-in' }} src={URL.createObjectURL(element)} alt='Foto' title="Haz click para ver la imagen en pantalla completa" />
                                            </PhotoView>
                                        </PhotoProvider>
                                    </section>
                                ))}
                            </section>
                        </>
                    );

                default:
                    return null;
            }
        });
    };

    return (
        <ContentLayout horizontalAlign='center' redirect={redirect}>
            <form className='form-create-ann' onSubmit={handleSubmit} ref={formRef}>
                <p className='p-nota-create-ann'><b>NOTA:</b> Los campos con <span>*</span> son obligatorios.</p>

                {renderInputs()}

                <section className='buttons-create-ann'>
                    <Button
                        color='red'
                        onClick={() => setRedirect('/vender')}
                    >Volver atrás</Button>

                    <Button
                        type='submit'
                    >Siguiente paso</Button>
                </section>
            </form>
        </ContentLayout>
    );
};

export default CreateAnnStep1;