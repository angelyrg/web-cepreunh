import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import ArrowRightIcon from '../icons/ArrowRightIcon'

const HeroSlider = () => {
  const slides = [
    { id: 1, content: 'Slide 1', image: '/assets/images/sliders/hero_1.png' },
    { id: 2, content: 'Slide 2', image: '/assets/images/sliders/hero_1.png' },
    { id: 3, content: 'Slide 3', image: '/assets/images/sliders/hero_1.png' }
  ]

  return (
    <div className="relative w-full rounded-md border">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex h-96 items-center justify-center overflow-hidden rounded-2xl">
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="h-full w-full transform object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HeroSlider
