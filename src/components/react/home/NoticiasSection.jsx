import React, { useEffect, useState } from 'react'
import NoticiaItem from '../noticias/NoticiaItem'

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

  if (error) return <div>No se pudo obtener las noticias</div>

  return (
    <section className="bg-[#F7FBFE] px-4 py-8 sm:px-6 xl:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-noto text-4xl font-bold text-primary-800">Noticias recientes</h1>
          <a href="/noticias" className="text-center text-primary-800 hover:font-semibold">
            Ver todos
          </a>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.slice(0, 3).map((noticia, index) => (
            <NoticiaItem
              key={index}
              image={noticia.image}
              fecha={noticia.fecha}
              titular={noticia.titular}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NoticiasSection
