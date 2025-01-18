import React from 'react'
import modals from '../Modals'
import '../Styles/Fragments/Footer.css'
import { Link } from 'react-router-dom'

import packageJSON from '../../package.json'
import ReportProblem from './ReportProblem'

const Footer = () => {

    const handleReportProblem = () => {
        modals.popup(<ReportProblem/>, 'popup-saber-tipo')
    }

    return (
        <footer className='footer'>
            <section className='links-footer'>
                <Link className='link-footer' onClick={handleReportProblem} title='Reportar un problema'>Reportar un problema</Link>
                <Link className='link-footer' to='/condiciones' title='Condiciones de uso'>Condiciones de uso</Link>
                <Link className='link-footer' to='/politicas' title='Políticas de privacidad'>Políticas de privacidad</Link>
                <Link className='link-footer' to='/faq' title='Preguntas frecuentes'>Preguntas frecuentes</Link>
            </section>

            <section className='info-footer'>
                <p className='p-info-footer'>LaSegundaMano.com.mx 2025 • <b>Versión:</b> {packageJSON.version}</p>
            </section>
        </footer>
    )
}

export default Footer