import React from 'react'

import ArrowTopRightIcon from '../icons/ArrowTopRightIcon'

const convocatoriasTipos = [
  {
    icono: <img src="/assets/icons/copa-icon.png" alt="Copa Icono" className="h-10 w-10" />,
    custom_class: 'hover:bg-[#FFE2FD]',
    descripcion: 'Concurso público de méritos',
    link: '#'
  },
  {
    icono: <img src="/assets/icons/megafono-icon.png" alt="megafono Icono" className="h-10 w-10" />,
    custom_class: 'hover:bg-[#E4F4FF]',
    descripcion: 'Convocatoria CAS',
    link: '#'
  },
  {
    icono: <img src="/assets/icons/maleta-icon.png" alt="maleta Icono" className="h-10 w-10" />,
    custom_class: 'hover:bg-[#FFF0CC]',
    descripcion: 'Prácticas profesionales',
    link: '#'
  },
  {
    icono: (
      <img
        src="/assets/icons/persona-corbata-icon.png"
        alt="persona-corbata Icono"
        className="h-10 w-10"
      />
    ),
    custom_class: 'hover:bg-[#FFF0E3]',
    descripcion: 'Nombramiento Docente',
    link: '#'
  },
  {
    icono: (
      <img
        src="/assets/icons/lupa-persona-icon.png"
        alt="lupa-persona Icono"
        className="h-10 w-10"
      />
    ),
    custom_class: 'hover:bg-[#FFE2EC]',
    descripcion: 'Convocatoria Docente',
    link: '#'
  }
]

function ConvocatoriaItem({ descripcion, icono, customClass = '', link = '#' }) {
  return (
    <a className={`rounded-xl bg-white p-4 shadow-lg transition-all ${customClass}`} href={link}>
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
    <section className="px-4 py-8 sm:px-6 xl:px-0">
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
              customClass={convocatoria.custom_class}
              link={convocatoria.link}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConvocatoriasSection
