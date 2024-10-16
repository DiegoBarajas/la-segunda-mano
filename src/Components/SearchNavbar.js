import React from 'react'
import '../Styles/Components/SearchNavbar.css'
import IconButton from './IconButton'

import searchSvg from '../Assets/Icons/search.svg'

const SearchNavbar = ({onFocus, onBlur, value, onChange}) => {

    return (
        <section className='search-navbar'>
            <input 
                className='input-search-navbar' 
                type='search'
                placeholder='Busca productos, características o categorías'
                title='Busca productos, características o categorías'
                name='nombre'
                value={value}
                onChange={onChange}

                onFocus={onFocus}
                onBlur={onBlur}
            />
            <IconButton 
                icon={searchSvg} 
                alt="Buscar" 
                title="Buscar" 
                type='submit'
                style={{ width: '43px', height: '43px', position: 'absolute', right: '-30px' }}
            />
        </section>
    )
}

export default SearchNavbar