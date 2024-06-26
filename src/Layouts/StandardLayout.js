import React, { Children } from 'react';
import '../Styles/Layouts/StandardLayout.css';
import Navbar from '../Fragments/Navbar';
import Footer from '../Fragments/Footer';

const StandardLayout = ({ navbar=true, footer=true, children }) => {
    return (
        <>
            { navbar ? <Navbar/> : <></>}

            <main 
                style={ 
                    navbar 
                        ? { marginTop: '75px', minHeight: 'calc(100vh - 75px)' } 
                        : {}
                    } 
                className='standard-layout'
            >{children}</main>

            { footer ? <Footer/> : <></>}


        </>
    )
}

export default StandardLayout