import React, { useEffect, useState } from 'react'
import AccordionContentLayout from '../Layouts/AccordionContentLayout'
import Loader from '../Components/Loader';
import backend from '../backend';
import axios from 'axios';
import modals from '../Modals';
import ReportItem from './ReportItem';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';

const ManageReports = () => {

  const [ reports, setReports ] = useState(null);

  useEffect(() => {
    async function getReports(){
      try {

        const response = await axios.get(`${backend}/api/report`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
        });
        
        setReports(response.data);
      }catch(err){
          if (err.response) {
              // El servidor respondió con un código de estado fuera del rango 2xx
              console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
              modals.toast(err.response.data, 'error');
              //Modals.alert("Ups", `<b>[${err.response.status}]</b> ${err.response.data}`, 'error');
          } else if (err.request) {
              // La solicitud fue hecha pero no se recibió respuesta
              console.error('No se recibió respuesta del servidor:', err.request);
              modals.toast(`No se recibió respuesta del servidor`, 'error');
          } else {
              // Ocurrió un error antes de enviar la solicitud
              console.error('Error al enviar la solicitud:', err.message);
              modals.toast(`Error al enviar la solicitud: ${err.message}`, 'error');
          }
      }
    }

    getReports();
  }, []);

  return (
    <AccordionContentLayout complete titulo="Administrar Reportes">
      {
        reports 
          ? reports.length > 0 ? (
            reports.map((r, index) => 
              <ReportItem report={r}/>
            )
          ): <p style={{ width: '100%', textAlign: 'center' }}>Por el momento no hay reportes pendientes.</p>
          : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Loader/>
              <p>Cargando reportes, espere un momento...</p>
            </div>
          )
      }
      <Link style={{ marginTop: '20px' }} to='/reports'> <Button>Ver todo</Button> </Link>
    </AccordionContentLayout>
  )
}

export default ManageReports

