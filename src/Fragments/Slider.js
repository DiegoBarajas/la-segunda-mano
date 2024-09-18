import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';
import modals from '../Modals';
import axios from 'axios';
import backend from '../backend';

import bannerImg from '../Assets/Logos/banner.png';

const Slider = () => {

    const [ banners, setBanners ] = useState(null);

    useEffect(() => {
        async function getBanners() {
            try{
                const response = await axios.get(`${backend}/api/banner`);

                console.log(response.data);
                
                setBanners(response.data);
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

        getBanners();
    }, []);

    return (
        <Swiper
            spaceBetween={30}
            effect={'fade'}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="slider"
            loop={true}
        >
            {
                banners ? (
                    banners.map((b, indx) => 
                        <SwiperSlide className='slide' key={`slide-${indx}`}>
                            <Link className='slide-link' to={b.url}>
                                <img src={b.data} alt='Banner' title={b.title}/>
                            </Link>
                        </SwiperSlide>
                    )
                ) : ( 
                    <SwiperSlide className='slide'>
                        <Link className='slide-link'>
                            <img src={bannerImg} alt='Banner' title="La Segunda Mano"/>
                        </Link>
                    </SwiperSlide>
                )
            }
        </Swiper>
    )
}

export default Slider
