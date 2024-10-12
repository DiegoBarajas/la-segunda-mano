import React, { useEffect } from 'react'
import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout';
import AccordionContentLayout from '../Layouts/AccordionContentLayout';
import { Link } from 'react-router-dom';

const FAQ = () => {
    document.title = 'La Segunda Mano - Preguntas Frecuentes ';
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    return (
        <PageLayout>

            <ContentLayout horizontalAlign='center' size="small" complete>
                <h1>Preguntas Frecuentes</h1>
            </ContentLayout>

            <AccordionContentLayout size="small" complete titulo="¿Cómo abrir una cuenta?" >
                <p>
                    Para abrir una cuenta en <b>LaSegundaMano.com.mx</b> sigue los siguientes pasos:
                    <br/>
                    <ol style={{ marginLeft: '30px', marginTop: '10px' }}>
                        <li>Ir a la pestaña <Link to='/signin' target='__blank'>/signin</Link></li>
                        <li>Llenar los campos que se piden (nombre, apellido, correo electrónico y contraseña).</li>
                        <li>En el correo ingresado llegará un código de 6 caracteres, ingresarlo en el campo de texto.</li>
                        <li><b>[Opcional]</b> Agregar una foto de perfil y/o estado de la republica.</li>
                    </ol>
                </p>
            </AccordionContentLayout>


            <AccordionContentLayout size="small" complete titulo="¿Cómo publicar un anuncio?" >
                <p>
                    Para publicar un anuncio en <b>LaSegundaMano.com.mx</b> sigue los siguientes pasos:
                    <br/>
                    <ol style={{ marginLeft: '30px', marginTop: '10px' }}>
                        <li>Tener la sesión iniciada (En caso de no tener una cuenta ver pregunta anterior). <Link to='/login' target='__blank'>Inicia sesión aquí</Link>.</li>
                        <li>Ir a la pestaña <Link to='/vender' target='__blank'>/vender</Link></li>
                        <li>Seleccionar el tipo de anuncio en caso de no saber hasta abajo hacer click en el texto "<i>¿Qué categoría es mi producto/servicio?</i>".</li>
                        <li>Llenar los campos que se solicitan, estos pueden variar en función al tipo de anuncio. <b>NOTA: Los campos marcados con un asterisco son obligatorios</b>.</li>
                        <li>Repetir paso 4 hasta el punto <u>"Contacto y entrega"</u>. Aquí debes agregar las formas como los compradores pueden comunicarse contigo. </li>
                        <li>mas abajo debes definir donde entregas, hay algunos campos que requieren especificar, responde lo que se pida.</li>
                        <li>Acepta los términos y condiciones y presiona enviar</li>
                    </ol>
                </p>
            </AccordionContentLayout>


            <AccordionContentLayout size="small" complete titulo="¿Cómo comprar?" >
                <p>
                    Haz click en la publicación que te interese, y presiona el botón que dice "<i><u>Contactar con el vendedor</u></i>". Selecciona el medio de contacto que prefieras (esto varia según la publicación). Ponte de acuerdo con el vendedor y listo!
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout size="small" complete titulo="¿Cómo mejorar mi anuncio?" >
                <p>
                    
                </p>
            </AccordionContentLayout>


        </PageLayout>
    )
}

export default FAQ