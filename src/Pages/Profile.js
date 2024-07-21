import React, { useEffect, useState } from 'react'

import deleteWhiteSvg from '../Assets/Icons/deleteWhite.svg'
import accountSvg from '../Assets/Icons/account.svg'
import emailSvg from '../Assets/Icons/email.svg'
import editSvg from '../Assets/Icons/edit.svg'
import stateSvg from '../Assets/Icons/state.svg'

import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import Title from '../Components/Title'

import '../Styles/Pages/Profile.css';
import Button from '../Components/Button'

const Profile = () => {
    document.title = 'La Segunda Mano - Mi perfil';
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    const [ redirect, setRedirect ] = useState(null);

    return (
        <PageLayout>
            <ContentLayout horizontalAlign='center' size='small'>
                <Title>Mi Perfil</Title>

                <img className='img-profile-pic' src={ user.foto ? user.foto : accountSvg } alt='Foto de perfil' />
                <h2>{user.nombre} {user.apellido}</h2>
                
                <section>
                    <section>
                        <section className='p-with-icon mt-15'>
                            <img src={emailSvg} alt='Correo'/>
                            <p><b>Correo Electronico:</b></p>
                        </section>
                        <p className='p-with-icon-text'>{user.correo}</p>
                    </section>
                    {
                            user.estado
                                ? (
                                    <section>
                                        <section className='p-with-icon mt-15'>
                                            <img src={stateSvg} alt='Correo'/>
                                            <p><b>Estado predeterminado:</b></p>
                                        </section>
                                        <p className='p-with-icon-text'>{capitalizeFirstLetter(user.estado)}</p>
                                    </section>
                                ) : null
                    }
                </section>
            </ContentLayout>

            <ContentLayout horizontalAlign='center' size='small' redirect={redirect}>

                <section className='section-buttons-profile'>
                    <Button className='btn-profile' horizontal icon={editSvg} onClick={() => setRedirect("/perfil/editar")}>Editar información</Button>
                </section>

            </ContentLayout>
        </PageLayout>    
    )
}

export default Profile

function capitalizeFirstLetter(str) {
    try{
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }catch(err){
        return str;
    }
}