import React from 'react'
import '../Styles/Fragments/Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className='footer'>
            <section className='links-footer'>
                <Link className='link-footer' to='/' title='Reportar un problema'>Reportar un problema</Link>
                <Link className='link-footer' to='/' title='Condiciones de uso'>Condiciones de uso</Link>
                <Link className='link-footer' to='/' title='Politicas de privacidad'>Politicas de privacidad</Link>
                <Link className='link-footer' to='/' title='Preguntas frecuentes'>Preguntas frecuentes</Link>

            </section>
            <section className='info-footer'>
                <p className='p-info-footer'>La segunda mano - 2024</p>
            </section>
        </footer>
    )
}

export default Footer