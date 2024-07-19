import React, { useEffect } from 'react'
import AccordionContentLayout from '../Layouts/AccordionContentLayout'
import ContentLayout from '../Layouts/ContentLayout'
import PageLayout from '../Layouts/PageLayout'

import '../Styles/Pages/PoliticasCondiciones.css'

const Politicas = () => {
    document.title = 'La Segunda Mano - Politicas de privacidad';
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    return (
        <PageLayout>
            <ContentLayout horizontalAlign='center' size="small" complete>
                <h1>Póliticas de privacidad</h1>
            </ContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="1. Recopilación de Información" >
                <p>
                    Recopilamos la siguiente información personal de los usuarios:
                    <br/>
                    <ul style={{ marginLeft: '30px' }}>
                        <li>Nombre y apellido.</li>
                        <li>Correo electrónico.</li>
                        <li>Estado en el que viven (opcional).</li>
                        <li>Foto de perfil (opcional).</li>
                    </ul>
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="2. Uso de la Información" >
                <p>
                    La información personal recopilada se utiliza para:
                    <br/>
                    <ul style={{ marginLeft: '30px' }}>
                        <li>Permitir la creación y gestión de cuentas de usuario.</li>
                        <li>Facilitar la publicación y administración de anuncios.</li>
                        <li>Mejorar nuestros servicios y la experiencia del usuario.</li>
                        <li>Comunicarnos con los usuarios sobre actualizaciones, promociones y otros temas relacionados con el Sitio.</li>
                    </ul>
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="3. Protección de la Información" >
                <p>
                    Implementamos medidas de seguridad adecuadas para proteger la información personal de los usuarios contra acceso no autorizado, alteración, divulgación o destrucción.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="4. Divulgación de Información a Terceros" >
                <p>
                    No vendemos, intercambiamos ni transferimos de otro modo a terceros su información personal, excepto en los siguientes casos:
                    <br/>
                    <ul style={{ marginLeft: '30px' }}>
                        <li>Cuando sea requerido por la ley.</li>
                        <li>Para proteger nuestros derechos, propiedad o seguridad, así como los de nuestros usuarios u otros.</li>
                        <li>Con proveedores de servicios de confianza que nos ayudan a operar el Sitio, siempre y cuando estas partes acuerden mantener esta información confidencial.</li>
                    </ul>
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="5. Derechos del Usuario" >
                <p>
                    Los usuarios tienen derecho a acceder, rectificar y eliminar su información personal en cualquier momento. Para ejercer estos derechos, pueden contactar al equipo de soporte del Sitio.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="6. Cambios en la Política de Privacidad" >
                <p>
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en el Sitio. El uso continuado del Sitio constituye la aceptación de la política modificada.
                </p>
            </AccordionContentLayout>

            <ContentLayout size="small" complete>
                <p><b>Contacto</b></p>
                <p>Si tiene alguna pregunta sobre estas Políticas de Privacidad, puede contactarnos a través del correo electrónico: <a href='mailto:contacto@lasegundamano.com.mx'>contacto@lasegundamano.com.mx</a></p>
                <br/><br/>
                <p><b>Fecha de Última Actualización</b></p>
                <p>17 de julio de 2024</p>
            </ContentLayout>

        </PageLayout>
    )
}

export default Politicas