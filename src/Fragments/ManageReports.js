import React, { useEffect, useState } from 'react'
import AccordionContentLayout from '../Layouts/AccordionContentLayout'
import Loader from '../Components/Loader';
import backend from '../backend';
import axios from 'axios';
import modals from '../Modals';
import ReportItem from './ReportItem';
import TablePaginator from '../Components/TablePaginator';
import Input from '../Components/Input';
import Select from '../Components/Select';

import constants from '../constants.json'

const ManageReports = () => {

  const [ reports, setReports ] = useState(null);
  const [ totalReports, setTotalReports ] = useState(0);
  const [ gettingData, setGettingData ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ textSearch, setTextSearch ] = useState('');
  const [ filterTipo, setFilterTipo ] = useState('');
  const [ filterEstado, setFilterEstado ] = useState('');
  const [ ordenarPor, setOrdenarPor ] = useState('');

  useEffect(() => {
    getReports();
  }, [page, textSearch, filterTipo, filterEstado, ordenarPor]);

  const onChangePage = async(page) => {
    setGettingData(true)
    setPage(page);
  }

  async function getReports(){
    try {
      const prevTotalReports = totalReports;
      const response = await axios.get(`${backend}/api/report?page=${page}&search=${textSearch}&tipo=${filterTipo}&estado=${filterEstado}&ordenar=${ordenarPor}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
      });

      setGettingData(false);
      setReports(response.data.reports);
      setTotalReports(response.data.totalReports);
      
      if(prevTotalReports !== response.data.totalReports) setPage(1);
        
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


  return (
    <AccordionContentLayout complete titulo="Administrar Reportes">

      <table className='table-reports'>
        <thead>
          <tr>
            <th colSpan={6}>
              <div className='filters-table' style={{ paddingTop: '20px' }}>
                <Input
                  id="buscar-input"
                  label='Buscar:'
                  width='40%'
                  className='input-filters-table'
                  placeholder="Buscar por Folio, ID de Usuario/publicación/reporte o razón"
                  title="Buscar por Folio, ID de Usuario/publicación/reporte o razón"
                  value={textSearch}

                  onChange={(e) => setTextSearch(e.target.value)}
                />

                <Select
                  options={constants.orderFilterTable}
                  className='input-filters-table'
                  id='filter-ordenar'
                  width='20%'
                  onChange={(e) => setOrdenarPor(e.target.value)}
                  
                  label="Ordenar:"
                />

                <Select
                  options={constants.filterEstado}
                  className='input-filters-table'
                  id='filter-estado'
                  width='15%'
                  onChange={(e) => setFilterEstado(e.target.value)}
                  
                  label="Estado:"
                />

                <Select
                  options={constants.filterTipo}
                  className='input-filters-table'
                  id='filter-tipo'
                  width='15%'
                  onChange={(e) => setFilterTipo(e.target.value)}
                  
                  label="Tipo:"
                />
              </div>
            </th>
          </tr>


          <tr>
            <th className='table-head-field'>Folio</th>
            <th className='table-head-field'>Fecha de creación</th>
            <th className='table-head-field'>Razón</th>
            <th className='table-head-field'>Descripción</th>
            <th className='table-head-field'>Estado</th>
            <th className='table-head-field'>Tipo</th>
          </tr>
        </thead>

        <tbody>
          {
            reports 
              ? reports.length > 0 ? (
                reports.map((r, index) => 
                  <ReportItem report={r} key={'row-'+index}/>
                )
              ): <tr>
                  <td colSpan={6}>
                    <p style={{ width: '100%', textAlign: 'center', margin: '25px' }}>No se encontraron coincidencias con la búsqueda.</p>
                  </td>
                </tr>
              : (
                <tr>
                  <td colSpan={6}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 5, margin: '25px' }}>
                      <Loader/>
                      <p style={{ textAlign: 'center' }}>Cargando contenido...</p>
                    </div>
                  </td>
                </tr>
              )
          }
          <TablePaginator defaultCurrent={page} cols={6} array={reports} totalElements={totalReports} maxShowing={20} handleChange={onChangePage} isGettingData={gettingData}/>


        </tbody>
      </table>

    </AccordionContentLayout>
  )
}

export default ManageReports

