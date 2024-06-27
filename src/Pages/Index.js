import React from 'react'

import StandardLayout from '../Layouts/StandardLayout'
import ContententLayout from '../Layouts/ContentLayout'
import Title from '../Components/Title'



const Index = () => {
    return (
        <StandardLayout>
            <ContententLayout>
                <Title center>Hola Mundo</Title>
                <button onClick={() => {
                    const jeison = ["Tablet", "TV", "Celular", "La fusldas djkahs  oidjasjoidaslkdn nassaj hdoiasjdl kasjoidjasoi djasiodjasoidjdasoij dasoij doiasjdoiasj doiasjd oiasj doiasdjknd jkasndjkasndjkas ndjkasndjkansdjknasdjk djkahsj oidasjkhd jasdjkaskjdas jkda", "el pepe", "ete setch", "Julian"]
                    localStorage.setItem('history', JSON.stringify(jeison))
                }}>asmldkasd</button>
            </ContententLayout>
        </StandardLayout>
    )
}

export default Index