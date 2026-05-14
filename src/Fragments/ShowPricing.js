import React from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

import premiumSvg from '../Assets/Icons/premium.svg'
import quitSvg from '../Assets/Icons/quit.svg'
import infoSvg from '../Assets/Icons/info.svg'
import yesSvg from '../Assets/Icons/yes.svg'
import noSvg from '../Assets/Icons/no.svg'

import '../Styles/Fragments/ShowPricing.css'

const ShowPricing = ({ id }) => {
    return (
        <div className='show-pricing'>
            <h2>Haz que tu anuncio destaque</h2>

            <p className='pricing-subtitle'>
                Obtén más visibilidad y vende más rápido con Premium
            </p>

            <table className='table-show-pricing'>
                <thead>
                    <tr>
                        <th>Características</th>

                        <th>
                            <section className='th-icon'>
                                <img src={quitSvg} alt='Gratis' />
                                <h3 className='free-title'>Gratis</h3>
                            </section>
                        </th>

                        <th>
                            <section className='th-icon'>
                                <img src={premiumSvg} alt='Premium' />
                                <h3 className='premium-title'>Premium</h3>
                            </section>
                        </th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>
                            <div className='feature-name'>
                                Prioridad en búsquedas
                                <span
                                    data-tooltip-id='priority-tooltip'
                                    className='tooltip-anchor'
                                >
                                    <img src={infoSvg} alt='info' />
                                </span>
                            </div>

                            <Tooltip id='priority-tooltip' place='bottom'>
                                Tu anuncio aparecerá antes que otros resultados.
                            </Tooltip>
                        </td>

                        <td>
                            <section className='td-icon'>
                                <img className='yes-no-icon' src={noSvg} alt='No' />
                            </section>
                        </td>

                        <td>
                            <section className='td-icon'>
                                <img className='yes-no-icon' src={yesSvg} alt='Sí' />
                            </section>
                        </td>
                    </tr>

                    <tr>
                        <td>Aparece en la página principal</td>

                        <td>
                            <section className='td-icon'>
                                <img className='yes-no-icon' src={noSvg} alt='No' />
                            </section>
                        </td>

                        <td>
                            <section className='td-icon'>
                                <img className='yes-no-icon' src={yesSvg} alt='Sí' />
                            </section>
                        </td>
                    </tr>


                    <tr>
                        <td>Precio</td>

                        <td>
                            <span className='price-free'>
                                $0 MXN
                            </span>
                        </td>

                        <td>
                            <div className='premium-price-wrapper'>
                                <span className='price-premium'>
                                    $49MXN
                                </span>

                                <span className='price-period'>
                                    / mes
                                </span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td></td>

                        <td>
                            Publicación actual
                        </td>

                        <td>
                            <a
                                href={`/anuncio/${id}/mejorar?tipo=Premium`}
                                className='premium-button'
                            >
                                Obtener Premium
                            </a>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default ShowPricing