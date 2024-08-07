import React, { useEffect, useRef, useState } from 'react'
import ContentLayout from '../Layouts/ContentLayout';
import Select from '../Components/Select';
import Button from '../Components/Button';
import Input from '../Components/Input';

import constants from '../constants.json'
import '../Styles/Pages/CreateAnnouncement.css';

const EditAnnStep2 = ({type, formData, setFormData, callBack, handleBack}) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [true]);

    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newFormData = new FormData(formRef.current);
        const jsonData = {...formData};

        newFormData.forEach((value, key) => jsonData[key] = value);

        setFormData(jsonData);
        callBack();
    }

    const renderInputs = () => {
        const inputs = constants.forms[type].general;
        return inputs.map((opt) => {
            switch(opt.kind){
                case "input": 
                    return <Input
                        key={opt.name}
                        id={opt.name}
                        name={opt.name}
                        type={opt.type}
                        width='100%'
                        label={opt.label}
                        placeholder={opt.placeholder}
                        auxText={opt.auxText}
                        mb='15px'
                        required={opt.required}
                        textArea={opt.textArea}
                        defaultValue={formData[opt.name]}
                    />
                case "select":
                    return <Select
                        key={opt.name}
                        id={opt.name}
                        name={opt.name}
                        label={opt.label}
                        width='100%'
                        auxText={opt.auxText}
                        options={constants[opt.options]}
                        mb='15px'
                        required={opt.required}
                        selectedOption={formData[opt.name]}
                    />
                default: return null;
            }
        })
    }

    return (
        <ContentLayout horizontalAlign='center' key={Math.random()}>
            <form className='form-create-ann' onSubmit={handleSubmit} ref={formRef}>
                <p className='p-nota-create-ann'><b>NOTA:</b> Los campos con <span>*</span> son obligatorios.</p>

                {
                    renderInputs()
                }
                
                <section className='buttons-create-ann'>
                    <Button
                        color='red'
                        onClick={handleBack}
                    >Volver atras</Button>

                    <Button
                        type='submit'
                    >Siguiente paso</Button>
                </section>
            </form>
        </ContentLayout>
    )
}

export default EditAnnStep2

