import React, { useEffect, useRef, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import ContentLayout from '../Layouts/ContentLayout';
import InputFile from '../Components/InputFile';
import CutImage from '../Components/CutImage';
import Select from '../Components/Select';
import Button from '../Components/Button';
import Input from '../Components/Input';
import modals from '../Modals';

import IconButton from '../Components/IconButton';
import fotosSvg from '../Assets/Icons/images.svg'
import cancelRedSvg from '../Assets/Icons/cancelRed.svg'

import '../Styles/Pages/CreateAnnouncement.css';

const EditAnnStep1 = ({formData, setFormData, callBack, id}) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    const formRef = useRef(null);
    const [ redirect, setRedirect ] = useState(null);

    const [ fotos, setFotos ] = useState( formData.fotos ? formData.fotos : [] );
    const [ files, setFiles ] = useState([]);
    const [ currentCropImage, setCurrentCropImage ] = useState(null);

    const handleSelectFiles = (e) => {
        if(fotos.length >= 5){ 
            setCurrentCropImage(null);
            return modals.toast("Solo se pueden seleccionar máximo 5 imagenes", "warning"); 
        }

        const { files } = e.target;
        const filesArray = Array.from(files).slice(0, 5-fotos.length);

        setFiles(filesArray);
        setCurrentCropImage(filesArray[0]);
    }

    const setCroppedImage = (element) => {
        if(fotos.length >= 5){ 
            setCurrentCropImage(null);
            return modals.toast("Solo se pueden seleccionar máximo 5 imagenes", "warning"); 
        }

        setFotos([...fotos, element]);
    }

    const onCancel = () => {
        const filesArray = [...files].slice(1);

        setFiles(filesArray);
        setCurrentCropImage(filesArray[0]);
    }

    const deleteElement = (index) => {
        const newFotos = [];
        fotos.forEach((f, i) => {
            if(i !== index) newFotos.push(f);
        });

        setFotos(newFotos);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(fotos.length === 0) return modals.alert("Ups...", "Debes subir al menos una imagen", 'warning');

        const jsonData = {...formData};
        jsonData.fotos = fotos;

        setFormData(jsonData);
        callBack();
    }

    const renderImages = () => {       
        return <section className='section-imagenes-article'>
            { fotos.map((element, index) => 
                    <section className='section-imagen-article' key={`section-imagen-article-${index}`}>
                        <IconButton
                            icon={cancelRedSvg}
                            title="Quitar esta foto"
                            color='transparent'
                            className='button-close-imagenes-article'
    
                            onClick={() => deleteElement(index)}
                        />
                        <PhotoProvider>
                            <PhotoView src={ getSrc(element) }>
                                <img style={{ cursor: 'zoom-in' }} src={ getSrc(element) } alt='Foto' title="Haz click para ver la imagen en pantalla completa"/>
                            </PhotoView>
                        </PhotoProvider>
                    </section>
            ) }
        </section>

        function getSrc(element){
            if( typeof element == 'string' ) return element;
            return(URL.createObjectURL(element))
        }
    }

    return (
        <ContentLayout horizontalAlign='center' redirect={redirect} key={Math.random()}>
            <form className='form-create-ann' onSubmit={handleSubmit} ref={formRef}>
                <p className='p-nota-create-ann'>Elimine y agregue imagenes o pase al siguiente paso.</p>

                <>
                    <InputFile
                        key={'fotos-input'}
                        id='fotos-input'
                        icon={fotosSvg}
                        width='100%'
                        label={<>Imagenes ({fotos.length}/5)<span className='required'>*</span></> }
                        auxText="Maximo 5 imagenes de 1MB"
                        accept=".png,.jpg,.jpeg,.tiff,.tif,.webp"
                        mb='15px'
                        onChange={handleSelectFiles}
                        selectedFile={null}
                        multiple
                        disabled={fotos.length >= 5}
                    >{ fotos.length >= 5 ? "Limite de imagenes alcanzado 5/5" : "Selecciona las imagenes" }</InputFile>
                    
                    {renderImages()}
                </>
                
                <section className='buttons-create-ann'>
                    <Button
                        color='red'
                        onClick={() => setRedirect('/anuncio/'+id)}
                    >Cancelar</Button>

                    <Button
                        type='submit'
                    >Siguiente paso</Button>
                </section>
            </form>

            <CutImage
                image={currentCropImage}
                setCroppedImage={setCroppedImage}
                onCancel={onCancel}
            />
        </ContentLayout>
    )
}

export default EditAnnStep1

