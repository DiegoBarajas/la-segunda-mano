import React, { useState } from 'react'
import '../Styles/Fragments/Navbar.css'
import { Link } from 'react-router-dom'
import Logo from '../Components/Logo';

import sellSvg from '../Assets/Icons/sell.svg'
import loginSvg from '../Assets/Icons/login.svg'
import ItemNavbar from '../Components/ItemNavbar';
import SearchNavbar from '../Components/SearchNavbar';

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
            </ul>
            
            <div className="navbar-toggle" onClick={toggleMenu} title={isMenuOpen ? "Cerrar menú" : "Abir menú"}>
                {
                    !isMenuOpen ? <>
                        <div className="burger-line"></div>
                        <div className="burger-line"></div>
                    </> : <></>
                }
                <div className="burger-line"></div>
            </div>

        </nav>
    );
};



export default Navbar