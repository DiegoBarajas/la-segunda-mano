import React, { useState } from 'react'
import ColumnLayout from '../Layouts/ColumnLayout'
import { useLocation } from 'react-router-dom'
import Select from '../Components/Select'
import Button from '../Components/Button'
import Input from '../Components/Input'

import quitFilterSvg from '../Assets/Icons/quitFilter.svg'
import priceSortSvg from '../Assets/Icons/priceSort.svg'
import dateSortSvg from '../Assets/Icons/dateSort.svg'
import alfSortSvg from '../Assets/Icons/alfSort.svg'
import filterSvg from '../Assets/Icons/filter.svg'

import constants from '../constants.json'
import '../Styles/Fragments/Filter.css'

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

const Filter = () => {

    const query = useQuery();

    const [ showButton, setShowButton ] = useState(false);
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ ciudad, setCiudad ] = useState( query && query.ciudad ? query.ciudad : '' );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <aside className='filter-mobile'>
                <section className='filter-mobile-menu'>
                    <p className={isMenuOpen ? 'p-show-all-filters' : "p-not-show-all-filters"}>{parseTextFilter(query)}</p>
                    <Button horizontal icon={isMenuOpen ? quitFilterSvg : filterSvg} onClick={toggleMenu}>{isMenuOpen ? 'Ocultar' : "Filtros"}</Button>
                </section>
                
                <section className='show-order-by'>
                    <p><b>Ordenar:</b> {parseTextOrder(query)}</p>
                </section>

                {
                    isMenuOpen
                        ? <section className='filter-mobile-fields'>
                            <form>
                                <Select
                                    label="Estado"
                                    name='estado'
                                    options={constants.estados}
                                    selectedOption={ query && query.estado ? query.estado : null }
                                />

                                <Input
                                    label="Ciudad/municipio"
                                    placeholder="Ingrese la ciudad o municipio"
                                    name='ciudad'
                                    onChange={(e) =>setCiudad(e.target.value)}
                                    value={ciudad}
                                />

                                <Select
                                    label="Categoria"
                                    name='categoria'
                                    options={constants.categorias}
                                    selectedOption={ query && query.categoria ? query.categoria : null }
                                />

                                <Select
                                    label="Uso"
                                    name='uso'
                                    options={constants.usos}
                                    selectedOption={ query && query.uso ? query.uso : null }
                                />

                                <Select
                                    label="Ordenar"
                                    name='ordenar'
                                    options={constants.ordenar}
                                    selectedOption={ query && query.ordenar ? query.ordenar : null }
                                    mb='15px'
                                />
                                
                                <Button type='submit' width='100%'>Aplicar</Button>
                                <Button color='red' type='reset' width='100%' onClick={() => setCiudad('')} >Limpiar filtros</Button>
                            </form>
                        </section>
                        : null
                }
            </aside>

            <ColumnLayout className='filter' verticalAlign='start'>
                <form>
                    <h2>Filtros</h2>
                    <p>{parseTextFilter(query)}</p>
                    <section className='show-order-by'>
                        <p><b>Ordenar:</b> {parseTextOrder(query)}</p>
                    </section>

                    <Select
                        label="Estado"
                        name='estado'
                        options={constants.estados}
                        selectedOption={ query && query.estado ? query.estado : null }
                    />

                    <Input
                        label="Ciudad/municipio"
                        placeholder="Ingrese la ciudad o municipio"
                        name='ciudad'
                        onChange={(e) =>setCiudad(e.target.value)}
                        value={ciudad}
                    />

                    <Select
                        label="Categoría"
                        name='categoria'
                        options={constants.categorias}
                        selectedOption={ query && query.categoria ? query.categoria : null }
                    />

                    <Select
                        label="Uso"
                        name='uso'
                        options={constants.usos}
                        selectedOption={ query && query.uso ? query.uso : null }
                    />

                    <Select
                        label="Ordenar"
                        name='ordenar'
                        options={constants.ordenar}
                        selectedOption={ query && query.ordenar ? query.ordenar : null }
                        mb='15px'
                    />
                    
                    <Button type='submit' width='100%'>Aplicar</Button>
                    <Button color='red' type='reset' width='100%' onClick={() => setCiudad('')} >Limpiar filtros</Button>
                           
                </form> 
            </ColumnLayout>
        </>
    )
}

export default Filter

function parseTextFilter(query) {
    if (!query) return "(Ningún filtro aplicado)";
    
    const { estado, ciudad, categoria, uso } = query;
    let elements = [];

    if (estado && (estado !== '*')) elements.push({ bold: 'Estado', value: estado });
    if (ciudad && (ciudad !== '')) elements.push({ bold: 'Ciudad', value: ciudad });
    if (categoria && (categoria !== 'Mostrar todo')) elements.push({ bold: 'Categoría', value: categoria });
    if (uso && (uso !== '*')) elements.push({ bold: 'Uso', value: uso });

    return elements.length > 0 ? (
        <React.Fragment>
            {elements.map((element, index) => (
                index+1 === elements.length
                    ? <React.Fragment key={`filter-text-${index}`}><b>{element.bold}:</b> {element.value}</React.Fragment>
                    : <React.Fragment key={`filter-text-${index}`}><b>{element.bold}:</b> {element.value}, </React.Fragment>
            ))}
        </React.Fragment>
    ) : (
       "(Ningún filtro aplicado)"
    );
}

function parseTextOrder(query){
    if (!query) return "Mas reciente primero";

    const {ordenar} = query;
    if( ordenar ) {
        return getTextByValue(ordenar);
    }

    return "Mas reciente primero"
}

function getTextByValue(value) {
    const ordenar = constants.ordenar;

    for (let i = 0; i < ordenar.length; i++) {
        if (ordenar[i].value === value) {
            return ordenar[i].text;
        }
    }
    return "N/A";
}
