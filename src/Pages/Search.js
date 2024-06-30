import React from 'react'
import { useLocation } from 'react-router-dom'

import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import Title from '../Components/Title'

const useQuery = () => {
    const query = new URLSearchParams(useLocation().search)
    const queryObject = {}

    query.forEach((value, key) => {
        queryObject[key] = value
    });

    if(queryObject.nombre)
        window.localStorage.setItem('history', JSON.stringify( updateHistory(queryObject.nombre) ));

    return queryObject;
}

const Search = () => {
    const query = useQuery();

    return (
        <PageLayout>
            <ContentLayout>
                <Title>Hola Mundo</Title>

                

            </ContentLayout>
        </PageLayout>
    )
}

export default Search

function updateHistory(nombre) {
    const history = JSON.parse(window.localStorage.getItem('history')) || [];
    const value = nombre.toUpperCase().trim();
    const index = history.findIndex(item => item.toUpperCase().trim() === value);
    
    if (index !== -1) {
        history.splice(index, 1);
        history.unshift(nombre);
    }else{
        history.unshift(nombre); 
    }

    return history;
}
  