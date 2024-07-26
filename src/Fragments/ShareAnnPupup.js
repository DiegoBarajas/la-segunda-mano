import React from 'react'

import whatsappSvg from '../Assets/Icons/whatsapp.svg'
import twitterSvg from '../Assets/Icons/twitter.svg'
import facebookSvg from '../Assets/Icons/facebook.svg'
import emailSvg from '../Assets/Icons/email.svg'
import copySvg from '../Assets/Icons/copy.svg'

import '../Styles/Pages/ShowAnnouncement.css';
import IconButton from '../Components/IconButton';
import modals from '../Modals'

const ShareAnnPupup = (annoucement) => {
    const ann = annoucement.annoucement;
    const link = `https://lasegundamano.com.mx/anuncio/${ann._id}`

    const copyToClipboard = async (text) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                modals.toast("Copiado al portapapeles");
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";  // Evita que el textarea sea visible en la pantalla
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.width = "2em";
                textArea.style.height = "2em";
                textArea.style.padding = "0";
                textArea.style.border = "none";
                textArea.style.outline = "none";
                textArea.style.boxShadow = "none";
                textArea.style.background = "transparent";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    modals.toast("Copiado al portapapeles");
                } catch (err) {
                    modals.toast("Error al copiar al portapapeles", 'error');
                    console.error(err);
                }
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const parseToUri = (txt) => {
        const urlComponent = encodeURIComponent(txt);
        return urlComponent
    }

    return (
        <div className='contact-seller-popup'>
            <h2>Compartir anuncio</h2>

            <p>Selecciona como quieres compartir el anuncio:</p>

            <section className='a-show-contact-button' onClick={() => copyToClipboard(link)}>
                <img src={copySvg} alt='Icono'/>
                Copiar link al portapapeles
            </section>
            
            <section className='a-show-contact-container'>
                <a className='a-show-contact em-color' href={`mailto:?subject=${parseToUri(ann.titulo)}&body=${link}`} target='_blank'>
                    <img src={emailSvg} alt='Icono'/>
                    Compartir por correo electronico
                </a>
                <IconButton className='a-show-contact-icon-btn' color='transparent' icon={copySvg} title="Copiar al portapapeles" onClick={() => copyToClipboard(`mailto:?subject=${parseToUri(ann.titulo)}&body=${link}`)}/>
            </section>
            
            <section className='a-show-contact-container'>
                <a className='a-show-contact wa-color' href={`https://wa.me/?text=${parseToUri(ann.titulo+'\n\n'+link)}`} target='_blank'>
                    <img src={whatsappSvg} alt='Icono'/>
                    Compartir por WhatsApp
                </a>
                <IconButton className='a-show-contact-icon-btn' color='transparent' icon={copySvg} title="Copiar al portapapeles" onClick={() => copyToClipboard(`https://wa.me/?text=${parseToUri(ann.titulo+'\n\n'+link)}`)}/>
            </section>

            <section className='a-show-contact-container'>
                <a className='a-show-contact fb-color' href={`http://www.facebook.com/sharer.php?u=${link}`} target='_blank'>
                    <img src={facebookSvg} alt='Icono'/>
                    Compartir por Facebook
                </a>
                <IconButton className='a-show-contact-icon-btn' color='transparent' icon={copySvg} title="Copiar al portapapeles" onClick={() => copyToClipboard(`http://www.facebook.com/sharer.php?u=${link}`)}/>
            </section>

            <section className='a-show-contact-container'>
                <a className='a-show-contact tw-color' href={`https://x.com/intent/tweet?text=${parseToUri(ann.titulo)}&url=${link}&hashtags=lasegundamano`} target='_blank'>
                    <img src={twitterSvg} alt='Icono'/>
                    Compartir por X (Twitter)
                </a>
                <IconButton className='a-show-contact-icon-btn' color='transparent' icon={copySvg} title="Copiar al portapapeles" onClick={() => copyToClipboard(`https://x.com/intent/tweet?text=${parseToUri(ann.titulo)}&url=${link}&hashtags=lasegundamano`)}/>
            </section>

        </div>
    )
}

export default ShareAnnPupup