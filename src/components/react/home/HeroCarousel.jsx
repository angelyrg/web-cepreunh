import React from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HeroCarousel = () => {
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
    slidesToScroll: 1
  }

  return (
    <div className="slider-container">
      <h2 className="text-xl font-semibold">Novedades</h2>

      <Slider {...settings}></Slider>

      {/* <Slider {...settings}>
        <div>
          <h3>Slide 1</h3>
        </div>
        <div>
          <h3>Slide 2</h3>
        </div>
        <div>
          <h3>Slide 3</h3>
        </div>
      </Slider> */}

      {/* <Slider {...settings}>
        {data.slides.map((slide) => (
          <div key={slide.id}>
            <img src={slide.image} alt={slide.alt} className="h-auto w-full" />
          </div>
        ))}
      </Slider> */}
    </div>
  )
}

export default HeroCarousel
