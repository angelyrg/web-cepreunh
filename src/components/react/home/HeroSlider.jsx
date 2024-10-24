import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'

// Usa los módulos de Swiper
// SwiperCore.use([Navigation, Pagination, Autoplay])

const HeroSlider = () => {
  const slides = [
    { id: 1, content: 'Slide 1' },
    { id: 2, content: 'Slide 2' },
    { id: 3, content: 'Slide 3' }
  ]

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      navigation
      pagination={{ clickable: true }}
      loop={true} // Habilitar el bucle infinito
      autoplay={{
        // Configuración de autoplay
        delay: 3000, // Tiempo en milisegundos
        disableOnInteraction: false // Permitir la interacción sin detener el autoplay
      }}>
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="flex h-64 items-center justify-center bg-gray-200">
            <h2 className="text-lg">{slide.content}</h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroSlider
