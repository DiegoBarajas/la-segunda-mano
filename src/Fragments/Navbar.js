import React, { useState } from 'react'
import '../Styles/Fragments/Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Components/Logo';

import ItemNavbar from '../Components/ItemNavbar';
import SearchNavbar from '../Components/SearchNavbar';
import HistoryNavbar from './HistoryNavbar';

import sellSvg from '../Assets/Icons/sell.svg'
import loginSvg from '../Assets/Icons/login.svg'
import categorySvg from '../Assets/Icons/category.svg'
import createAccountSvg from '../Assets/Icons/create_account.svg'
import reportSvg from '../Assets/Icons/report.svg'
import helpSvg from '../Assets/Icons/help.svg'

const useSearchValue = () => {
    const query = new URLSearchParams(useLocation().search)
    const searchValue = query.get('nombre');

    return searchValue ? searchValue : '';
}

const Navbar = () => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ showHistory, setShowHostory ] = useState(false);
    const [searchValue, setSearchValue] = useState(useSearchValue());

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <form action='/buscar'>
            <HistoryNavbar 
                visible={showHistory}
                handleClose={() => setShowHostory(false)}
            />

            <nav className="navbar">
                <Link className='link-navbar' to='/' title="Inicio">
                    <Logo className='logo-navbar' white/>
                </Link>    

                <SearchNavbar
                    onFocus={() => setShowHostory(true)}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />

                <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    {
                        isMenuOpen
                        ? <>
                            <ItemNavbar 
                                to='/'
                                icon={sellSvg} 
                                title='Quiero publicar producto, servicio, vehiculo o inmueble'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Quiero vender</ItemNavbar>

                            <ItemNavbar 
                                to='/'
                                icon={categorySvg} 
                                title='Ver un listado de todas las categorias'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Categorias</ItemNavbar>

                            <ItemNavbar 
                                to='/login' 
                                icon={loginSvg} 
                                title='Iniciar sesión'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Iniciar sesión</ItemNavbar>

                            <ItemNavbar 
                                to='/' 
                                icon={createAccountSvg} 
                                title='Crear una cuenta'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Crear cuenta</ItemNavbar>

                            <ItemNavbar 
                                to='/' 
                                icon={reportSvg} 
                                title='Reportar un problema o bug'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Reportar un problema</ItemNavbar>

                            <ItemNavbar 
                                to='/' 
                                icon={helpSvg} 
                                title='Ver un listado de las preguntas más frecuentes'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Preguntas frecuentes</ItemNavbar>
                        </>
                        : <>
                            <ItemNavbar 
                                to='/'
                                icon={sellSvg} 
                                title='Quiero publicar producto, servicio, vehiculo o inmueble'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Quiero vender</ItemNavbar>

                            <ItemNavbar 
                                to='/login' 
                                icon={loginSvg} 
                                title='Iniciar sesión'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Iniciar sesión</ItemNavbar>
                        </>
                    }
                </ul>
                
                <div className="navbar-toggle" onClick={toggleMenu} title={isMenuOpen ? "Cerrar menú" : "Abir menú"}>
                    <div className={`burger-line ${isMenuOpen ? 'burger-close-top' : ''}`}></div>
                    <div className="burger-line"></div>
                    <div className={`burger-line ${isMenuOpen ? 'burger-close-bottom' : ''}`}></div>

                </div>

            </nav>
        </form>
    );
};



export default Navbar