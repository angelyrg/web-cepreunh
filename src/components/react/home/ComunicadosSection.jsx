import React from 'react'
import Document1Icon from '../icons/Document1Icon'

const comunicadosData = [
  {
    titulo: 'Resultados del primer examen de selección regular 2024',
    fecha: '12/10/2024',
    archivo: '#'
  },
  {
    titulo: 'Resultados del segundo examen de selección regular 2024',
    fecha: '13/10/2024',
    archivo: '#'
  },
  {
    titulo: 'Resultados del tercer examen de selección regular 2024',
    fecha: '14/10/2024',
    archivo: '#'
  },
  {
    titulo: 'Resultados del tercer examen de selección regular 2024',
    fecha: '15/10/2024',
    archivo: '#'
  }
]

function ComunicadoItem({ titulo, fecha, archivo = '#' }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-lg">
      <div className="mx-auto max-w-6xl">
        <div className="flex border-b-2">
          <div className="text-3xl text-primary-800">
            <Document1Icon />
          </div>
          <div className="mb-3 ml-3">
            <h3 className="mb-3 leading-5 text-gray-900">{titulo}</h3>
            <p className="text-gray-500">{fecha}</p>
          </div>
        </div>
        <div className="flex">
          <a
            href={archivo}
            className="flex-1 border-r-2 pt-2 text-center text-primary-800 hover:font-semibold"
            download={true}>
            Descargar
          </a>
          <a
            href={archivo}
            className="flex-1 pt-2 text-center text-primary-800 hover:font-semibold">
            Ver
          </a>
        </div>
      </div>
    </div>
  )
}

function ComunicadosSection() {
  return (
    <div className="bg-[#F7FBFE] px-4 py-8 sm:px-6 xl:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-noto text-4xl font-bold text-primary-800">Comunicados</h1>
          <a href="#" className="text-center text-primary-800 hover:font-semibold">
            Ver todos
          </a>
        </div>
        <div className="flex flex-wrap gap-3 sm:flex-nowrap">
          {comunicadosData.slice(0, 3).map((comunicado, index) => (
            <ComunicadoItem
              key={index}
              titulo={comunicado.titulo}
              fecha={comunicado.fecha}
              archivo={comunicado.archivo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComunicadosSection
