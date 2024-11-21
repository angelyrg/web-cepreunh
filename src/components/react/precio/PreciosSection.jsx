import React from 'react'

const precios = {
  ciclo: 'Ciclo Regular 2025-I',
  items: [
    {
      name: 'Regular',
      precio: 800.0,
      descripcion: 'Precio regular'
    },
    {
      name: 'Por partes',
      precio: 800.0,
      descripcion: 'Primera cuota: S/500.00'
    },
    {
      name: 'Por partes',
      precio: 800.0,
      descripcion: 'Primera cuota: S/500.00'
    }
  ]
}

function PriceItem({ name, precio, descripcion }) {
  return (
    <div className="mx-auto h-full w-full rounded-lg bg-white px-6 py-4 shadow-lg">
      <h5 className="text-center text-lg text-primary-800">{name}</h5>
      <div className="mt-2 text-center">
        <p className="text-xl font-bold text-primary-800">S/{precio}</p>
        <p className="">{descripcion}</p>
      </div>
    </div>
  )
}

function PreciosSection() {
  return (
    <section className="mx-auto max-w-6xl py-8 sm:px-6 xl:px-0">
      <div className="mt-8 rounded-xl bg-[#F0F4F7] p-5">
        <p className="text-sm text-gray-500">Ciclo aperturado</p>
        <h5 className="font-semibold text-primary-800">{precios.ciclo}</h5>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {precios.items.map((item, index) => (
            <PriceItem
              key={index}
              name={item.name}
              precio={item.precio}
              descripcion={item.descripcion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PreciosSection
