import React from 'react'
import { CalendarIcon } from '../icons/CalendarIcon'

const noticiasData = [
  {
    image: '/assets/images/sede1.png',
    fecha: 'Hace 2 meses',
    titular:
      'Más de 600 estudiantes del CEPRE rindieron el último examen para el ingreso a la UNH - Universidad Nacional de Huancavelica'
  },
  {
    image: '/assets/images/sede2.png',
    fecha: 'Hace 3 meses',
    titular:
      'Más de 600 estudiantes del CEPRE rindieron el último examen para el ingreso a la UNH - Universidad Nacional de Huancavelica'
  },
  {
    image: '/assets/images/sede3.png',
    fecha: 'Hace 4 meses',
    titular:
      'Más de 600 estudiantes del CEPRE rindieron el último examen para el ingreso a la UNH - Universidad Nacional de Huancavelica'
  }
]

function NoticiaItem({ image, fecha, titular }) {
  return (
    <div className="mx-6 overflow-hidden rounded-xl border-2">
      <div>
        <img src={image} className="h-auto w-full" alt="" draggable="false" />
      </div>
      <div className="mx-3 mb-3 rounded-xl bg-white">
        <div className="flex gap-2">
          <span className="mr-1">
            <CalendarIcon />
          </span>
          <span>{fecha}</span>
        </div>
        <h2 className="font-noto text-xl font-bold text-primary-800">{titular}</h2>
      </div>
    </div>
  )
}

function NoticiasSection() {
  return (
    <div className="px-4 py-8 sm:px-6 xl:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-noto text-4xl font-bold text-primary-800">Sedes</h1>
          <a href="#" className="text-center text-primary-800 hover:font-semibold">
            Ver todos
          </a>
        </div>
        <div className="sm flex gap-2 overflow-hidden">
          {noticiasData.map((sede, index) => (
            <NoticiaItem key={index} image={sede.image} fecha={sede.fecha} titular={sede.titular} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NoticiasSection
