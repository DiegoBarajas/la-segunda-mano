import React from 'react';
import Navbar from '../Fragments/Navbar';
import Footer from '../Fragments/Footer';

import '../Styles/Layouts/PageLayout.css';

const PageLayout = ({ navbar=true, footer=true, className, children }) => {
    return (
        <>
            { navbar ? <Navbar/> : <></>}

            <main 
                style={ 
                    navbar 
                        ? { marginTop: '75px', minHeight: 'calc(100vh - 75px)' } 
                        : {}
                    }
                className={`standard-layout ${className}`}
            >{children}</main>

            { footer ? <Footer/> : <></>}


        </>
    )
}

export default PageLayout