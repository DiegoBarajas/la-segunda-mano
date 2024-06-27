import React, { useEffect, useState } from 'react'
import '../Styles/Fragments/HistoryNavbar.css'
import ItemHistory from '../Components/ItemHistory'
import Select from '../Components/Select';

import constants from '../constants.json'

const HistoryNavbar = ({visible, handleClose}) => {

    const [ history, setHistory ] = useState([]);

    useEffect(() => {
        const getHistory = () => {
            setHistory(window.localStorage.getItem('history') ? JSON.parse(window.localStorage.getItem('history')) : [])
        }

        getHistory()
    }, [false]);
    
    return (<>
            <div className={visible ? 'history-navbar-background' : 'none'} onClick={handleClose} title='Cerrar historial'></div>
            <section className={visible ? 'history-navbar' : 'history-navbar invisible'}>
                <p onClick={handleClose} title='Cerrar historial' className='p-close-history'>Cerrar</p>
                <section className='filters-navbar-select-zone'>
                    <Select 
                        className='filters-navbar-select' 
                        id='Estado'
                        label="Estado" 
                        options={constants.estados}
                    />
                    <Select 
                        className='filters-navbar-select' 
                        id='Categoria' 
                        label="Categoria" 
                        options={constants.categorias}
                    />
                    <Select 
                        className='filters-navbar-select' 
                        id='Uso' 
                        label="Uso" 
                        options={constants.usos}
                    />
                    <Select 
                        className='filters-navbar-select' 
                        id='Ordenar' 
                        label="Ordenar por" 
                        options={constants.ordenar}
                    />
                </section>

                {
                    history.slice(0, 12).map((item, index) => <ItemHistory key={'ItemHistory'+index}>{item}</ItemHistory>)
                }

            </section>
        </>
    )
}

export default HistoryNavbar