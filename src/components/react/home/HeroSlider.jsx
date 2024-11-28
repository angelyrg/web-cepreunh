import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import './HeroSlider.css'

import { IconParkOutlineRight } from '@/components/react/icons/IconParkOutlineRight'

const HeroSlider = () => {
  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)
  const swiperInstance = useRef(null)

  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSlides = async () => {
    try {
      const response = await fetch('/data/sliders.json')
      if (!response.ok) {
        throw new Error('Error al cargar los datos del slider')
      }
      const data = await response.json()
      setSlides(data)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlides()
  }, [])

  if (error) return <div>No se pudo obtener sliders</div>

  return (
    <>
      <div className="mx-auto mt-4 flex max-w-6xl gap-8 px-2 pb-2">
        <div className="relative w-full overflow-hidden rounded-2xl">
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
          <Swiper
            onSwiper={(swiper) => {
              swiperInstance.current = swiper
              swiper.params.navigation.prevEl = swiperPrevRef.current
              swiper.params.navigation.nextEl = swiperNextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            }}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true
            }}
            pagination={{
              clickable: true,
              el: '.hero-pagination'
            }}
            navigation={{
              prevEl: swiperPrevRef.current,
              nextEl: swiperNextRef.current
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
        </div>
      </div>
    </>
  )
}

export default HeroSlider
