import React from 'react'

import inmuebleSvg from '../Assets/Icons/inmueble.svg'
import productSvg from '../Assets/Icons/product.svg'
import serviceSvg from '../Assets/Icons/service.svg'
import gratisSvg from '../Assets/Icons/gratis.svg'
import carSvg from '../Assets/Icons/car.svg'

import '../Styles/Fragments/PopupSaberTipoAnn.css';

const PopupSaberTipoAnn = () => {

    return (
        <div className='popup-saber-tipo-body'>
            <h2>¿Que tipo es lo que estoy vendiendo?</h2>
            <table className='table-saber-tipo'>
                <thead>
                    <tr>
                        <th className='th-saber-tipo th-tipo'>Tipo</th>
                        <th className='th-saber-tipo th-desc'>Descripción</th>
                        <th className='th-saber-tipo th-ejem'>Ejemplos</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><section className='td-saber-tipo-icon'> 
                            <img src={productSvg} alt="Producto"/>
                            Producto
                        </section></td>
                        <td className='td-saber-tipo'><p>
                            En esta categoría puedes vender artículos físicos como electrónica, ropa, juguetes, muebles y mucho más. Si tienes un objeto tangible que quieres vender, este es el lugar adecuado.
                        </p></td>
                        <td>
                            <section className='td-saber-tipo-list'>
                                <ul>
                                    <li>Celulares.</li> 
                                    <li>Electrodomesticos.</li> 
                                    <li>Ropa.</li> 
                                    <li>Alimentos. </li>
                                    <li>Calzado. </li>
                                    <li>muebles.</li>
                                </ul>
                            </section>
                        </td>
                    </tr>

                    <tr>
                        <td><section className='td-saber-tipo-icon'> 
                            <img src={serviceSvg} alt="Servicio"/>
                            Servicio
                        </section></td>
                        <td className='td-saber-tipo'><p>
                            Aquí puedes ofrecer una variedad de servicios profesionales y personales. Si tienes habilidades o conocimientos que puedes poner a disposición de otros, publica tu oferta en esta sección.
                        </p></td>
                        <td>
                            <section className='td-saber-tipo-list'>
                                <ul>
                                    <li>Fontaneria.</li> 
                                    <li>Electricidad.</li> 
                                    <li>Albañileria.</li> 
                                    <li>Herreria.</li>
                                    <li>Carpinteria.</li>
                                </ul>
                            </section>
                        </td>
                    </tr>

                    <tr>
                        <td><section className='td-saber-tipo-icon'> 
                            <img src={gratisSvg} alt="Gratis"/>
                            Gratis
                        </section></td>
                        <td className='td-saber-tipo'><p>
                            Aquí puedes ofrecer artículos gratuitos. Esta categoría es ideal si quieres donar productos, ofrecer artículos para piezas, o promocionar tus servicios de forma gratuita, como profesionales que están comenzando.
                        </p></td>
                        <td>
                            <section className='td-saber-tipo-list'>
                                <ul>
                                    <li>Partes de computadoras para reciclar.</li> 
                                    <li>Servicios de peluquería gratuitos para promocionarte.</li> 
                                    <li>Un televisor antiguo que ya no usas.</li>
                                </ul>
                            </section>
                        </td>
                    </tr>

                    <tr>
                        <td><section className='td-saber-tipo-icon'> 
                            <img src={carSvg} alt="Vehiculo"/>
                            Vehiculo
                        </section></td>
                        <td className='td-saber-tipo'><p>
                            Esta categoría está destinada a la compra y venta de vehículos motorizados y no motorizados. Si deseas vender tu coche, motocicleta, bicicleta o incluso un bote, este es el lugar indicado.
                        </p></td>
                        <td>
                            <section className='td-saber-tipo-list'>
                                <ul>
                                    <li>Automoviles.</li> 
                                    <li>Motocicletas.</li> 
                                    <li>Lanchas. </li>
                                    <li>Cuatrimotos.</li>
                                </ul>
                            </section>
                        </td>
                    </tr>

                    <tr>
                        <td><section className='td-saber-tipo-icon'> 
                            <img src={inmuebleSvg} alt="Inmueble"/>
                            Inmueble
                        </section></td>
                        <td className='td-saber-tipo'><p>
                            En esta sección puedes publicar propiedades inmobiliarias. Ya sea que quieras vender tu casa o terreno, alquilar un departamento o encontrar una oficina, puedes hacerlo aquí.
                        </p></td>
                        <td>
                            <section className='td-saber-tipo-list'>
                                <ul>
                                    <li>Venta o renta de casas.</li> 
                                    <li>Oficinas. </li>
                                    <li>Departamentos. </li>
                                    <li>Terrenos.</li>
                                </ul>
                            </section>
                        </td>
                    </tr>

                </tbody>
            </table>





            <table className='table-saber-tipo-mobile'>
                <tr>
                    <th>
                        <section className='td-saber-tipo-icon'> 
                            <img src={productSvg} alt="Producto"/>
                            Producto
                        </section>
                    </th>
                </tr>

                <tr>
                    <td className='td-saber-tipo'><p>
                        En esta categoría puedes vender artículos físicos como electrónica, ropa, juguetes, muebles y mucho más. Si tienes un objeto tangible que quieres vender, este es el lugar adecuado.
                    </p></td>
                </tr>

                <tr>
                    <td><section className='td-saber-tipo-list'>
                        <ul>
                            <li>Celulares.</li> 
                            <li>Electrodomesticos.</li> 
                            <li>Ropa.</li> 
                            <li>Alimentos. </li>
                            <li>Calzado. </li>
                            <li>muebles.</li>
                        </ul>
                    </section></td>
                </tr>
            </table>

            <table className='table-saber-tipo-mobile'>
                <tr>
                    <th>
                        <section className='td-saber-tipo-icon'> 
                            <img src={serviceSvg} alt="Servicio"/>
                            Servicio
                        </section>
                    </th>
                </tr>

                <tr>
                    <td className='td-saber-tipo'><p>
                        Aquí puedes ofrecer una variedad de servicios profesionales y personales. Si tienes habilidades o conocimientos que puedes poner a disposición de otros, publica tu oferta en esta sección.
                    </p></td>
                </tr>

                <tr>
                    <td><section className='td-saber-tipo-list'>
                        <ul>
                            <li>Fontaneria.</li> 
                            <li>Electricidad.</li> 
                            <li>Albañileria.</li> 
                            <li>Herreria.</li>
                            <li>Carpinteria.</li>
                        </ul>
                    </section></td>
                </tr>
            </table>

            <table className='table-saber-tipo-mobile'>
                <tr>
                    <th>
                        <section className='td-saber-tipo-icon'> 
                            <img src={gratisSvg} alt="Gratis"/>
                            Gratis
                        </section>
                    </th>
                </tr>

                <tr>
                    <td className='td-saber-tipo'><p>
                    Aquí puedes ofrecer artículos gratuitos. Esta categoría es ideal si quieres donar productos, ofrecer artículos para piezas, o promocionar tus servicios de forma gratuita, como profesionales que están comenzando.
                    </p></td>
                </tr>

                <tr>
                    <td><section className='td-saber-tipo-list'>
                        <ul>
                            <li>Partes de computadoras para reciclar.</li>
                            <li>Servicios de peluquería gratuitos para promocionarte.</li>
                            <li>Un televisor antiguo que ya no usas.</li>
                        </ul>
                    </section></td>
                </tr>
            </table>

            <table className='table-saber-tipo-mobile'>
                <tr>
                    <th>
                        <section className='td-saber-tipo-icon'> 
                            <img src={carSvg} alt="Vehiculo"/>
                            Vehiculo
                        </section>
                    </th>
                </tr>

                <tr>
                    <td className='td-saber-tipo'><p>
                    Esta categoría está destinada a la compra y venta de vehículos motorizados y no motorizados. Si deseas vender tu coche, motocicleta, bicicleta o incluso un bote, este es el lugar indicado.
                    </p></td>
                </tr>

                <tr>
                    <td><section className='td-saber-tipo-list'>
                        <ul>
                            <li>Automoviles.</li>
                            <li>Motocicletas.</li>
                            <li>Lanchas.</li>
                            <li>Cuatrimotos.</li>
                        </ul>
                    </section></td>
                </tr>
            </table>

            <table className='table-saber-tipo-mobile'>
                <tr>
                    <th>
                        <section className='td-saber-tipo-icon'> 
                            <img src={inmuebleSvg} alt="Inmueble"/>
                            Inmueble
                        </section>
                    </th>
                </tr>

                <tr>
                    <td className='td-saber-tipo'><p>
                        En esta sección puedes publicar propiedades inmobiliarias. Ya sea que quieras vender tu casa o terreno, alquilar un departamento o encontrar una oficina, puedes hacerlo aquí.
                    </p></td>
                </tr>

                <tr>
                    <td><section className='td-saber-tipo-list'>
                        <ul>
                            <li>Venta o renta de casas.</li> 
                            <li>Oficinas. </li>
                            <li>Departamentos. </li>
                            <li>Terrenos.</li>
                        </ul>
                    </section></td>
                </tr>
            </table>

        </div>
    )
}

export default PopupSaberTipoAnn