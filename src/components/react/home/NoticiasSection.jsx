import React, { useEffect, useState } from 'react'
import { CalendarIcon } from '../icons/CalendarIcon'

function NoticiaItem({ image, fecha, titular }) {
  return (
    <div className="overflow-hidden rounded-xl border-2">
      <div>
        <img src={image} className="h-auto w-full object-cover" alt="" draggable="false" />
      </div>
      <div className="mx-3 mb-3 flex flex-1 flex-col gap-3 rounded-xl bg-white">
        <div className="mt-3 flex items-center gap-2 text-primary-800">
          <span className="mr-1">
            <CalendarIcon />
          </span>
          <span>{fecha}</span>
        </div>
        <h2 className="font-noto text-xl font-bold text-[#2A2A2A]">{titular}</h2>
      </div>
    </div>
  )
}

function NoticiasSection() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNoticias = async () => {
    try {
      const response = await fetch('/data/noticias.json')
      if (!response.ok) {
        throw new Error('Error al cargar noticias')
      }
      const data = await response.json()
      setNoticias(data)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNoticias()
  }, [])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>No se pudo obtener las noticias</div>

  return (
    <section className="bg-[#F7FBFE] px-4 py-8 sm:px-6 xl:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-noto text-4xl font-bold text-primary-800">Noticias</h1>
          <a href="#" className="text-center text-primary-800 hover:font-semibold">
            Ver todos
          </a>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((sede, index) => (
            <NoticiaItem key={index} image={sede.image} fecha={sede.fecha} titular={sede.titular} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NoticiasSection
