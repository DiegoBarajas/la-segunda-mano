import React, { useRef, useEffect } from 'react'
import ContentLayout from '../Layouts/ContentLayout';
import Select from '../Components/Select';
import Button from '../Components/Button';
import Input from '../Components/Input';

import constants from '../constants.json'
import '../Styles/Pages/CreateAnnouncement.css';

const CaracteristicasVehiculo = ({callBack, handleBack, formData, setFormData}) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    const formRef = useRef(null);
    const { estado } = JSON.parse( localStorage.getItem('user') );

    const usos = constants.usos.slice(1);
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
                    <h2>Características</h2>
                    <p className='p-nota-create-ann'><b>NOTA:</b> Los campos con <span>*</span> son obligatorios.</p>

                    <section className='section-double-input'>
                        <Select
                            id='uso'
                            name='uso'
                            label='Uso'
                            options={usos}
                            className='section-double-input-item'
                            mb='15px'
                            required
                        />

                        <Input
                            className='section-double-input-item'
                            id='tipo'
                            name='tipo'
                            label="Tipo de vehiculo"
                            placeholder='Ej. Automovil'
                            required
                            mb='15px'
                        />
                    </section>

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
                            id='deudas'
                            name='deudas'
                            label="Tiene deudas?"
                            mb='15px'
                            required
                            options={[{ text: 'No', value: 'false' }, { text: 'Si', value: 'true' }]}
                        />

                        <Input
                            className='section-double-input-item'
                            id='km'
                            name='km'
                            label="Kilometraje"
                            placeholder='Ej. 480'
                            type='number'
                            min={1}
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='marca'
                            name='marca'
                            label="Marca"
                            placeholder='Ej. Honda'
                            mb='15px'
                        />
                        <Input
                            className='section-double-input-item'
                            id='modelo'
                            name='modelo'
                            label="Modelo"
                            placeholder='Ej. Civic'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='año'
                            name='año'
                            label="Año"
                            placeholder='Ej. 2008'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='color'
                            name='color'
                            label="Color"
                            placeholder='Ej. Gris claro'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='cilindros'
                            name='cilindros'
                            label="Número de cilindros"
                            placeholder='Ej. 8'
                            type='number'
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

export default CaracteristicasVehiculo