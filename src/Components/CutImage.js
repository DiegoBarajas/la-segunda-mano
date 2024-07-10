import React, { useRef, useEffect, useState } from 'react';
import Cropper from 'react-cropper';
import Button from './Button';
import Title from './Title';

import '../Styles/Components/CutImage.css';
import 'cropperjs/dist/cropper.css';

import cutSvg from '../Assets/Icons/cut.svg';
import cancelSvg from '../Assets/Icons/cancel.svg';

const CutImage = ({ image, onCancel, setCroppedImage }) => {
    const cropperRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (image) {
            reduceImageSize(image, 800, 800, (reducedBlob) => {
                const reducedUrl = URL.createObjectURL(reducedBlob);
                setImageSrc(reducedUrl);
            });
        }

    }, [image]);

    const cropImage = () => {
        const cropper = cropperRef.current.cropper;
        const canvas = cropper.getCroppedCanvas();

        canvas.toBlob((blob) => {
            const file = new File([blob], image.name, { type: image.type });
            setCroppedImage(file);
            onCancel();
        });
    };

    return image ? (
        <div className="cut-img-container">
            <Title mb="25px">Recortar imagen</Title>
            {imageSrc && (
                <Cropper
                src={imageSrc}
                className="cropper"
                initialAspectRatio={1}
                aspectRatio={1}
                guides={true}
                ref={cropperRef}
                viewMode={1}
                />
            )}
            <section className="cut-img-buttons">
                <Button icon={cutSvg} horizontal className="cut-img-button" onClick={cropImage}>
                    Cortar
                </Button>
                <Button icon={cancelSvg} horizontal className="cut-img-button" color="red" onClick={onCancel}>
                    Cancelar
                </Button>
            </section>
        </div>
    ) : null;
};

const reduceImageSize = (file, maxWidth, maxHeight, callback) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const reader = new FileReader();

    reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
        const ctx = canvas.getContext('2d');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }
        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(callback, 'image/jpeg', 0.7);
        };
    };

    reader.readAsDataURL(file);
};

export default CutImage;
