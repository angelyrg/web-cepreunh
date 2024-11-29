import React, { useEffect, useState } from 'react'

export default function Popup() {
  const [isOpen, setIsOpen] = useState(true)
  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const [popups, setPopups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPopups = async () => {
    try {
      const response = await fetch('/data/popups.json')
      if (!response.ok) {
        throw new Error('Error al cargar popups')
      }
      const data = await response.json()
      setPopups(data)
      console.log(data)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPopups()
  }, [])

  if (error) return <div>No se pudo obtener las noticias</div>

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative min-w-80 max-w-60 rounded-lg bg-white shadow-lg">
            <button
              onClick={closeDialog}
              className="size- absolute right-2 z-[10] mt-2 rounded-full border-2 border-primary-800 bg-primary-800/30 px-4 py-2 pt-2 text-lg text-primary-800">
              ✖
            </button>

            <a href="https://tinyurl.com/2anl87cr" target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/images/popups/II examen cepre 2025.jpg"
                className="w-full rounded-lg"
                alt=""
              />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
