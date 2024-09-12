import React, { useEffect, useState } from 'react'
import Button from './Button';

import leftArrowIcon from '../Assets/Icons/leftArrow.svg'
import rigthArrowIcon from '../Assets/Icons/rigthArrow.svg'

import '../Styles/Components/Paginator.css'

const Paginator = ({ total=1, defaultCurrent=0, handleChange=()=>{} }) => {

    const [ current, setCurrent ] = useState(parseInt(defaultCurrent));
    const array = Array.from({ length: total }, (_, index) => index + 1);

    useEffect(() => {
        if(current == defaultCurrent) return;
        handleChange(current)
    }, [ current ]);

    useEffect(() => {
        setCurrent(parseInt(defaultCurrent))
    }, [total]);

    const handleNext = () => {
        if( current+2 >= total ) return;
        setCurrent(current+1);
    }

    const handlePrev = () => {
        if( current === 0 ) return;
        setCurrent(current-1);
    }

    return total > 1 ? (
        <div className="paginator">
            <section className='container-paginator-next-prev-btns'>
                <Button
                    onClick={handlePrev}
                    horizontal
                    className='btn-next-prev-paginator'
                > 
                    <img src={leftArrowIcon} alt='Anterior'/>
                    Anterior 
                </Button>

                <Button 
                    onClick={handleNext}
                    horizontal
                    className='btn-next-prev-paginator'
                > 
                    Siguiente 
                    <img src={rigthArrowIcon} alt='Siguiente' />
                </Button>
            </section>
            
            <div className="paginator-btns">

                {
                    array.map((e, i) => 
                        <Button
                            onClick={() => setCurrent(i)}
                            title={`Ir a la página ${i+1}`}
                            className={current === i ? "current-btn" : ""}
                        >
                            {i+1}
                        </Button>
                    )
                }
            </div>
        </div>
    ) : null
}

export default Paginator