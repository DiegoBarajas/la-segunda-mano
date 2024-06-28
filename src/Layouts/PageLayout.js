import React from 'react';
import '../Styles/Layouts/PageLayout.css';
import Navbar from '../Fragments/Navbar';
import Footer from '../Fragments/Footer';

const PageLayout = ({ navbar=true, footer=true, children }) => {
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

export default PageLayout