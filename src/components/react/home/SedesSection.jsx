import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/swiper-bundle.css'
import './SedesSection.css'

import { LocationIcon } from '@/components/react/icons/LocationIcon'
import { IconParkOutlineRight } from '@/components/react/icons/IconParkOutlineRight'

function SedeItem({ nombre, image, direccion }) {
  return (
    <div className="relative mx-6 h-56 overflow-hidden rounded-xl border">
      <img src={image} alt={nombre} className="h-full w-full object-cover" draggable="false" />
      <div className="absolute bottom-0 left-0 right-0 mx-2 mb-2 rounded-xl bg-white bg-opacity-30">
        <div className="flex rounded-xl p-2 leading-4 text-white backdrop-blur-sm">
          <span className="mr-1">
            <LocationIcon />
          </span>
          <span>{direccion}</span>
        </div>
      </div>
    </div>
  )
}

function SedesSection() {
  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)
  const swiperInstance = useRef(null)

  const [sedes, setSedes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSedes = async () => {
    try {
      const response = await fetch('/data/sedes.json')
      if (!response.ok) {
        throw new Error('Error al cargar los datos de sedes')
      }
      const data = await response.json()
      setSedes(data)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSedes()
  }, [])

  if (error) return <div>No se encontraron sedes</div>

  return (
    <>
      <section className="px-4 py-8 sm:px-6 xl:px-0">
        <div className="mx-auto max-w-6xl">
          <div className="relative mb-6 flex items-center justify-between">
            <h1 className="font-noto text-4xl font-bold text-primary-800">Sedes</h1>
            <div className="sedes_navigation flex justify-end gap-2">
              <button
                ref={swiperPrevRef}
                style={{ position: 'static', content: '""' }}
                className="swiper-button-prev rounded-full border border-primary-800 p-1 hover:bg-primary-800/10">
                <span className="w-full rotate-180 text-primary-800">
                  <IconParkOutlineRight />
                </span>
              </button>
              <button
                ref={swiperNextRef}
                style={{ position: 'static' }}
                className="swiper-button-next rounded-full border border-primary-800 p-1 hover:bg-primary-800/10">
                <span className="w-full text-primary-800">
                  <IconParkOutlineRight />
                </span>
              </button>
            </div>
          </div>
          <div className="relative flex gap-2 overflow-hidden pb-8">
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
              slidesPerGroup={1}
              spaceBetween={10}
              loop={false}
              autoplay={{ delay: 3000 }}
              speed={1000}
              pagination={{ clickable: true, el: '.custom-pagination' }}
              navigation={{
                prevEl: swiperPrevRef.current,
                nextEl: swiperNextRef.current
              }}
              breakpoints={{
                640: { slidesPerView: 1, slidesPerGroup: 1 },
                768: { slidesPerView: 2, slidesPerGroup: 2 },
                1024: { slidesPerView: 3, slidesPerGroup: 3 }
              }}>
              {sedes.map((sede, index) => (
                <SwiperSlide key={index}>
                  <SedeItem nombre={sede.nombre} image={sede.image} direccion={sede.direccion} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-pagination absolute -bottom-3 left-0 right-0 z-10 flex h-5 justify-center space-x-2" />
          </div>
        </div>
      </section>
    </>
  )
}

export default SedesSection
