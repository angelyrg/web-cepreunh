import React from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ImageSlider = () => {
  const data = {
    slides: [
      {
        id: 1,
        image: 'https://via.placeholder.com/800x400?text=Slide+1',
        alt: 'Descripción del Slide 1'
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/800x400?text=Slide+2',
        alt: 'Descripción del Slide 2'
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/800x400?text=Slide+3',
        alt: 'Descripción del Slide 3'
      }
    ]
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  }

  return (
    <div className="slider-container">
      <h2 className="text-xl font-semibold">Novedades</h2>
      <Slider {...settings}>
        {data.slides.map((slide) => (
          <div key={slide.id}>
            <img src={slide.image} alt={slide.alt} className="h-auto w-full" />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ImageSlider
