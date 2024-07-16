import React, { useState } from 'react'
import ColumnLayout from '../Layouts/ColumnLayout'
import { useLocation } from 'react-router-dom'
import Select from '../Components/Select'
import Button from '../Components/Button'
import Input from '../Components/Input'

import filterSvg from '../Assets/Icons/filter.svg'
import quitFilterSvg from '../Assets/Icons/quitFilter.svg'

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

                {
                    isMenuOpen
                        ? <section className='filter-mobile-fields'>
                            <form>
                                <Select
                                    label="Estado"
                                    name='estado'
                                    options={constants.estados}
                                    onChange={() => setShowButton(true)}
                                />

                                <Input
                                    label="Ciudad/municipio"
                                    placeholder="Ingrese la ciudad o municipio"
                                    name='ciudad'
                                    onChange={() => setShowButton(true)}
                                />

                                <Select
                                    label="Categoria"
                                    name='categoria'
                                    options={constants.categorias}
                                    onChange={() => setShowButton(true)}
                                />

                                <Select
                                    label="Uso"
                                    name='uso'
                                    options={constants.usos}
                                    onChange={() => setShowButton(true)}
                                />

                                <Select
                                    label="Ordenar"
                                    name='ordenar'
                                    options={constants.ordenar}
                                    onChange={() => setShowButton(true)}
                                    mb='15px'
                                />

                                {
                                    showButton
                                        ? <>
                                            <Button type='submit' width='100%'>Aplicar</Button>
                                            <Button color='red' type='reset' width='100%' onClick={() => setShowButton(false)}>Limpiar filtros</Button>
                                        </>
                                        : null
                                }
                            </form>
                        </section>
                        : null
                }
            </aside>

            <ColumnLayout className='filter' verticalAlign='start'>
                <form>
                    <h2>Filtros</h2>
                    <p className='mb-25'>{parseTextFilter(query)}</p>

                    <Select
                        label="Estado"
                        name='estado'
                        options={constants.estados}
                        onChange={() => setShowButton(true)}
                    />

                    <Input
                        label="Ciudad/municipio"
                        placeholder="Ingrese la ciudad o municipio"
                        name='ciudad'
                        onChange={() => setShowButton(true)}
                    />

                    <Select
                        label="Categoria"
                        name='categoria'
                        options={constants.categorias}
                        onChange={() => setShowButton(true)}
                    />

                    <Select
                        label="Uso"
                        name='uso'
                        options={constants.usos}
                        onChange={() => setShowButton(true)}
                    />

                    <Select
                        label="Ordenar"
                        name='ordenar'
                        options={constants.ordenar}
                        onChange={() => setShowButton(true)}
                        mb='15px'
                    />

                    {
                        showButton
                            ? <>
                                <Button type='submit' width='100%'>Aplicar</Button>
                                <Button color='red' type='reset' width='100%' onClick={() => setShowButton(false)}>Limpiar filtros</Button>
                            </>
                            : null
                    }
                </form> 
            </ColumnLayout>
        </>
    )
}

export default Filter

function parseTextFilter(query) {
    if (!query) return "(Ningún filtro aplicado)";
    
    const { estado, ciudad, categoria, uso, ordenar } = query;
    let elements = [];

    if (estado && (estado !== '*')) elements.push({ bold: 'Estado', value: estado });
    if (ciudad && (ciudad !== '')) elements.push({ bold: 'Ciudad', value: ciudad });
    if (categoria && (categoria !== 'Mostrar todo')) elements.push({ bold: 'Categoria', value: categoria });
    if (uso && (uso !== '*')) elements.push({ bold: 'Uso', value: uso });
    if (ordenar && (ordenar !== 'date:asc')) elements.push({ bold: 'Ordenar', value: getTextByValue(ordenar) });

    return elements.length > 0 ? (
        <React.Fragment>
            {elements.map((element, index) => (
                index+1 === elements.length
                    ? <React.Fragment key={`filter-text-${index}`}><b>{element.bold}:</b> {element.value}.</React.Fragment>
                    : <React.Fragment key={`filter-text-${index}`}><b>{element.bold}:</b> {element.value}, </React.Fragment>
            ))}
        </React.Fragment>
    ) : (
       "(Ningún filtro aplicado)"
    );
}


function getTextByValue(value) {
    const ordenar = constants.ordenar;

    for (let i = 0; i < ordenar.length; i++) {
        if (ordenar[i].value === value) {
            console.log(ordenar[i].text);
            return ordenar[i].text;
        }
    }
    return "N/A";
}
