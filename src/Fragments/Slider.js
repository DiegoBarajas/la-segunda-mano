import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/*
    TMP
*/
import banner1Img from '../Assets/Images/banner1.webp'
import banner2Img from '../Assets/Images/banner2.webp'
import banner3Img from '../Assets/Images/banner3.webp'
import banner4Img from '../Assets/Images/banner4.jpeg'


const Slider = () => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            pagination={{
                clickable: true,
            }}
            autoplay={{ delay: 300  }}
            modules={[Pagination]}
            className="slider"
        >
            <SwiperSlide className='slide'>
                <img src={banner1Img}/>
            </SwiperSlide>

            <SwiperSlide className='slide'>
                <img src={banner2Img}/>
            </SwiperSlide>

            <SwiperSlide className='slide'>
                <img src={banner3Img}/>
            </SwiperSlide>


            <SwiperSlide className='slide'>
                <img src={banner4Img}/>
            </SwiperSlide>
        </Swiper>
    )
}

export default Slider