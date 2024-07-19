import React, { useEffect } from 'react'
import AccordionContentLayout from '../Layouts/AccordionContentLayout'
import ContentLayout from '../Layouts/ContentLayout'
import PageLayout from '../Layouts/PageLayout'

import '../Styles/Pages/PoliticasCondiciones.css'

const Condiciones = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    return (
        <PageLayout>
            <ContentLayout horizontalAlign='center' size="small" complete>
                <h1>Condiciones de uso</h1>
            </ContentLayout>


            <AccordionContentLayout defaultOpened size="small" complete titulo="1. Aceptación de los Términos" >
                <p>
                    Al acceder y utilizar el sitio web "La Segunda Mano" (en adelante, "el Sitio"), usted acepta cumplir y estar sujeto a las presentes Condiciones de Uso. Si no está de acuerdo con estos términos, por favor no utilice el Sitio.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="2. Descripción del Servicio" >
                <p>
                    "La Segunda Mano" es una plataforma en línea que permite a los usuarios publicar anuncios de productos, servicios, inmuebles, terrenos, rentas, venta de vehículos y otros artículos. Existen tres categorías de anuncios: Estándar, Impulsado y Premium, cada uno con características y duraciones específicas.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="3. Registro y Cuenta de Usuario" >
                <p>
                    Para publicar anuncios, los usuarios deben registrarse proporcionando su nombre, apellido, correo electrónico, y opcionalmente el estado en el que viven y una foto de perfil. Los usuarios son responsables de mantener la confidencialidad de su cuenta y contraseña, y de todas las actividades que ocurran bajo su cuenta.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="4. Publicación de Anuncios" >
                <p>
                    <ul style={{ marginLeft: '30px' }}>
                        <li><b>Estándar:</b> Anuncios gratuitos que duran 7 días. Los usuarios pueden publicar hasta 3 anuncios estándar por día y tener un máximo de 10 anuncios activos.</li>
                        <li><b>Impulsado:</b> Anuncios de pago que duran 30 días, sin límite de publicación o de anuncios activos, con prioridad en las búsquedas. Costo: $99 MXN.</li>
                        <li><b>Premium:</b> Anuncios de pago que duran 30 días, sin límite de publicación o de anuncios activos, con prioridad en las búsquedas y en la página principal. Costo: $199 MXN.</li>
                    </ul>
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="5. Conducta del Usuario" >
                <p>
                    Los usuarios se comprometen a no publicar anuncios que:
                    <br/>

                    <ul style={{ marginLeft: '30px' }}>
                        <li>Contengan información falsa o engañosa.</li>
                        <li>Infrinjan derechos de propiedad intelectual de terceros.</li>
                        <li>Promuevan actividades ilegales.</li>
                        <li>Ofrezcan servicios sexuales o cualquier otro tipo de contenido prohibido por la ley.</li>
                    </ul>
                    <br/>
                    <br/>
                    Los administradores del Sitio se reservan el derecho de eliminar anuncios que violen estas políticas sin reembolsar el pago.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="6. Responsabilidad" >
                <p>
                    El Sitio no se hace responsable de la veracidad de los anuncios ni de las transacciones realizadas entre usuarios. Los usuarios deben tomar sus propias precauciones al interactuar con otros miembros del Sitio.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="7. Modificaciones a los Términos" >
                <p>
                    El Sitio se reserva el derecho de modificar estas Condiciones de Uso en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en el Sitio. El uso continuado del Sitio constituye la aceptación de los términos modificados.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="8. Precios de los Anuncios" >
                <p>
                    Los precios publicados en los anuncios deben ser reales y no utilizados para llamar la atención de manera engañosa. El precio estipulado debe ser cercano al precio final tras el regateo con el cliente. En caso de incumplimiento, el usuario será penalizado.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="9. Comunicación entre Usuarios" >
                <p>
                    La plataforma no proporciona métodos directos de comunicación entre vendedores y clientes. La comunicación se realiza a través de la información que el vendedor haya compartido (correo electrónico, número de teléfono, número de WhatsApp).
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="10. Veracidad y Fraude" >
                <p>
                    Todos los anuncios deben ser veraces y no contener información fraudulenta. No se permite la venta de productos bajo falsos pretextos, como vender una laptop diciendo que es una iMac. Los fraudes están estrictamente prohibidos.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="11. Spam y Contenido Prohibido" >
                <p>
                    Está prohibido hacer spam en las reseñas y vender contenido de índole sexual o afines. Los administradores se reservan el derecho de eliminar anuncios que infrinjan estas políticas sin reembolsar el pago.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="12. Pagos y Renovaciones" >
                <p>
                Los pagos para las mejoras de los anuncios ("impulsado" y "premium") se realizan a través de la plataforma Stripe. No guardamos información bancaria, por lo que cada vez que se haga un pago es necesario ingresar la información completa. Los pagos de las mejoras no se hacen automáticamente; si se desea renovar, se puede hacer de manera ilimitada, pero debe ser manual. Una vez que acaben los 30 días, el anuncio volverá al estándar con 7 días más; en este periodo es cuando se puede volver a mejorar el anuncio.
                </p>
            </AccordionContentLayout>

            <AccordionContentLayout defaultOpened size="small" complete titulo="13. Almacenamiento de Imágenes" >
                <p>
                    Las imágenes de los anuncios se almacenan a través del servicio de un tercero, Cloudinary.
                </p>
            </AccordionContentLayout>

            <ContentLayout size="small" complete>
                <p><b>Contacto</b></p>
                <p>Si tiene alguna pregunta sobre estas Condiciones de Uso, puede contactarnos a través del correo electrónico: <a href='mailto:contacto@lasegundamano.com.mx'>contacto@lasegundamano.com.mx</a></p>
                <br/><br/>
                <p><b>Fecha de Última Actualización</b></p>
                <p>17 de julio de 2024</p>
            </ContentLayout>

        </PageLayout>
    )
}

export default Condiciones