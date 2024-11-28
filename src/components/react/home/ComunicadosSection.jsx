import React, { useEffect, useState } from 'react'
import ComunicadoItem from '../comunicados/ComunicadoItem'

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

  if (error) return <div>No se pudo obtener comunicados</div>

  return (
    <section className="bg-[#F7FBFE] px-4 py-8 sm:px-6 xl:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between align-middle">
          <h1 className="font-noto text-4xl font-bold text-primary-800">Comunicados</h1>
          <a href="/comunicados" className="text-center text-primary-800 hover:font-semibold">
            Ver todos
          </a>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
