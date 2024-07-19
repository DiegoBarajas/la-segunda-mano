import React from 'react'

import whatsappSvg from '../Assets/Icons/whatsapp.svg'
import emailSvg from '../Assets/Icons/email.svg'
import phoneSvg from '../Assets/Icons/phone.svg'
import copySvg from '../Assets/Icons/copy.svg'

import '../Styles/Pages/ShowAnnouncement.css';
import IconButton from '../Components/IconButton';
import modals from '../Modals'

const ContactSelllerPopup = ({ contacto }) => {

    const copyToClipboard = async(text) => {
        try {
            await navigator.clipboard.writeText(text);
            modals.toast("Copiado al portapapeles");
        } catch (err) {}      
    }

    const getWhatsAppLink = (number) => {
        const textNumber = number.trim().split(' ').join('');
        const text = encodeURIComponent(`Hola, te contacto de tu anuncio de La segunda mano:\n\n${window.location.href}`);
        const link = "https://wa.me/"+textNumber+'?text='+text;

        return link;
    }

    const renderButton = (con, index) => {
        switch(con.tipo){
            case "email": return <section key={contacto._id} className='a-show-contact-container'>
                    <a className='a-show-contact em-color' href={`mailto:${con.contenido}`} target='_blank'>
                        <img src={emailSvg} alt='Icono'/>
                        {con.contenido}
                    </a>
                    <IconButton className='a-show-contact-icon-btn' color='transparent' icon={copySvg} title="Copiar al portapapeles" onClick={() => copyToClipboard(con.contenido)}/>
                </section>
            case "whatsapp": return <section key={contacto._id} className='a-show-contact-container'>
                    <a key={contacto._id} className='a-show-contact wa-color' 
                        href={getWhatsAppLink(con.contenido)} target='_blank'
                    >
                        <img src={whatsappSvg} alt='Icono'/>
                        {con.contenido}
                    </a>
                    <IconButton className='a-show-contact-icon-btn' color='transparent' icon={copySvg} title="Copiar al portapapeles" onClick={() => copyToClipboard(con.contenido)}/>
                </section>
            case "phone": return <section key={contacto._id} className='a-show-contact-container'>
                    <a className='a-show-contact ph-color' href={`callto:${con.contenido}`} target='_blank'>
                        <img src={phoneSvg} alt='Icono'/>
                        {con.contenido}
                    </a>
                    <IconButton className='a-show-contact-icon-btn' color='transparent' icon={copySvg} title="Copiar al portapapeles" onClick={() => copyToClipboard(con.contenido)}/>
                </section>
        }
    }

    return (
        <div className='contact-seller-popup'>
            <h2>Contactar con el vendedor</h2>
            <p>El vendedor ha proporcionado los siguientes medios para contactarlo:</p>
            {
                contacto.map((c, index) => renderButton(c, index))
            }
        </div>
    )
}

export default ContactSelllerPopup