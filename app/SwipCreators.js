"use client";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '@/app/Card';
import { useEffect, useRef } from 'react';

const SwipCreators = () => {
    const swiperRef = useRef(null);
    useEffect(() => {
        if (typeof window !== 'undefined' && swiperRef.current) {
            const slideIndex = window.innerWidth > 624 ? 2 : 0;
            swiperRef.current.slideTo(slideIndex, 0); // move immediately to desired slide
        }
    }, []);

    const projects = [
        {
            title: "Clean Water Initiative",
            description: "Providing clean and safe drinking water to underserved communities.",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLB0-ABd1X26xxNYpOFYAbEo3fZhrCuuwEg&s"
        },
        {
            title: "Solar Energy for Schools",
            description: "Installing solar panels in schools to promote sustainable energy.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJAyycWE_NLSSmlwoAYXugpQVsK0dxiNtRqg&s"
        },
        {
            title: "Medical Aid for Children",
            description: "Offering medical assistance to children who really need this service.",
            image: "https://ekplatebiryani.com/wp-content/uploads/2023/07/Education-%E2%80%93-A-Right-for-All-1-975x480.png"
        },
        {
            title: "Reforestation Project",
            description: "Planting trees to combat climate change and restore natural habitats.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFq6I078-BQWOytGvcQMguyCFPuAnTMOODgg&s"
        },
        {
            title: "Tech Education for Girls",
            description: "Providing coding classes and laptops to empower young girls in technology.",
            image: "data:image/jpeg;base64,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"
        },
    ];


    return (
        <>
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-white text-black py-6 sm:py-10">
                Top Creators
            </h1>
            <div className="p-2 sm:p-4 md:p-8 lg:p-10 bg-white w-full max-w-7xl mx-auto relative">
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    effect='coverflow'
                    grabCursor={true}
                    centeredSlides={true}
                    // initialSlide={defaultSlide}
                    speed={500}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    preventClicks={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 50,
                        depth: 250,
                        modifier: 1,
                        slideShadows: true
                    }}
                    pagination={{ clickable: true }}
                    className="w-full h-auto"
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 40 },
                    }}
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index} onClick={() => { swiperRef.current.slideTo(index, 0); }}>
                            <Card title={project.title} description={project.description} imgLink={project.image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default SwipCreators;
