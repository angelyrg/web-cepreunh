import React from 'react'
import Document1Icon from '../icons/Document1Icon'
import { LocationIcon } from '../icons/LocationIcon'

const sedesData = [
  {
    nombre: 'Sede Principal',
    image: '/assets/images/sede1.png',
    direccion: '123 Calle Principal, Ciudad, País'
  },
  {
    nombre: 'Sede Secundaria',
    image: '/assets/images/sede2.png',
    direccion: '456 Avenida Secundaria, Ciudad, País'
  },
  {
    nombre: 'Sede Terciaria',
    image: '/assets/images/sede3.png',
    direccion: '789 Calle Terciaria, Ciudad, País'
  }
]

function SedeItem({ nombre, image, direccion }) {
  return (
    <div className="relative mx-6 overflow-hidden rounded-xl">
      <img src={image} alt={nombre} className="h-auto w-full" draggable="false" />
      <div className="absolute bottom-0 left-0 right-0 mx-3 mb-3 rounded-xl bg-white bg-opacity-50">
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
          {sedesData.map((sede, index) => (
            <SedeItem
              key={index}
              nombre={sede.nombre}
              image={sede.image}
              direccion={sede.direccion}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SedesSection
