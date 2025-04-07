import React, { useRef, useEffect, useState } from 'react'
import AccordionContentLayout from '../Layouts/AccordionContentLayout';
import ContentLayout from '../Layouts/ContentLayout';
import Select from '../Components/Select';
import Button from '../Components/Button';
import Input from '../Components/Input';

import constants from '../constants.json'
import '../Styles/Pages/CreateAnnouncement.css';

const CreateAnnStep2 = ({ type, formData, setFormData, callBack, handleBack }) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    const formRef = useRef(null);
    const { estado } = JSON.parse( localStorage.getItem('user') );

    const handleSubmit = (e) => {
        e.preventDefault();

        const newFormData = new FormData(formRef.current);
        const jsonData = {};

        newFormData.forEach((value, key) => jsonData[key] = value);
        const updatedFormData = {...formData, ['caracteristicas']: jsonData};

        setFormData(updatedFormData);
        callBack();
    }

    const renderElements = () => {
        const contenedores = constants.forms[type].caracteristicas;
        return contenedores.map((cont) => {
            switch(cont.contenedor){
                case "content": return (
                    <ContentLayout horizontalAlign='center'>
                        <div className='form-create-ann'>
                            <h2>{cont.titulo}</h2>
                            <p className='p-nota-create-ann'><b>NOTA:</b> Los campos con <span><b>*</b></span> son obligatorios.</p>
                            {
                                renderInputs(cont.data)
                            }
                        </div>
                    </ContentLayout>
                )
                case "accordion": return (
                    <AccordionContentLayout titulo={cont.titulo} horizontalAlign='center' defaultOpened={checkIsOpened(cont, formData)}>
                        <div className='form-create-ann'>
                            {
                                renderInputs(cont.data)
                            }
                        </div>
                    </AccordionContentLayout>
                )

                default: return null;
            }
        });

        function renderInputs(data){
            const containers = [];
            for(let i=0;i<data.length;i+=2){
                const j = i+1;
                const input = i+1 <= data.length ? renderInput( data[i] ) : null;
                const jnput = j+1 <= data.length ? renderInput( data[j] ) : null;

                containers.push(
                    <section className='section-double-input'>
                        {input}
                        {jnput}
                    </section>
                )
            }

            return containers;
        }

        function renderInput(opt){
            switch(opt.kind){
                case "input": return (
                    <Input
                        id={opt.name}
                        name={opt.name}
                        type={opt.type}
                        className='section-double-input-item'
                        label={opt.label}
                        placeholder={opt.placeholder}
                        mb='15px'
                        min={opt.min}
                        required={opt.required}
                        defaultValue={formData.caracteristicas ? formData.caracteristicas[opt.name] : null}
                    />
                )
                case "select": return (
                    <Select
                        id={opt.name}
                        name={opt.name}
                        label={opt.label}
                        options={constants[opt.options]}
                        className='section-double-input-item'
                        mb='15px'
                        required={opt.required}
                        defaultValue={formData.caracteristicas ? formData.caracteristicas[opt.name] : null}
                    />
                )
                case "estado": return (
                    <Select
                            id='estado'
                            name='estado'
                            label='Estado de la republica'
                            options={constants.estadosForm}
                            selectedOption={estado}
                            className='section-double-input-item'
                            mb='15px'
                            required
                    />
                )
                default: return null;
            }
        }
    }

    return (
        <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '35px' }} onSubmit={handleSubmit} ref={formRef}>
            
            {
                renderElements()
            }

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

export default CreateAnnStep2

function checkIsOpened(c, formData){
    const { data } = c;
    const caracteristicas = formData.caracteristicas;
    if(!caracteristicas) return false;

    for(let i in data){
        const d = data[i];

        if(d.name in caracteristicas) {
            if(caracteristicas[d.name] !== null && caracteristicas[d.name] !== '' && !caracteristicas[d.name]) return true;
        }
    }

    return false;
}