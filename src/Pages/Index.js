import React from 'react'

import StandardLayout from '../Layouts/StandardLayout'
import ContententLayout from '../Layouts/ContentLayout'
import Title from '../Components/Title'



const Index = () => {
    return (
        <StandardLayout>
            <ContententLayout>
                <Title center>Hola Mundo</Title>
            </ContententLayout>
        </StandardLayout>
    )
}

export default Index