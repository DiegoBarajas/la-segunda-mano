import React, { useRef, useEffect } from 'react'
import AccordionContentLayout from '../Layouts/AccordionContentLayout';
import ContentLayout from '../Layouts/ContentLayout';
import Select from '../Components/Select';
import Button from '../Components/Button';
import Input from '../Components/Input';

import constants from '../constants.json'
import '../Styles/Pages/CreateAnnouncement.css';

const CaracteristicasServicio = ({callBack, handleBack, formData, setFormData}) => {

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
                    <h2>Información</h2>
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
                        <Input
                            className='section-double-input-item'
                            id='tipo'
                            name='tipo'
                            label="Tipo de servicio"
                            placeholder='Ej. Herreria'
                            mb='15px'
                            required
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

export default CaracteristicasServicio