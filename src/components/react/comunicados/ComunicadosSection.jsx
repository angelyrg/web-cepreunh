import React, { useEffect, useState } from 'react'
import ComunicadoItem from './ComunicadoItem'

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
    <div className="mx-auto max-w-6xl">
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
  )
}

export default ComunicadosSection
