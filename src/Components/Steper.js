import React from 'react'
import checkIcon from '../Assets/Icons/check.svg'
import '../Styles/Components/Steper.css'

const Steper = ({steps, current=0}) => {
    return (
        <div className='steper'>
            {
                steps.map((step, index) => 
                    <section className={`step-item ${index <= current ? "current-step-item" : ''}`} key={`step-item-${index}`}>
                        <div className='step-number'>
                            {
                                index < current 
                                    ? <img src={checkIcon} alt='L'/>
                                    : <p>{index+1}</p>
                            }
                        </div>
                        { <p className={`step-description ${index === current ? 'step-description-current' : ''}`}>{step}</p> }
                    </section>
                )
            }
        </div>
    )
}

export default Steper