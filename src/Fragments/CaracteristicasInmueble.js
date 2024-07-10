import React, { useRef, useEffect } from 'react'
import ContentLayout from '../Layouts/ContentLayout';
import Select from '../Components/Select';
import Button from '../Components/Button';
import Input from '../Components/Input';

import '../Styles/Pages/CreateAnnouncement.css';
import constants from '../constants.json'

const CaracteristicasInmueble = ({callBack, handleBack, formData, setFormData, setCurrentFormData}) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    const formRef = useRef(null);
    const { estado } = JSON.parse( localStorage.getItem('user') );

    const estados = constants.estados.slice(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentFormData = new FormData(formRef.current);
        const newFormData = new FormData();
        const jsonFormData = {};

        currentFormData.forEach((value, key) => {
            if (jsonFormData.hasOwnProperty(key)) {
                if (!Array.isArray(jsonFormData[key])) {
                    jsonFormData[key] = [jsonFormData[key]];
                }
                jsonFormData[key].push(value);
            } else {
                jsonFormData[key] = value;
            }
        });

        newFormData.append('caracteristicas', JSON.stringify(jsonFormData));

        formData.forEach((value, key) => {
            newFormData.append(key, value);
        });
    
        setFormData(newFormData);
        callBack();
    }

    return (
        <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '35px' }} onSubmit={handleSubmit} ref={formRef}>
            <ContentLayout horizontalAlign='center'>
                <div className='form-create-ann'>
                    <h2>Información y caracteristicas</h2>
                    <p className='p-nota-create-ann'><b>NOTA:</b> Los campos con <span>*</span> son obligatorios.</p>

                    <section className='section-double-input'>
                        <Select
                            id='estado'
                            name='estado'
                            label='Estado de la republica'
                            options={estados}
                            selectedOption={estado}
                            className='section-double-input-item'
                            mb='15px'
                            required
                        />

                        <Input
                            className='section-double-input-item'
                            id='ciudad'
                            name='ciudad'
                            label="Ciudad"
                            placeholder='Ej. Guadalajara'
                            mb='15px'
                            required
                        />
                    </section>

                    <section className='section-double-input'>
                        <Select
                            className='section-double-input-item'
                            id='tipo'
                            name='tipo'
                            label="Tipo de inmueble"
                            options={[
                                { text: 'Terreno', value: 'Terreno' },{ text: 'Casa', value: 'Casa' },
                                { text: 'Departamento', value: 'Departamento' },{ text: 'Oficina', value: 'Oficina' },
                                { text: 'Local', value: 'Local' },{ text: 'Edificio', value: 'Edificio' },
                            ]}
                            required
                            mb='15px'
                        />

                        <Select
                            className='section-double-input-item'
                            id='rentaOVenta'
                            name='rentaOVenta'
                            label="Renta o venta"
                            options={[
                                { text: 'Renta', value: 'renta' },{ text: 'Venta', value: 'venta' },
                            ]}
                            required
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='colonia'
                            name='colonia'
                            label="Colonia"
                            placeholder='Ej. Americana'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='cp'
                            name='cp'
                            label="Código postal"
                            placeholder='Ej. 44850'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='baños'
                            name='baños'
                            label="Cantidad de baños"
                            placeholder='Ej. 2.5'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='habitaciones'
                            name='habitaciones'
                            label="Cantidad de habitaciones"
                            placeholder='Ej. Guadalajara'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='superficie'
                            name='superficie'
                            label={<>Superficie (m<sup>2</sup>)</>}
                            placeholder='Ej. 50'
                            mb='15px'
                        />
                    </section>

                </div>

            </ContentLayout>


            <section style={{ width: '50%' }} className='buttons-create-ann'>
                    <Button
                        color='red'
                        onClick={handleBack}
                    >Volver atras</Button>

                    <Button
                        type='submit'
                    >Siguiente paso</Button>

            </section>
        </form>
    )
}

export default CaracteristicasInmueble