import React, { useEffect, useState } from 'react'
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
import accountSvg from '../Assets/Icons/account.svg'
import announcementSvg from '../Assets/Icons/announcement.svg'
import favoriteSvg from '../Assets/Icons/favorite.svg'
import notificationSvg from '../Assets/Icons/notification.svg'
import logoutSvg from '../Assets/Icons/logout.svg'
import axios from 'axios';
import backend from '../backend';

const useSearchValue = () => {
    const query = new URLSearchParams(useLocation().search)
    const searchValue = query.get('nombre');

    return searchValue ? searchValue : '';
}

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ showOptions, setShowOptions ] = useState(false);
    const [ showHistory, setShowHostory ] = useState(false);
    const [ searchValue, setSearchValue ] = useState(useSearchValue());
    const [ notificationsCounter, setNotificationsCounter ] = useState(0);

    useEffect(() => {
        const getNotificationsCounter = async() => {
            try{
                const { data } = await axios.get(`${backend}/api/notification/counter`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })

                setNotificationsCounter(data.counter);
            }catch(err){
                console.error(err);
            }
        }

        if(localStorage.getItem('token')) getNotificationsCounter();
    }, []);

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
                        ? user
                            ? <>
                                <ItemNavbar 
                                    to='/perfil' 
                                    icon={user.foto ? user.foto : accountSvg} 
                                    title='Abrir mi perfil y su configuración'
                                    direction={isMenuOpen ? 'vertical' : 'horizontal'}
                                    round
                                >Mi Perfil</ItemNavbar>

                                <ItemNavbar 
                                    to='/vender'
                                    icon={sellSvg} 
                                    title='Quiero publicar producto, servicio, vehiculo o inmueble'
                                    direction={isMenuOpen ? 'vertical' : 'horizontal'}
                                >Vender</ItemNavbar>

                                <ItemNavbar 
                                    to='/perfil/anuncios' 
                                    icon={announcementSvg} 
                                    title='Ver mis anuncios publicados'
                                    direction={isMenuOpen ? 'vertical' : 'horizontal'}
                                >Mis anuncios</ItemNavbar>

                                <ItemNavbar 
                                    to='/notificaciones' 
                                    icon={notificationSvg} 
                                    title={ notificationsCounter > 0 ? `Ver mis notificaciones (${notificationsCounter})` : 'Ver mis notificaciones' }
                                    direction={isMenuOpen ? 'vertical' : 'horizontal'}
                                >{ notificationsCounter > 0 ? `Notificaciones (${notificationsCounter})` : 'Notificaciones' }</ItemNavbar>

                                <ItemNavbar 
                                    to='/favoritos' 
                                    icon={favoriteSvg} 
                                    title='Ver las publicaciones guardadas en favoritos'
                                    direction={isMenuOpen ? 'vertical' : 'horizontal'}
                                >Mis favoritos</ItemNavbar>

                                <ItemNavbar 
                                    to='/categorias'
                                    icon={categorySvg} 
                                    title='Ver un listado de todas las categorias'
                                    direction={isMenuOpen ? 'vertical' : 'horizontal'}
                                >Todas las categorias</ItemNavbar>

                                <ItemNavbar 
                                    to='/logout' 
                                    icon={logoutSvg} 
                                    title='Cerrar mi sesión'
                                    direction={isMenuOpen ? 'vertical' : 'horizontal'}
                                >Cerrar sesión</ItemNavbar>
                            </>
                            : <>   

                            <ItemNavbar 
                                to='/vender'
                                icon={sellSvg} 
                                title='Quiero publicar producto, servicio, vehiculo o inmueble'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Vender</ItemNavbar>
                            
                            <ItemNavbar 
                                to='/login' 
                                icon={loginSvg} 
                                title='Iniciar sesión'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Iniciar sesión</ItemNavbar>

                            <ItemNavbar 
                                to='/signin' 
                                icon={createAccountSvg} 
                                title='Crear una cuenta'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Crear cuenta</ItemNavbar> 

                            <ItemNavbar 
                                to='/categorias'
                                icon={categorySvg} 
                                title='Ver un listado de todas las categorias'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Todas las categorias</ItemNavbar>  

                            <ItemNavbar 
                                to='/' 
                                icon={helpSvg} 
                                title='Ver un listado de las preguntas más frecuentes'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Preguntas frecuentes</ItemNavbar>

                            <ItemNavbar 
                                to='/' 
                                icon={reportSvg} 
                                title='Reportar un problema o bug'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Reportar un problema</ItemNavbar>
                        </>
                        
                        : <>
                            <ItemNavbar 
                                to='/vender'
                                icon={sellSvg} 
                                title='Quiero publicar producto, servicio, vehiculo o inmueble'
                                direction={isMenuOpen ? 'vertical' : 'horizontal'}
                            >Quiero vender</ItemNavbar>

                            {
                                user   
                                    ? <ItemNavbar 
                                        onClick={() => setShowOptions(!showOptions)}
                                        icon={user.foto ? user.foto : accountSvg} 
                                        title='Desplegar menu de mi perfil'
                                        direction={isMenuOpen ? 'vertical' : 'horizontal'}
                                        color={showOptions ? "#1ABC9C" : ""}
                                        round
                                    >{showOptions ? "Cerrar" : "Mi Perfil"}</ItemNavbar>

                                    : <ItemNavbar 
                                        to='/login' 
                                        icon={loginSvg} 
                                        title='Iniciar sesión'
                                        direction={isMenuOpen ? 'vertical' : 'horizontal'}
                                    >Iniciar sesión</ItemNavbar>
                            }
                        </>
                    }
                </ul>
                
                <div className="navbar-toggle" onClick={toggleMenu} title={isMenuOpen ? "Cerrar menú" : "Abir menú"}>
                    <div className={`burger-line ${isMenuOpen ? 'burger-close-top' : ''}`}></div>
                    <div className="burger-line"></div>
                    <div className={`burger-line ${isMenuOpen ? 'burger-close-bottom' : ''}`}></div>

                </div>

                {
                    showOptions
                        ? <ul className='list-items-profile'>
                            <ItemNavbar 
                                        to='/perfil' 
                                        icon={accountSvg} 
                                        title='Abrir mi perfil y su configuración'
                                        direction={'vertical'}
                                        className='item-navbar-account-menu'
                            >Ver mi Perfil</ItemNavbar>

                            <ItemNavbar 
                                to='/vender'
                                icon={sellSvg} 
                                title='Quiero publicar producto, servicio, vehiculo o inmueble'
                                direction={'vertical'}
                                className='item-navbar-account-menu'
                            >Vender</ItemNavbar>

                            <ItemNavbar 
                                    to='/perfil/anuncios' 
                                    icon={announcementSvg} 
                                    title='Ver mis anuncios publicados'
                                    direction={'vertical'}
                                    className='item-navbar-account-menu'
                            >Mis anuncios</ItemNavbar>

                            <ItemNavbar 
                                    to='/notificaciones' 
                                    icon={notificationSvg} 
                                    title={ notificationsCounter > 0 ? `Ver mis notificaciones (${notificationsCounter})` : 'Ver mis notificaciones' }
                                    direction={'vertical'}
                                    className='item-navbar-account-menu'
                            >{ notificationsCounter > 0 ? `Notificaciones (${notificationsCounter})` : 'Notificaciones' }</ItemNavbar>

                            <ItemNavbar 
                                    to='/favoritos' 
                                    icon={favoriteSvg} 
                                    title='Ver las publicaciones guardadas en favoritos'
                                    direction={'vertical'}
                                    className='item-navbar-account-menu'
                            >Mis favoritos</ItemNavbar>

                            <ItemNavbar 
                                to='/categorias'
                                icon={categorySvg} 
                                title='Ver un listado de todas las categorias'
                                direction={'vertical'}
                                className='item-navbar-account-menu'
                            >Todas las categorias</ItemNavbar>

                            <ItemNavbar 
                                    to='/logout' 
                                    icon={logoutSvg} 
                                    title='Cerrar mi sesión'
                                    direction={'vertical'}
                                    className='item-navbar-account-menu'
                            >Cerrar sesión</ItemNavbar>
                        </ul>
                        : <></>
                }

            </nav>
        </form>
    );
};



export default Navbar