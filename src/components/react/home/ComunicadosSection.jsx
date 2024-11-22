import React, { useEffect, useState } from 'react'
import Document1Icon from '../icons/Document1Icon'

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
  const [comunicados, setComunicados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchComunicados = async () => {
    try {
      const response = await fetch('/data/comunicados.json')
      if (!response.ok) {
        throw new Error('Error al cargar los comunicados')
      }
      const data = await response.json()
      setComunicados(data)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComunicados()
  }, [])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>No se pudo obtener comunicados</div>

  return (
    <section className="bg-[#F7FBFE] px-4 py-8 sm:px-6 xl:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-noto text-4xl font-bold text-primary-800">Comunicados</h1>
          <a href="#" className="text-center text-primary-800 hover:font-semibold">
            Ver todos
          </a>
        </div>
        <div className="flex flex-wrap gap-3 sm:flex-nowrap">
          {comunicados.slice(0, 3).map((comunicado, index) => (
            <ComunicadoItem
              key={index}
              titulo={comunicado.titulo}
              fecha={comunicado.fecha}
              archivo={comunicado.archivo}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ComunicadosSection
