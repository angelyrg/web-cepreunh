import React, { useEffect, useState } from 'react'
import NoticiaItem from './NoticiaItem'

function NoticiasContent() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNoticias = async () => {
    try {
      const response = await fetch('/data/noticias.json')
      if (!response.ok) {
        throw new Error('Error al cargar las noticias')
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
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {noticias.map((noticia, index) => (
          <NoticiaItem
            key={index}
            image={noticia.image}
            fecha={noticia.fecha}
            titular={noticia.titular}
          />
        ))}
      </div>
    </div>
  )
}

export default NoticiasContent
