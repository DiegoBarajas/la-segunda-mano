import React, { useEffect, useState } from 'react'

import constants from '../constants.json'
import Button from '../Components/Button'

import addSvg from '../Assets/Icons/add.svg';
import { useLocation } from 'react-router-dom';
import Select from '../Components/Select';

import stateSvg from '../Assets/Icons/state.svg'
import clockSvg from '../Assets/Icons/clock.svg'
import orderBySvg from '../Assets/Icons/order_by.svg'
import categorySvg from '../Assets/Icons/category_black.svg'
import applySvg from '../Assets/Icons/apply.svg'
import clearSvg from '../Assets/Icons/clear.svg'




const listCategories = obtenerCategoriasAleatorias( constants.categorias.slice(1), 9 )

const useQuery = () => {
    const query = new URLSearchParams(useLocation().search)
    const queryObject = {}
    let bandera = false;

    query.forEach((value, key) => {
        queryObject[key] = value;
        bandera = true;
    });

    return bandera ? queryObject : null;
}

const CategoriesAndFilters = () => {
    
    const query = useQuery();

    const [ showButton, setShowButton ] = useState(false);
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ ciudad, setCiudad ] = useState( query && query.ciudad ? query.ciudad : '' );

    const [ showApplyBtn, setShowApplyBtn ] = useState(false);

    const [ filters, setFIlters ] = useState({
        estado: '',
        categoria: '',
        uso: '',
        ordenar: ''
    });

    const handleSelect = (e) => {
        const { name, value } = e.target;

        setFIlters({...filters, [name]: value})
        setShowApplyBtn(true);
    }

    const handleResetFilters = () => {
        setShowApplyBtn(false);
        setFIlters({
            estado: '',
            categoria: '',
            uso: '',
            ordenar: ''
        });
    }

    return (
        <form className='cat-n-filters-container' action='/buscar'>
            {/* Categotias */}
            <h4 className='subtitle-filters-container'>Categorias</h4>
            <section className='cat-container'>
                {
                    listCategories.map((c, index) => 
                        <Button title={c.text} icon={getSrc(c.text)} className="cat-btn btn-mapped" horizontal onClick={() => window.location.href = `/buscar?categoria=${c.value}`}>{c.text}</Button>
                    )
                }
                <Button icon={addSvg} className="cat-btn" horizontal onClick={() => window.location.href = `/categorias`}>Ver todas</Button>
            </section>

            {/* Filtros */}
            <section className='filters-navbar-select-zone fil-container'>
                    <Select 
                        className='filters-navbar-select' 
                        id='Estado'
                        name='estado'
                        label="Estado"
                        title="Buscar anuncios por algun estado en especifico"
                        options={constants.estados}
                        icon={stateSvg}
                        value={filters.estado}

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
                        value={filters.categoria}

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
                        value={filters.uso}

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
                        value={filters.ordenar}

                        onChange={handleSelect}
                    />
                </section>

                {
                    showApplyBtn
                    ? <div style={{ width: '100%', display: 'flex', justifyContent: 'end'}}>

                        <section className='filters-apply-button-section-2'>
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

                    </div>
                    : <></>
                }
           
        </form>
    )
}

export default CategoriesAndFilters

function obtenerCategoriasAleatorias(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num); 
}

function getSrc(value){
    try{
        return require('../Assets/Icons/'+toCamelCase(value)+'.svg');
    }catch(err){}
}

function toCamelCase(str) {
    const noPunctuation = str.replace(/(?![ñÑ])\p{P}/gu, '');
    const noAccents = noPunctuation.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const words = noAccents.split(/\s+/);
  
    const camelCaseStr = words.map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
  
    return camelCaseStr;
}