import React from 'react'
import '../Styles/Components/SearchNavbar.css'
import IconButton from './IconButton'

import searchSvg from '../Assets/Icons/search.svg'

const SearchNavbar = ({onFocus, onBlur}) => {


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className='search-navbar' onSubmit={handleSubmit}>
            <input 
                className='input-search-navbar' 
                type='search'
                placeholder='Busca productos, caracteristicas o categorias'
                title='Busca productos, caracteristicas o categorias'
                name='busqueda'

                onFocus={onFocus}
                onBlur={onBlur}
            />
            <IconButton 
                icon={searchSvg} 
                alt="Buscar" 
                title="Buscar" 
                style={{ width: '43px', height: '43px', position: 'absolute', right: '-30px' }}/>
        </form>
    )
}

export default SearchNavbar