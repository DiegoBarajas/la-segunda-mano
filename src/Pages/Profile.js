import React from 'react'

import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import Title from '../Components/Title'

import '../Styles/Pages/Profile.css';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <PageLayout>
            <ContentLayout horizontalAlign='center'>
                <Title>Mi Perfil</Title>
            </ContentLayout>
        </PageLayout>    
    )
}

export default Profile