import React from 'react'
import ContentLayout from '../Layouts/ContentLayout'
import Button from '../Components/Button'

import infoMintSvg from '../Assets/Icons/infoMint.svg'
import { Link } from 'react-router-dom'

const PopupWarningCreateAnn = ({setPopupActive}) => {
    return (
        <ContentLayout size='small' horizontalAlign='center' className='layout-poput-warn-create-ann'>
            <section className='head-popup-warn-create-ann'>
                <img src={infoMintSvg} alt='Info icon'/>
                <h2>Antes de empezar</h2>
            </section>

            <p className='p-popup-warn-create-ann'>
                De antemano <b>Gracias</b> por usar La Segunda Mano, antes de comenzar a publicar es necesario que tomes en cuenta lo siguiente. Las publicaciones estandar gratuitas tienen una fecha de caducidad de 7 días desde la fecha de publicación, esta fecha se puede extender a 30 días con nuestos <b>planes de anuncios premium</b> que ademas te agregan beneficios adicionales.
                <br/><br/>
                Al día puedes publicar un total de 3 anuncios, y puedes tener un maximo de 10 anuncios gratuitos al mismo tiempo, todo esto lo explicamos mas a detalle en nuestras <Link to='/condiciones' target='_blank'>Condiciones de uso</Link>, tambien te invitamos a leer nuestras <Link to='/politicas' target='_blank'>Politicas de privacidad</Link>.
                <br/><br/>
                <b>Gracias por leer!</b> y ahora si, puedes continuar ;)
            </p>


            <Button color='red' width='90%' onClick={() => setPopupActive(false)}>Cerrar ventana</Button>
        </ContentLayout>    
    )
}

export default PopupWarningCreateAnn