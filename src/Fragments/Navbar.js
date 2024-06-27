import React, { useState } from 'react'
import '../Styles/Fragments/Navbar.css'
import { Link } from 'react-router-dom'
import Logo from '../Components/Logo';

import ItemNavbar from '../Components/ItemNavbar';

import SearchNavbar from '../Components/SearchNavbar';
import sellSvg from '../Assets/Icons/sell.svg'
import loginSvg from '../Assets/Icons/login.svg'
import categorySvg from '../Assets/Icons/category.svg'
import createAccountSvg from '../Assets/Icons/create_account.svg'
import reportSvg from '../Assets/Icons/report.svg'
import helpSvg from '../Assets/Icons/help.svg'


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return (
        <nav className="navbar">
            <Link className='link-navbar' to='/' title="Inicio">
                <Logo className='logo-navbar' white/>
            </Link>    

            <SearchNavbar/>

            <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                {
                    isMenuOpen
                    ? <>
                        <ItemNavbar 
                            to='/'
                            icon={sellSvg} 
                            direction={isMenuOpen ? 'vertical' : 'horizontal'}
                        >Quiero vender</ItemNavbar>

                        <ItemNavbar 
                            to='/'
                            icon={categorySvg} 
                            direction={isMenuOpen ? 'vertical' : 'horizontal'}
                        >Categorias</ItemNavbar>

                        <ItemNavbar 
                            to='/' 
                            icon={loginSvg} 
                            direction={isMenuOpen ? 'vertical' : 'horizontal'}
                        >Iniciar sesión</ItemNavbar>

                        <ItemNavbar 
                            to='/' 
                            icon={createAccountSvg} 
                            direction={isMenuOpen ? 'vertical' : 'horizontal'}
                        >Crear cuenta</ItemNavbar>

                        <ItemNavbar 
                            to='/' 
                            icon={reportSvg} 
                            direction={isMenuOpen ? 'vertical' : 'horizontal'}
                        >Reportar un problema</ItemNavbar>

                        <ItemNavbar 
                            to='/' 
                            icon={helpSvg} 
                            direction={isMenuOpen ? 'vertical' : 'horizontal'}
                        >Preguntas frecuentes</ItemNavbar>
                    </>
                    : <>
                        <ItemNavbar 
                            to='/'
                            icon={sellSvg} 
                            direction={isMenuOpen ? 'vertical' : 'horizontal'}
                        >Quiero vender</ItemNavbar>

                        <ItemNavbar 
                            to='/' 
                            icon={loginSvg} 
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
    );
};



export default Navbar