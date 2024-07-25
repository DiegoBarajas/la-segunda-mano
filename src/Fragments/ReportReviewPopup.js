import React, { useState } from 'react'
import Button from '../Components/Button'
import Input from '../Components/Input'

import downArrowsvg from '../Assets/Icons/downArrow.svg'

import axios from 'axios'
import modals from '../Modals'
import backend from '../backend'
import constants from '../constants.json'
import '../Styles/Fragments/ReportReviewPopup.css'



const ReasonButton = ({ children, setRazon }) => {
    return (
        <section className='reason-button' title={`Reportar por ${children}`} onClick={() => setRazon(children)}>
            <p style={{ textAlign: 'start' }}><b>{children}</b></p>
            <img src={downArrowsvg} alt='Seleccionar'/>
        </section>
    )
}

const ReportReviewPopup = ({ id, type, masc=false }) => {

    const [ razon, setRazon ] = useState(null);
    const [ descripcion, setDescripcion ] = useState('');
    const [ pError, setPError ] = useState('');

    const handleSubmit = async() => {
        setPError("");

        if(descripcion === '') return setPError("Debes escribir una descripción")
        try{
            const response = await axios.post(
                `${backend}/api/report/`, 
                {
                    tipo: type,
                    id: id,
                    razon,
                    descripcion
                },{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            );

            modals.alert("Exito!", "Gracias. Tu reporte fue enviado con exito. Te mantendtemos informado", "success");
        }catch(err){
            if (err.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                modals.alert("Ups", `${err.response.data}`, 'error');
            } else if (err.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error('No se recibió respuesta del servidor:', err.request);
                modals.alert("Ha ocurrido un error", `No se recibió respuesta del servidor`, 'error');
            } else {
                // Ocurrió un error antes de enviar la solicitud
                console.error('Error al enviar la solicitud:', err.message);
                modals.alert("Ha ocurrido un error", `<b>Error al enviar la solicitud</b> ${err.message}`, 'error');
            }
        }
    }

    return !razon
            ? <div className='report-review-popup-container'>
                    <h2>Reportar {type}</h2>
                    <p>Selecciona la razón del reporte {masc ? 'del' : 'de la'} {type}:</p>

                    <section className='reasons'>
                        {
                            constants.reporte[type].map((r, index) => 
                                <ReasonButton key={r+index} setRazon={setRazon}>{r}</ReasonButton>
                            )
                        }
                    </section>
                </div> 
                
            : <div className='report-review-popup-container'>
                <h2>Reportar {type} por {razon}</h2>
                <p style={{ color: 'red', fontWeight: 500 }}>{pError}</p>

                <section className='form-report'>
                    <Input
                        placeholder='Escribe una descripción breve de tu reporte'
                        label="Descripción de tu reporte"
                        className='mt-15'
                        id='descr'
                        width='100%'
                        value={descripcion}
                        
                        textArea
                        required
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <Button width='100%' onClick={handleSubmit}>Enviar</Button>
                </section>
            </div>
}

export default ReportReviewPopup