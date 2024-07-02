import React, { useRef } from 'react'
import Cropper from 'react-cropper';
import Button from './Button';

import '../Styles/Components/CutImage.css'
import 'cropperjs/dist/cropper.css';

import cutSvg from '../Assets/Icons/cut.svg'
import cancelSvg from '../Assets/Icons/cancel.svg'
import Title from './Title';

const CutImage = ({ image, onCancel, setCroppedImage }) => {

    const cropperRef = useRef(null);

    const cropImage = () => {
        const cropper = cropperRef.current.cropper;
        const canvas = cropper.getCroppedCanvas();
  
        canvas.toBlob((blob) => {
            const file = new File([blob], image.name, { type: image.type });

            setCroppedImage(file);
            onCancel();
        })
    };

    return image 
        ?(
            <div className='cut-img-container'>
                <Title mb='25px'>Recortar imagen</Title>
                <Cropper
                    src={URL.createObjectURL(image)}
                    className='cropper'
                    initialAspectRatio={1}
                    aspectRatio={1}
                    guides={true}
                    ref={cropperRef}
                    viewMode={1}
                />
                <section className='cut-img-buttons'>
                    <Button icon={cutSvg} horizontal className='cut-img-button' onClick={cropImage}>Cortar</Button>
                    <Button icon={cancelSvg} horizontal className='cut-img-button' color='red' onClick={onCancel}>Cancelar</Button>
                    
                </section>
            </div>
        ) : <></>
}

export default CutImage