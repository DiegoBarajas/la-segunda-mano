import React, {useState } from 'react'
import ReportReviewPopup from './ReportReviewPopup';
import ContentLayout from '../Layouts/ContentLayout'
import Button from '../Components/Button';

import allAnnoucementsSvg from '../Assets/Icons/allAnnoucements.svg'
import puntuationSvg from '../Assets/Icons/puntuation.svg'
import userSvg from '../Assets/Icons/userBlack.svg'
import reportSvg from '../Assets/Icons/report.svg'

import '../Styles/Pages/ShowAnnouncement.css';
import modals from '../Modals';

const SellerShowAnn = ({author, mio}) => {

    const [ redirect, setRedirect ] = useState(null);

    const handleReport = () => {
        if(!localStorage.getItem('token')) return modals.toast("Para levantar un reporte, necesitas iniciar sesión", 'error', 4)

        modals.popup(
            <ReportReviewPopup id={author.sellerId} type="vendedor" masc />, 
            'report-review-popup',
            "Cancelar",
        );
    }

    return author ? (
        <ContentLayout redirect={redirect}>
            <h2 className='h2-information-annoucement'>{mio ? 'Vendido por mi' : 'Vendido por'}</h2>
            <section className='ann-seller-section'>
                <section className='ann-seller-section-img'>
                    <img src={author.foto ? author.foto : userSvg} alt='Foto del vendedor'/>
                </section>

                <section className='ann-seller-section-info'>

                    <h3>{author.nombre} {author.apellido}</h3>
                    <section className='ann-seller-section-info-punt'>
                        <img src={puntuationSvg} alt='Puntuación' />
                        <p><b>Puntuación:</b> {author.calificacion} Estrellas ({author.evaluadores} reseñas)</p>
                    </section>
                            
                </section>

                {
                    mio
                        ? (
                            <section className='ann-seller-section-btns'>

                                <Button 
                                    icon={allAnnoucementsSvg}
                                    width='100%'
                                    className='ann-seller-section-btn'
                                    onClick={() => setRedirect(`/perfil/anuncios`)}
                                >Ver todos mis anuncios</Button>                            
                            </section>
                        ) : (
                            <section className='ann-seller-section-btns'>
                                <Button 
                                    color='red' 
                                    icon={reportSvg}
                                    width='49.5%'
                                    className='ann-seller-section-btn'

                                    onClick={handleReport}
                                >Reportar vendedor</Button>

                                <Button 
                                    icon={allAnnoucementsSvg}
                                    width='49.5%'
                                    className='ann-seller-section-btn'
                                    onClick={() => setRedirect(`/vendedor/${author.sellerId}`)}
                                >Mostrar todos los anuncios del vendedor</Button>                            
                            </section>
                        )
                }
            </section>
        </ContentLayout>
    ) : (
        <ContentLayout>
            <h2 className='h2-information-annoucement'>Vendido por</h2>
            <section className='ann-seller-section'>
                <section className='ann-seller-section-img'>
                    <img src={userSvg} alt='Foto del vendedor' className='loading-image progress'/>
                </section>

                <section className='ann-seller-section-info'>

                    <div className='div-loading-content' style={{ width: 'min(100%, 500px)' }}></div>
                    <div className='div-loading-content' style={{ width: 'min(50%, 400px)' }}></div>
                           
                </section>
            </section>
        </ContentLayout>
    )
}

export default SellerShowAnn