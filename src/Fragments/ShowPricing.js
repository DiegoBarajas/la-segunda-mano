import React from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

import impulsedSvg from '../Assets/Icons/impulsed.svg'
import premiumSvg from '../Assets/Icons/premium.svg'
import quitSvg from '../Assets/Icons/quit.svg'
import infoSvg from '../Assets/Icons/info.svg'
import yesSvg from '../Assets/Icons/yes.svg'
import noSvg from '../Assets/Icons/no.svg'

import '../Styles/Fragments/ShowPricing.css'

const ShowPricing = () => {
    return (
        <div className='show-pricing'>
            <h2>Conoce nuestras mejoras para tu anuncio</h2>
            <table className='table-show-pricing'>
                <thead>
                    <tr>
                        <th>
                            <section className='th-icon'>
                                <h3>Caracteristicas</h3>
                            </section>
                        </th>

                        <th>
                            <section className='th-icon'>
                                <img src={quitSvg} alt='Estandar'/>
                                <h3>Estandar</h3>
                            </section>
                        </th>
                        <th>
                            <section className='th-icon'>
                                <img src={impulsedSvg} alt='Impulsado'/>
                                <h3 className='p-mint'>Impulsado</h3>
                            </section>
                        </th>
                        <th>
                            <section className='th-icon'>
                                <img src={premiumSvg} alt='Premium'/>
                                <h3 className='p-gold'>Premium</h3>
                            </section>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <section className='td-icon' data-tooltip-id="my-tooltip"><a id="priotity" className='a-tooltip-element'>Prioridad en busquedas <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#priotity" place="bottom">
                                Cuando se realiza una busqueda que coincida con el anuncio, tiene prioridad ante otras publicaciones.
                            </Tooltip>
                        </td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={noSvg} alt='No'/> </section></td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={yesSvg} alt='SI'/> </section></td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={yesSvg} alt='SI'/> </section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='aparece' className='a-tooltip-element'>Aparece en la página principal <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#aparece" place="bottom">
                                Sale al inicio en la página principal, para que los compradores sea lo primero que vean.
                            </Tooltip>
                        </td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={noSvg} alt='No'/> </section></td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={noSvg} alt='No'/> </section></td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={yesSvg} alt='SI'/> </section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='duracion' className='a-tooltip-element'>Duración del anuncio <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#duracion" place="bottom">
                                El anuncio tiene un tiempo de caducidad, este tiempo depende del tipo de anuncio.
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'>7 días</section></td>
                        <td><section className='td-icon'>30 días</section></td>
                        <td><section className='td-icon'>30 días</section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='precio' className='a-tooltip-element'>Precio <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#precio" place="bottom">
                                Costo unico con impuestos incluidos
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'>$0 MXN</section></td>
                        <td><section className='td-icon'>$99 MXN</section></td>
                        <td><section className='td-icon'>$199 MXN</section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='adquirir' className='a-tooltip-element'>Adquirir <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#adquirir" place="bottom">
                                Me interesa adquirir una mejora de mi anuncio
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'> Adquirido </section></td>
                        <td><a className='a-td-button'>Me interesa</a></td>
                        <td><a className='a-td-button'>Me interesa</a></td>                       
                    </tr>
                </tbody>
            </table>



            <table className='table-show-pricing-mobile'>
                <thead>
                    <tr>
                        <th>
                            <section className='th-icon'>
                                <h3>Caracteristicas</h3>
                            </section>
                        </th>

                        <th>
                            <section className='th-icon'>
                                <img src={quitSvg} alt='Estandar'/>
                                <h3>Estandar</h3>
                            </section>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <section className='td-icon' data-tooltip-id="my-tooltip"><a id="priotity" className='a-tooltip-element'>Prioridad en busquedas <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#priotity" place="bottom">
                                Cuando se realiza una busqueda que coincida con el anuncio, tiene prioridad ante otras publicaciones.
                            </Tooltip>
                        </td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={noSvg} alt='No'/> </section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='aparece' className='a-tooltip-element'>Aparece en la página principal <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#aparece" place="bottom">
                                Sale al inicio en la página principal, para que los compradores sea lo primero que vean.
                            </Tooltip>
                        </td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={noSvg} alt='No'/> </section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='duracion' className='a-tooltip-element'>Duración del anuncio <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#duracion" place="bottom">
                                El anuncio tiene un tiempo de caducidad, este tiempo depende del tipo de anuncio.
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'>7 días</section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='precio' className='a-tooltip-element'>Precio <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#precio" place="bottom">
                                Costo unico con impuestos incluidos
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'>$0 MXN</section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='adquirir' className='a-tooltip-element'>Adquirir <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#adquirir" place="bottom">
                                Me interesa adquirir una mejora de mi anuncio
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'> Adquirido </section></td>                     
                    </tr>
                </tbody>
            </table>
            <table className='table-show-pricing-mobile'>
                <thead>
                    <tr>
                        <th>
                            <section className='th-icon'>
                                <h3>Caracteristicas</h3>
                            </section>
                        </th>

                        <th>
                            <section className='th-icon'>
                                <img src={impulsedSvg} alt='Impulsado'/>
                                <h3 className='p-mint'>Impulsado</h3>
                            </section>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <section className='td-icon' data-tooltip-id="my-tooltip"><a id="priotity" className='a-tooltip-element'>Prioridad en busquedas <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#priotity" place="bottom">
                                Cuando se realiza una busqueda que coincida con el anuncio, tiene prioridad ante otras publicaciones.
                            </Tooltip>
                        </td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={yesSvg} alt='SI'/> </section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='aparece' className='a-tooltip-element'>Aparece en la página principal <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#aparece" place="bottom">
                                Sale al inicio en la página principal, para que los compradores sea lo primero que vean.
                            </Tooltip>
                        </td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={noSvg} alt='No'/> </section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='duracion' className='a-tooltip-element'>Duración del anuncio <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#duracion" place="bottom">
                                El anuncio tiene un tiempo de caducidad, este tiempo depende del tipo de anuncio.
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'>30 días</section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='precio' className='a-tooltip-element'>Precio <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#precio" place="bottom">
                                Costo unico con impuestos incluidos
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'>$99 MXN</section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='adquirir' className='a-tooltip-element'>Adquirir <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#adquirir" place="bottom">
                                Me interesa adquirir una mejora de mi anuncio
                            </Tooltip>
                        </td>
                        <td><a className='a-td-button'>Me interesa</a></td>                    
                    </tr>
                </tbody>
            </table>
            <table className='table-show-pricing-mobile'>
                <thead>
                    <tr>
                        <th>
                            <section className='th-icon'>
                                <h3>Caracteristicas</h3>
                            </section>
                        </th>
                        <th>
                            <section className='th-icon'>
                                <img src={premiumSvg} alt='Premium'/>
                                <h3 className='p-gold'>Premium</h3>
                            </section>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <section className='td-icon' data-tooltip-id="my-tooltip"><a id="priotity" className='a-tooltip-element'>Prioridad en busquedas <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#priotity" place="bottom">
                                Cuando se realiza una busqueda que coincida con el anuncio, tiene prioridad ante otras publicaciones.
                            </Tooltip>
                        </td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={yesSvg} alt='SI'/> </section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='aparece' className='a-tooltip-element'>Aparece en la página principal <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#aparece" place="bottom">
                                Sale al inicio en la página principal, para que los compradores sea lo primero que vean.
                            </Tooltip>
                        </td>
                        <td> <section className='td-icon'><img className='yes-no-icon' src={yesSvg} alt='SI'/> </section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='duracion' className='a-tooltip-element'>Duración del anuncio <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#duracion" place="bottom">
                                El anuncio tiene un tiempo de caducidad, este tiempo depende del tipo de anuncio.
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'>30 días</section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='precio' className='a-tooltip-element'>Precio <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#precio" place="bottom">
                                Costo unico con impuestos incluidos
                            </Tooltip>
                        </td>
                        <td><section className='td-icon'>$199 MXN</section></td>
                    </tr>

                    <tr>
                        <td>
                            <section className='td-icon'><a id='adquirir' className='a-tooltip-element'>Adquirir <img src={infoSvg} alt='i'/></a></section>
                            <Tooltip anchorSelect="#adquirir" place="bottom">
                                Me interesa adquirir una mejora de mi anuncio
                            </Tooltip>
                        </td>
                        <td><a className='a-td-button'>Me interesa</a></td>                       
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ShowPricing