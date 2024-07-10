import React, { useEffect, useState } from 'react'
import '../Styles/Fragments/HistoryNavbar.css'

import ItemHistory from '../Components/ItemHistory'
import Select from '../Components/Select';
import Button from '..//Components/Button'

import stateSvg from '../Assets/Icons/state.svg'
import clockSvg from '../Assets/Icons/clock.svg'
import orderBySvg from '../Assets/Icons/order_by.svg'
import categorySvg from '../Assets/Icons/category_black.svg'
import applySvg from '../Assets/Icons/apply.svg'
import clearSvg from '../Assets/Icons/clear.svg'


import constants from '../constants.json'

const HistoryNavbar = ({visible, handleClose}) => {

    const [ history, setHistory ] = useState([]);
    const [ showApplyBtn, setShowApplyBtn ] = useState(false);

    const [ filters, setFIlters ] = useState({
        estado: '',
        categoria: '',
        uso: '',
        ordenar: ''
    });


    useEffect(() => {
        const getHistory = () => {
            setHistory(window.localStorage.getItem('history') ? JSON.parse(window.localStorage.getItem('history')) : [])
        }

        getHistory()
    }, []);

    const handleResetFilters = () => {
        setShowApplyBtn(false);
        setFIlters({
            estado: '',
            categoria: '',
            uso: '',
            ordenar: ''
        });
    }

    const handleSelect = (e) => {
        const { name, value } = e.target;

        setFIlters({...filters, [name]: value})
        setShowApplyBtn(true);
    }
    
    return (<>
            <div className={visible ? 'history-navbar-background' : 'none'} onClick={handleClose} title='Cerrar historial'></div>
            <section className={visible ? 'history-navbar' : 'history-navbar invisible'}>
                <p onClick={handleClose} title='Cerrar historial' className='p-close-history'>Cerrar</p>
                <section className='filters-navbar-select-zone'>
                    <Select 
                        className='filters-navbar-select' 
                        id='Estado'
                        name='estado'
                        label="Estado"
                        title="Buscar anuncios por algun estado en especifico"
                        options={constants.estados}
                        icon={stateSvg}
                        value={filters.state}

                        onChange={handleSelect}
                    />
                    <Select 
                        className='filters-navbar-select' 
                        id='Categoria' 
                        name='categoria'
                        label="Categoria"
                        title="Buscar anuncios con una categoria en especifico"
                        options={constants.categorias}
                        icon={categorySvg}
                        value={filters.category}

                        onChange={handleSelect}
                    />
                    <Select 
                        className='filters-navbar-select' 
                        id='Uso' 
                        name='uso'
                        label="Uso"
                        title="Buscar anuncios por un uso en especifico"
                        options={constants.usos}
                        icon={clockSvg}
                        value={filters.usage}

                        onChange={handleSelect}
                    />
                    <Select 
                        className='filters-navbar-select' 
                        id='Ordenar' 
                        name='ordenar'
                        label="Ordenar por"
                        title="Ordenar resultados de una manera en especifico"
                        options={constants.ordenar}
                        icon={orderBySvg}
                        value={filters.orderBy}

                        onChange={handleSelect}
                    />
                </section>

                {
                    showApplyBtn
                    ? <section className='filters-apply-button-section'>
                        <Button
                            title="Borrar filtros"
                            icon={clearSvg}
                            color='red'
                            width='49.5%'
                            horizontal
                            type='reset'

                            onClick={handleResetFilters}
                        >Borrar filtros</Button>

                        <Button
                            horizontal
                            title="Aplicar y buscar"
                            icon={applySvg}
                            width='49.5%'

                            type='submit'
                        >Aplicar y buscar</Button>
                    </section>
                    : <></>
                }

                {
                    history.slice(0, 10).map((item, index) => <ItemHistory key={'ItemHistory'+index}>{item}</ItemHistory>)
                }

            </section>
        </>
    )
}

export default HistoryNavbar