import React from 'react'
import ColumnLayout from '../Layouts/ColumnLayout'
import PageLayout from '../Layouts/PageLayout'
import Button from '../Components/Button'

import '../Styles/Pages/Categorias.css'
import constants from '../constants.json'
const Categorias = () => {

    return (
        <PageLayout>
            <ColumnLayout className='column-categories'>
                <h1>Categorias</h1>

                <section className='categorias'>
                    {
                        constants.categorias.map((c, index) => 
                            <Button icon={getSrc(c.text)} className="btn-categorias" horizontal onClick={() => window.location.href = `/buscar?categoria=${c.value}`}>{c.text}</Button>
                        )
                    }
                </section>

            </ColumnLayout>
        </PageLayout>
    )
}

export default Categorias

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
  