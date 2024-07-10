import React, { useRef, useEffect } from 'react'
import AccordionContentLayout from '../Layouts/AccordionContentLayout';
import ContentLayout from '../Layouts/ContentLayout';
import Select from '../Components/Select';
import Button from '../Components/Button';
import Input from '../Components/Input';

import constants from '../constants.json'
import '../Styles/Pages/CreateAnnouncement.css';

const CaracteristicasGratis = ({callBack, handleBack, formData, setFormData}) => {

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
                    <h2>Información básica</h2>
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
                    </section>

                    <section className='section-double-input'>
                        <Input
                            id='cantidad'
                            name='cantidad'
                            type='number'
                            className='section-double-input-item'
                            label="Cantidad"
                            placeholder='Ej. 1'
                            mb='15px'
                            min={1}
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
                            id='marca'
                            name='marca'
                            label="Marca"
                            placeholder='Ej. Lenovo'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='modelo'
                            name='modelo'
                            label="Modelo"
                            placeholder='Ej. Thinkpad T470s'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='color'
                            name='color'
                            label="Color"
                            placeholder='Ej. Rojo'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='tipo'
                            name='tipo'
                            label="Tipo de articulo"
                            placeholder='Ej. Laptop'
                            mb='15px'
                        />
                    </section>
                </div>

            </ContentLayout>

            <AccordionContentLayout titulo='Alimentos y bebidas' horizontalAlign='center'>
                <div className='form-create-ann'>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='fechaCaducidad'
                            name='fechaCaducidad'
                            label="Fecha de caducidad"
                            placeholder='Ej. Febrero 2025'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='ingredientes'
                            name='ingredientes'
                            label="Ingredientes"
                            placeholder='Ej. Jitomate, sal yodada, agua'
                            mb='15px'
                        />
                    </section>

                </div>
            </AccordionContentLayout>

            <AccordionContentLayout titulo='Autopartes y vehiculos' horizontalAlign='center'>
                <div className='form-create-ann'>

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
                            id='año'
                            name='año'
                            label="Año"
                            placeholder='Ej. 2008'
                            mb='15px'
                        />
                        <Input
                            className='section-double-input-item'
                            id='cilindros'
                            name='cilindros'
                            label="Número de cilindros"
                            placeholder='Ej. 8'
                            type='number'
                            min={8}
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>

                        <Input
                            className='section-double-input-item'
                            id='vehiculo'
                            name='vehiculo'
                            label="Vehiculo(s) compatible (En caso de autopartes)"
                            placeholder='Ej. Honda Civic 2018'
                            mb='15px'
                        />
                    </section>
                </div>
            </AccordionContentLayout>

            <AccordionContentLayout titulo='Computación y telefonia' horizontalAlign='center'>
                <div className='form-create-ann'>
                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='cpu'
                            name='cpu'
                            label="Procedador (CPU)"
                            placeholder='Ej. Intel I5 3800G'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='ram'
                            name='ram'
                            label="Memoria RAM"
                            placeholder='Ej. 16GB DDR4'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='almacenamiento'
                            name='almacenamiento'
                            label="Almacenamiento"
                            placeholder='Ej. 250GB SSD'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='bateria'
                            name='bateria'
                            label="Capacidad de la bateria"
                            placeholder='Ej. 3000 mAh'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='sistemaOperativo'
                            name='sistemaOperativo'
                            label="Sistema Operativo"
                            placeholder='Ej. Windows 11'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='conectividad'
                            name='conectividad'
                            label="Conectividad"
                            placeholder='Ej. 5G, Bluethooth 3.0'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='tamañoPantalla'
                            name='tamañoPantalla'
                            label="Tamaño de la pantalla"
                            placeholder='Ej. 5 pulgadas'
                            mb='15px'
                        />
                    </section>
                </div>
            </AccordionContentLayout>

            <AccordionContentLayout titulo='Libros, películas y música' horizontalAlign='center'>
                <div className='form-create-ann'>
                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='autor'
                            name='autor'
                            label="Autor "
                            placeholder='Ej. Edgar Allan Poe'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='editorial'
                            name='editorial'
                            label="Editorial"
                            placeholder='Ej. Panini Comics'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='director'
                            name='director'
                            label="Director"
                            placeholder='Ej. Alfonso Cuarón'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='artista'
                            name='artista'
                            label="Artista musical"
                            placeholder='Ej. Freddie Mercury'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='genero'
                            name='genero'
                            label="Genero (musical, cinematografico, liteario)"
                            placeholder='Ej. Rock, terror, comedia, novela'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='idioma'
                            name='idioma'
                            label="Idioma(s)"
                            placeholder='Ej. Español, inglés y francés'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='duracion'
                            name='duracion'
                            label="Duración estimada"
                            placeholder='Ej. 95 min'
                            mb='15px'
                        />
                    </section>
                </div>
            </AccordionContentLayout>

            <AccordionContentLayout titulo='Ropa y calzado' horizontalAlign='center'>
                <div className='form-create-ann'>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='talla'
                            name='talla'
                            label="Talla"
                            placeholder='Ej. Mediano, grande, unitalla'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='sexo'
                            name='sexo'
                            label="Genero de la prenda"
                            placeholder='Ej. Masculino, femenino, unisex'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='material'
                            name='material'
                            label="Material"
                            placeholder='Ej. Poliester y algodón'
                            mb='15px'
                        />
                    </section>
                </div>
            </AccordionContentLayout>

            <AccordionContentLayout titulo='TV y pantallas' horizontalAlign='center'>
                <div className='form-create-ann'>

                    <section className='section-double-input'>
                        <Input
                            className='section-double-input-item'
                            id='resolucion'
                            name='resolucion'
                            label="Resolución de la pantalla"
                            placeholder='Ej. 4K'
                            mb='15px'
                        />

                        <Input
                            className='section-double-input-item'
                            id='tamañoPulgadas'
                            name='tamañoPulgadas'
                            label="Tamaño en pulgadas"
                            placeholder='Ej. 40 pulgadas'
                            mb='15px'
                        />
                    </section>

                    <section className='section-double-input'>
                        <Select
                            className='section-double-input-item'
                            id='smartTV'
                            name='smartTV'
                            label="¿Es SmartTV?"
                            mb='15px'
                            options={[{ text: 'No', value: 'false' }, { text: 'Si', value: 'true' }]}
                        />

                        <Input
                            className='section-double-input-item'
                            id='conectividadTV'
                            name='conectividadTV'
                            label="Conectividad"
                            placeholder='Ej. HDMI, A/V, VGA, Wifi, Bluetooth'
                            mb='15px'
                        />
                    </section>
                </div>
            </AccordionContentLayout>

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

export default CaracteristicasGratis