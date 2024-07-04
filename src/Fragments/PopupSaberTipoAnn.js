import React from 'react'
import ContentLayout from '../Layouts/ContentLayout'
import Button from '../Components/Button'

import inmuebleSvg from '../Assets/Icons/inmueble.svg'
import productSvg from '../Assets/Icons/product.svg'
import serviceSvg from '../Assets/Icons/service.svg'
import gratisSvg from '../Assets/Icons/gratis.svg'
import carSvg from '../Assets/Icons/car.svg'

import '../Styles/Pages/CreateAnnouncement.css';

const PopupSaberTipoAnn = ({setPopupActive}) => {
    return (
        <ContentLayout size='small' horizontalAlign='center' className='layout-poput-saber-tipo'>
            <h2 className='h2-poput-saber-tipo'>¿Que tipo es lo que estoy vendiendo?</h2>

                <section className='item-poput-saber-tipo item-poput-saber-tipo-line'>
                    <img src={productSvg} alt='Producto'/>
                    <p><h3>Producto</h3>
                        En esta categoría puedes vender artículos físicos como electrónica, ropa, juguetes, muebles y mucho más. Si tienes un objeto tangible que quieres vender, este es el lugar adecuado.
                        <br/><br/>
                        <b>Ejemplo:</b> Celulares, electrodomesticos, ropa, alimentos, calzado, muebles.
                    </p>
                </section>
                
                <section className='item-poput-saber-tipo item-poput-saber-tipo-line'>
                    <img src={serviceSvg} alt='Servicio'/>
                    <p><h3>Servicio</h3>
                        Aquí puedes ofrecer una variedad de servicios profesionales y personales. Si tienes habilidades o conocimientos que puedes poner a disposición de otros, publica tu oferta en esta sección.
                        <br/><br/>
                        <b>Ejemplo:</b> Fontaneria, electricidad, albañileria, carpinteria.
                    </p>
                </section>

                <section className='item-poput-saber-tipo item-poput-saber-tipo-line'>
                    <img src={gratisSvg} alt='Gratis'/>
                    <p><h3>Gratis</h3>
                        Aquí puedes ofrecer artículos gratuitos. Esta categoría es ideal si quieres donar productos, ofrecer artículos para piezas, o promocionar tus servicios de forma gratuita, como profesionales que están comenzando.
                        <br/><br/>
                        <b>Ejemplo:</b> Partes de computadoras para reciclar, servicios de peluquería gratuitos para promocionarte, un televisor antiguo que ya no usas.
                    </p>
                </section>

                <section className='item-poput-saber-tipo item-poput-saber-tipo-line'>
                    <img src={carSvg} alt='Vehiculo'/>
                    <p><h3>Vehiculo</h3>
                        Esta categoría está destinada a la compra y venta de vehículos motorizados y no motorizados. Si deseas vender tu coche, motocicleta, bicicleta o incluso un bote, este es el lugar indicado.
                        <br/>
                        <b>Ejemplo:</b> Automoviles, motocicletas, lanchas, cuatrimotos.
                    </p>
                </section>

                <section className='item-poput-saber-tipo'>
                    <img src={inmuebleSvg} alt='Inmueble'/>
                    <p><h3>Inmueble</h3>
                        En esta sección puedes publicar propiedades inmobiliarias. Ya sea que quieras vender tu casa o terreno, alquilar un departamento o encontrar una oficina, puedes hacerlo aquí.
                        <br/><br/>
                        <b>Ejemplo:</b> Venta, renta de casas, oficinas, departamentos, terrenos.
                    </p>
                </section>

            <Button color='red' width='100%' onClick={() => setPopupActive(false)}>Cerrar ventana</Button>
        </ContentLayout>
    )
}

export default PopupSaberTipoAnn