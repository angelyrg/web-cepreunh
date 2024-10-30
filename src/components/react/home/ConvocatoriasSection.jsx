import React from 'react'

import ArrowTopRightIcon from '../icons/ArrowTopRightIcon'

const convocatoriasTipos = [
  {
    icono: <img src="/assets/icons/copa-icon.png" alt="Copa Icono" className="h-10 w-10" />,
    descripcion: 'Concurso público de méritos',
    link: '#'
  },
  {
    icono: <img src="/assets/icons/megafono-icon.png" alt="Copa Icono" className="h-10 w-10" />,
    descripcion: 'Convocatoria CAS',
    link: '#'
  },
  {
    icono: <img src="/assets/icons/maleta-icon.png" alt="Copa Icono" className="h-10 w-10" />,
    descripcion: 'Prácticas profesionales',
    link: '#'
  },
  {
    icono: (
      <img src="/assets/icons/persona-corbata-icon.png" alt="Copa Icono" className="h-10 w-10" />
    ),
    descripcion: 'Nombramiento Docente',
    link: '#'
  },
  {
    icono: <img src="/assets/icons/lupa-persona-icon.png" alt="Copa Icono" className="h-10 w-10" />,
    descripcion: 'Convocatoria Docente',
    link: '#'
  }
]

function ConvocatoriaItem({ descripcion, icono, link = '#' }) {
  return (
    <a className="rounded-xl bg-white p-4 shadow-lg" href={link}>
      <div className="flex h-full max-w-6xl flex-col">
        <div className="mb-3 text-3xl text-primary-800">{icono}</div>
        <div className="flex flex-grow items-end justify-between text-gray-800">
          <div className="font-noto text-2xl font-bold">{descripcion}</div>
          <div className="text-3xl">
            <ArrowTopRightIcon />
          </div>
        </div>
      </div>
    </a>
  )
}

function ConvocatoriasSection() {
  return (
    <div className="px-4 py-8 sm:px-6 xl:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="font-noto text-4xl font-bold text-primary-800">Nuevas convocatorias</h1>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {convocatoriasTipos.map((convocatoria, index) => (
            <ConvocatoriaItem
              key={index}
              descripcion={convocatoria.descripcion}
              icono={convocatoria.icono}
              link={convocatoria.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConvocatoriasSection
