import React, { useState } from 'react'
import Input from '../Components/Input'
import Button from '../Components/Button';

const ReportProblem = () => {

    const [ body, setBody ] = useState('');

    const getHref = () => {
        const url = 'mailto:soporte@lasegundamano.com.mx'
        const subjectEncoded = encodeURIComponent("Reportar problema en La Segunda Mano");
        const bodyEncoded = encodeURIComponent(body);
        const query = `?subject=${subjectEncoded}&body=${bodyEncoded}`

        console.log(url+query);

        return url+query;
    }

    return (
        <div className='popup-saber-tipo-body'>
            <h2>Reportar un problema</h2>
            <p style={{ textAlign: 'justify', marginBottom: '25px' }}>Completa este formulario, esto rellenará un formato de correo electronico a la dirección <a href='mailto:soporte@lasegundamano.com.mx'>soporte@lasegundamano.com.mx</a>. En caso de ser necesario adjunta capturas o el contenido necesario para expresar tu caso, esto puede ayudarnos a solucionar el problema mas facilmente.</p>
            <Input
                id="body"
                label="Descripción del problema"
                placeholder="Cuentanos con lujo de detalle que problema tuviste, como llegaste a ese problema."
                width='100%'
                value={body}
                onChange={(e) => setBody(e.target.value)}

                textArea
                required
                mb='5px'
            />
            <a style={{ width: '100%' }} href={getHref()}><Button width='100%'>Enviar</Button></a>

        </div>
    )
}

export default ReportProblem