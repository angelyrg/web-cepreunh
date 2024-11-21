import React from 'react'

const autoridadesDirectorio = [
  {
    name: 'Jhon Mayco ',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  },
  {
    name: 'Jhon Mayco ',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  },
  {
    name: 'Jhon Mayco ',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  }
]

const administrativosDirectorio = [
  {
    name: 'Arnaldo Virgilio Capcha Huamani',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  },
  {
    name: 'Jhon Mayco ',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  },
  {
    name: 'Arnaldo Virgilio Capcha Huamani',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  },
  {
    name: 'Jhon Mayco ',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  },
  {
    name: 'Arnaldo Virgilio Capcha Huamani',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  },
  {
    name: 'Jhon Mayco ',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  },
  {
    name: 'Jhon Mayco ',
    position: 'Cordinador TIC',
    image: '/assets/images/autoridad-default.png'
  }
]

function AutoridadItem({ name, position, image }) {
  return (
    <div className="mx-auto mb-10 max-w-60">
      <img src={image} className="w-full rounded-lg" alt={name} />
      <div className="mt-2 text-center">
        <p className="text-lg">{name}</p>
        <p className="text-[#616161]">{position}</p>
      </div>
    </div>
  )
}

function AutoridadesSection() {
  return (
    <section className="mx-auto max-w-6xl py-8 sm:px-6 xl:px-0">
      <div className="mt-8">
        <div className="mb-6">
          <h1 className="text-3xl text-primary-800">Directorio</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          {autoridadesDirectorio.map((autoridad, index) => (
            <AutoridadItem
              key={index}
              name={autoridad.name}
              position={autoridad.position}
              image={autoridad.image}
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <div className="mb-10">
          <h1 className="text-3xl text-primary-800">Personal administrativo</h1>
        </div>
        <div className="flex flex-wrap justify-start gap-3">
          {administrativosDirectorio.map((autoridad, index) => (
            <AutoridadItem
              key={index}
              name={autoridad.name}
              position={autoridad.position}
              image={autoridad.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AutoridadesSection
