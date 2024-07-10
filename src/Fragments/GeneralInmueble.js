import React, { useEffect, useRef, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-image-previewer';
import ContentLayout from '../Layouts/ContentLayout';
import InputFile from '../Components/InputFile';
import CutImage from '../Components/CutImage';
import Select from '../Components/Select';
import Button from '../Components/Button';
import Input from '../Components/Input';
import modals from '../Modals';

import IconButton from '../Components/IconButton';
import moneySvg from '../Assets/Icons/money.svg'
import fotosSvg from '../Assets/Icons/images.svg'
import cancelRedSvg from '../Assets/Icons/cancelRed.svg'

import '../Styles/Pages/CreateAnnouncement.css';

const GeneralInmueble = ({callBack, setFormData, setCurrentFormData}) => {
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    const formRef = useRef(null);
    
    const [ redirect, setRedirect ] = useState(null);

    const [ files, setFiles ] = useState([]);
    const [ fotos, setFotos ] = useState([]);
    
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

        const newFormData = new FormData(formRef.current);
        fotos.forEach(foto => newFormData.append('imagenes', foto));
        newFormData.append('tipoAnuncio', 'inmueble');
        newFormData.append('categoria', 'inmuebles')

        setCurrentFormData(newFormData);
        setFormData(newFormData);
        callBack();
    }

    return (
        <ContentLayout horizontalAlign='center' redirect={redirect}>
            <form className='form-create-ann' onSubmit={handleSubmit} ref={formRef}>
                <p className='p-nota-create-ann'><b>NOTA:</b> Los campos con <span>*</span> son obligatorios.</p>

                <Input
                    id='titulo'
                    name='titulo'
                    width='100%'
                    label="Titulo del anuncio"
                    placeholder='Ej. Renta de casa duplex por el centro'
                    auxText="Este es el titulo de tu publicación"
                    mb='15px'
                    required
                />

                <Input
                    id='precio'
                    name='precio'
                    type='number'
                    icon={moneySvg}
                    width='100%'
                    label="Costo del inmueble o renta"
                    placeholder='Ej. 5500'
                    auxText="El costo debe ser real, de lo contrario infringes nuestras condiciones de uso y habrá una sanción."
                    mb='15px'
                    min={1}
                    required
                />

                <InputFile
                    id='fotos-input'
                    icon={fotosSvg}
                    width='100%'
                    label={<>Fotos ({fotos.length}/5)<span className='required'>*</span></> }
                    auxText="Maximo 5 Fotos de 1MB"
                    accept=".png,.jpg,.jpeg,.tiff,.tif,.webp"
                    mb='15px'
                    onChange={handleSelectFiles}
                    selectedFile={null}
                    multiple
                    disabled={fotos.length >= 5}
                >{ fotos.length >= 5 ? "Limite de Fotos alcanzado 5/5" : "Selecciona las Fotos" }</InputFile>

                <section className='section-imagenes-article'>
                    {
                        fotos.map((element, index) => 
                            <section className='section-imagen-article' key={`section-imagen-article-${index}`}>
                                <IconButton
                                    icon={cancelRedSvg}
                                    title="Quitar esta foto"
                                    color='transparent'
                                    className='button-close-imagenes-article'

                                    onClick={() => deleteElement(index)}
                                />

                                <PhotoProvider>
                                    <PhotoView src={ URL.createObjectURL(element) }>
                                        <img style={{ cursor: 'zoom-in' }} src={ URL.createObjectURL(element) } alt='Foto' title="Haz click para ver la imagen en pantalla completa"/>
                                    </PhotoView>
                                </PhotoProvider>
                            </section>
                        )
                    }
                </section>

                <Input
                    id='descripcion'
                    name='descripcion'
                    width='100%'
                    label="Descripción de tu publicación"
                    placeholder='Puedes escribir información adicional como su ubicacion, detalles de la casa, remodelaciones, que incluye, etc...'
                    auxText="Descripción breve de tu artuculo"
                    mb='40px'
                    textArea
                    required
                />
                
                <section className='buttons-create-ann'>
                    <Button
                        color='red'
                        onClick={() => setRedirect('/vender')}
                    >Volver atras</Button>

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

export default GeneralInmueble