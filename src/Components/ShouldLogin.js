import React, { useState } from 'react'
import PageLayout from '../Layouts/PageLayout'
import ContentLayout from '../Layouts/ContentLayout'
import Button from './Button'

import shopSvg from '../Assets/Icons/shop.svg'
import loginSvg from '../Assets/Icons/login.svg'
import createAccountSvg from '../Assets/Icons/create_account.svg'


const ShouldLogin = () => {

    const [ redirect, setRedirect ] = useState(null);

    return (
        <PageLayout>
            <ContentLayout size='small' horizontalAlign='center' complete redirect={redirect}>
                <img style={{ width: '150px' }} src={shopSvg} alt='Vender'/>
                <h1 style={{ marginTop: '15px', textAlign: 'center' }}>Para vender necesitas una cuenta</h1>
                <p 
                    style={{ width: '80%', marginTop: '30px', marginBottom: '50px', textAlign: 'justify' }}
                >Para vender en <b>La Segunda Mano</b> necesitas tener una cuenta, puedes abrirla ya mismo, o si ya cuentas con una inicia sesión.</p>

                <Button 
                    horizontal
                    width='45%'
                    icon={createAccountSvg}
                    onClick={() => setRedirect('/signin')}
                >Crear Cuenta</Button>

                <Button 
                    horizontal
                    width='45%'
                    icon={loginSvg}
                    color='red' 
                    onClick={() => setRedirect('/login')}
                >Iniciar sesión</Button>

            </ContentLayout>
        </PageLayout>
    )
}

export default ShouldLogin