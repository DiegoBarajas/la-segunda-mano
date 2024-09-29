import React from 'react'
import infoMintSvg from '../Assets/Icons/infoMint.svg'

const PopupWarningCreateAnn = () => {
    return (
        <div>
            <section className='head-popup-warn-create-ann'>
                <img src={infoMintSvg} alt='Info icon'/>
                <h2>Antes de empezar</h2>
            </section>


            <p className='p-popup-warn-create-ann'>
                De antemano <b>Gracias</b> por usar La Segunda Mano, antes de comenzar a publicar es necesario que tomes en cuenta lo siguiente. Las publicaciones estándar gratuitas tienen una fecha de caducidad de 7 días desde la fecha de publicación, esta fecha se puede extender a 30 días con nuestros <b>planes de anuncios premium</b> que ademas te agregan beneficios adicionales.
                <br/><br/>
                Al día puedes publicar un total de 3 anuncios, y puedes tener un máximo de 10 anuncios gratuitos al mismo tiempo, todo esto lo explicamos mas a detalle en nuestras <a href='/condiciones' target='_blank'>Condiciones de uso</a>, también te invitamos a leer nuestras <a href='/politicas' target='_blank'>Políticas de privacidad</a>.
                <br/><br/>
                <b>Gracias por leer!</b> y ahora si, puedes continuar ;)
            </p>
        </div> 
    )
}

export default PopupWarningCreateAnn