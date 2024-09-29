import React, { useEffect, useState } from 'react'
import PopupWarningCreateAnn from '../Fragments/PopupWarningCreateAnn';
import PopupSaberTipoAnn from '../Fragments/PopupSaberTipoAnn';
import HeadCreateAnn from '../Fragments/HeadCreateAnn';
import ContentLayout from '../Layouts/ContentLayout'
import TextButton from '../Components/TextButton';
import PageLayout from '../Layouts/PageLayout'
import Button from '../Components/Button';

import inmuebleSvg from '../Assets/Icons/inmueble.svg'
import helpMintSvg from '../Assets/Icons/helpMint.svg'
import productSvg from '../Assets/Icons/product.svg'
import serviceSvg from '../Assets/Icons/service.svg'
import gratisSvg from '../Assets/Icons/gratis.svg'
import carSvg from '../Assets/Icons/car.svg'

import '../Styles/Pages/CreateAnnouncement.css';
import modals from '../Modals';

const CreateAnnouncement = () => {
    document.title = "La Segunda Mano - Crear anuncio";

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    useEffect(() => {
        if(!localStorage.getItem('popupWarnActive')){
            modals.popup(<PopupWarningCreateAnn/>, 'popup-warning')
        }

        localStorage.setItem('popupWarnActive', true);
    }, [true]);

    const [ redirect, setRedirect ] = useState(null);

    const showPoputHow = () => {
        modals.popup(<PopupSaberTipoAnn/>, 'popup-saber-tipo')
    }

    return (
        <PageLayout footer={false}>

            <HeadCreateAnn
                currentStep={0}
            />

            <ContentLayout horizontalAlign='center' redirect={redirect}>
                <p className='info-body-create-ann'>¿Qué estas publicando?</p>
                <Button
                    width='50%'
                    icon={productSvg}
                    className='button-body-create-ann'

                    onClick={() => setRedirect('/vender/producto')}
                >Producto</Button>

                <Button
                    width='50%'
                    icon={serviceSvg}
                    className='button-body-create-ann'

                    onClick={() => setRedirect('/vender/servicio')}
                >Servicio</Button>

                <Button
                    width='50%'
                    icon={gratisSvg}
                    className='button-body-create-ann'

                    onClick={() => setRedirect('/vender/gratis')}
                >Gratis</Button>

                <Button
                    width='50%'
                    icon={carSvg}
                    className='button-body-create-ann'

                    onClick={() => setRedirect('/vender/vehiculo')}
                >Vehiculo</Button>

                <Button
                    width='50%'
                    icon={inmuebleSvg}
                    className='button-body-create-ann'

                    onClick={() => setRedirect('/vender/inmueble')}
                >Inmueble</Button>

                <TextButton className='text-button-create-ann' icon={helpMintSvg} onClick={showPoputHow}>¿Qué categoría es mi producto/servicio?</TextButton>
            </ContentLayout>

        </PageLayout>
    )
}

export default CreateAnnouncement