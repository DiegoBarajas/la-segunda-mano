import React, { useEffect, useState } from 'react'
import downArrow from '../Assets/Icons/downArrow.svg'
import Loader from './Loader';

// cols={5} array={reports} totalElements={reports.length}

const TablePaginator = ({array, cols, defaultCurrent=1, totalElements=99, maxShowing=10, isGettingData=false, handleChange=()=>{} }) => {

    const [ current, setCurrent ] = useState(parseInt(defaultCurrent));
    const total = array ? Math.ceil(totalElements / maxShowing) : 0;

    useEffect(() => {
        if(current == defaultCurrent) return;
        if( isNaN(current) || !current ) return setCurrent(defaultCurrent);
        console.log(current);
        handleChange(current)
    }, [ current ]);

    useEffect(() => {
        setCurrent(parseInt(defaultCurrent))
    }, [total]);

    const handleNext = () => {
        if( current+1 > total ) return;
        setCurrent(current+1);
    }

    const handlePrev = () => {
        if( current <= 1 ) return setCurrent(1);
        setCurrent(current-1);
    }


    return array && array.length ? (
        <tr>
            <td colSpan={cols}>
                <div className='td-paginator'>

                    <div className='table-paginator'>
                        {
                            isGettingData ?
                                <p style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '10px'}}> <Loader small/> Obteniendo información</p>
                                : null
                        }
                    </div>
                    
                    <div className='table-paginator'>


                        <p>Página {current}/{total}</p>
                        <div className='vertical-line'></div>

                        <p>Mostrando {array.length} de {totalElements} coincidencias</p>
                        <div className='vertical-line'></div>

                        
                        <section className='section-table-icon-btn'>
                            <button className={`table-icon-btn ${current <= 1 ? 'disabled-table-icon-btn' : ''}`} title='Página Anterior' onClick={handlePrev}>
                                <img className='table-btn-img prev-img' src={downArrow} alt='<'/>
                            </button>
                            
                            <button className={`table-icon-btn ${total === current ? 'disabled-table-icon-btn' : ''}`} title='Siguiente página' onClick={handleNext}>
                                <img className='table-btn-img next-img' src={downArrow} alt='>'/>
                            </button>
                        </section>

                    </div> 

                </div>           
            </td>
        </tr>
    ) : null
}

export default TablePaginator