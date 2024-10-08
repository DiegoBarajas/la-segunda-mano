import React, { useEffect, useState } from 'react';
import axios from 'axios';
import modals from '../Modals';
import backend from '../backend';
import Loader from '../Components/Loader';
import Button from '../Components/Button';

import {loadStripe} from '@stripe/stripe-js';
import {Elements, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_live_51PaubdJCv3qocvfbxks9aly7cpiB4yHvMEIRE5z1Up4m6weKOMltJDUtt9r7jO0MadmwkpPXgqOZsMQ6YFGd8VfP00jfj5m6X8');

const ModalPayment = ({id, plan='impulsado'}) => {

    const [ options, setOptions ] = useState(null);
    const [ amount, setAmount ] = useState(null);
    const [ currency, setCurrency ] = useState(null);
    const [ btnDisabled, setBtnDisabled ] = useState(false);

    useEffect(() => {
        const getOptions = async() => {
            try{
                const response = await axios.get(`${backend}/api/announcement/upgrade/${id}?plan=${plan}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                setOptions({ clientSecret: response.data.clientSecret });
                setAmount(response.data.amount);
                setCurrency(response.data.currency);
            }catch(err){    
                if (err.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Código de estado HTTP:', err.response.status, '\n', 'Error de respuesta:', err.response.data);
                    modals.alert("Ups", `${err.response.data}`, 'error');
                    //Modals.alert("Ups", `<b>[${err.response.status}]</b> ${err.response.data}`, 'error');
                } else if (err.request) {
                    // La solicitud fue hecha pero no se recibió respuesta
                    console.error('No se recibió respuesta del servidor:', err.request);
                    modals.alert("Ha ocurrido un error", `No se recibió respuesta del servidor`, 'error');
                } else {
                    // Ocurrió un error antes de enviar la solicitud
                    console.error('Error al enviar la solicitud:', err.message);
                    modals.alert("Ha ocurrido un error", `<b>Error al enviar la solicitud</b> ${err.message}`, 'error');
                }
            }
        }


        getOptions();
    }, [id]);

    const CheckoutForm = ({id}) => {
        const stripe = useStripe();
        const elements = useElements();

        const [ isLoading, setIsLoading ] = useState(false);
      
        const handleSubmit = async (event) => {
            event.preventDefault();
            
            if (!stripe || !elements) return;

            setIsLoading(true);
      
            const result = await stripe.confirmPayment({
                //`Elements` instance that was used to create the Payment Element
                elements,
                confirmParams: {
                    return_url: `${backend}/api/announcement/upgrade/confirm/${id}`
                },
            });

            if (result.error) {
                console.error(result.error.message);
                modals.alert("Error", result.error.message, 'error')
            } else {
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
            }

            setIsLoading(false);
        };
      
        return (
            <form onSubmit={handleSubmit}>
                { (amount && currency) ? <h3 style={{ marginTop: '-10px', marginBottom: '5px', textAlign: 'start' }}>Total ${amount/100}.00 {currency.toUpperCase()}</h3> : null }
                <PaymentElement
                    options={{ layout: 'accordion' }}
                />
                { isLoading ? <Button width='100%' disabled={true}>Cargando...</Button> : <Button width='100%' disabled={btnDisabled} type='submit'>Pagar</Button> }
                
            </form>
        );
    };

    return options ? (
        <div className='show-pricing'>
            <h2>Agrega tus datos para proceder con el pago</h2>

            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm id={id} />
            </Elements>
        </div>
    ) : (
        <div className='show-pricing'>
            <div style={{content: '', marginTop: '20px'}}></div>
            <Loader/>
            <p>Obteniendo paymentIntent, espere un momento...</p>
        </div>
    )
}

export default ModalPayment