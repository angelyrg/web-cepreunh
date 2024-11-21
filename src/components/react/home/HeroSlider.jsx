import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import './HeroSlider.css'

import { IconParkOutlineRight } from '@/components/react/icons/IconParkOutlineRight'

const HeroSlider = () => {
  const slides = [
    { id: 1, content: 'Slide 1', image: '/assets/images/sliders/hero_1.png' },
    { id: 2, content: 'Slide 2', image: '/assets/images/sliders/hero_1.png' },
    { id: 3, content: 'Slide 3', image: '/assets/images/sliders/hero_1.png' }
  ]

  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)
  const swiperInstance = useRef(null)

  useEffect(() => {
    if (swiperInstance.current) {
      swiperInstance.current.params.navigation.prevEl = swiperPrevRef.current
      swiperInstance.current.params.navigation.nextEl = swiperNextRef.current
      swiperInstance.current.navigation.init()
      swiperInstance.current.navigation.update()
    }
  }, [])

  return (
    <>
      <div className="mx-auto flex max-w-6xl gap-8 px-2 pb-2">
        <div className="relative w-full overflow-hidden rounded-2xl">
          <Swiper
            onSwiper={(swiper) => (swiperInstance.current = swiper)}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            navigation={{
              prevEl: swiperPrevRef.current,
              nextEl: swiperNextRef.current
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true,
              el: '.hero-pagination'
            }}>
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="flex h-60 items-center justify-center overflow-hidden sm:h-80 md:h-[420px]">
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className="h-full w-full transform object-cover transition-transform duration-500 ease-in-out hover:scale-[102%]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="hero-pagination absolute z-10 text-center" />
          <div className="hero-navigation absolute bottom-6 right-4 z-10 flex justify-end gap-2">
            <button
              ref={swiperPrevRef}
              style={{ position: 'static', content: '""' }}
              className="swiper-button-prev rounded-full border border-gray-400 bg-gray-800/10 p-1 hover:bg-gray-800/20">
              <span className="w-full rotate-180 text-white">
                <IconParkOutlineRight />
              </span>
            </button>
            <button
              ref={swiperNextRef}
              style={{ position: 'static' }}
              className="swiper-button-next rounded-full border border-gray-400 bg-gray-800/10 p-1 hover:bg-gray-800/20">
              <span className="w-full text-white">
                <IconParkOutlineRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSlider
