"use client";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '@/app/Card';
import { useRef } from 'react';

const SwipCreators = () => {
    const swiperRef = useRef(null);
    return (
        <>
            <h1 className="text-center text-6xl bg-white text-black py-10" >Top Creators</h1>
            <div className="p-4 bg-white sm:p-6 md:p-10 w-full max-w-7xl mx-auto relative">
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    effect='coverflow'
                    grabCursor={true}
                    centeredSlides={true}
                    initialSlide={2}
                    speed={500}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    preventClicks={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 80,
                        depth: 350,
                        modifier: 1,
                        slideShadows: true
                    }}
                    on={{
                        click: (e) => {
                            Swiper.slideTo(this.clickIndex);
                        },
                    }}
                    pagination={{ el: '.swiper-pagination' }}

                    className="w-full h-auto"
                    breakpoints={{
                        320: {
                            slidesPerView: 1,

                        },
                        640: {
                            slidesPerView: 1,

                        },
                        768: {
                            slidesPerView: 2,

                        },
                        1024: {
                            slidesPerView: 3,

                        },
                    }}
                >
                    <SwiperSlide onClick={() => swiperRef.current.slideTo(0)} ><Card /></SwiperSlide>
                    <SwiperSlide onClick={() => swiperRef.current.slideTo(1)} ><Card /></SwiperSlide>
                    <SwiperSlide onClick={() => swiperRef.current.slideTo(2)} ><Card /></SwiperSlide>
                    <SwiperSlide onClick={() => swiperRef.current.slideTo(3)} ><Card /></SwiperSlide>
                    <SwiperSlide onClick={() => swiperRef.current.slideTo(4)} ><Card /></SwiperSlide>
                    <SwiperSlide onClick={() => swiperRef.current.slideTo(5)} ><Card /></SwiperSlide>
                    <SwiperSlide onClick={() => swiperRef.current.slideTo(6)} ><Card /></SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default SwipCreators;
