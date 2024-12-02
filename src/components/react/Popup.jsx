import React, { useEffect, useState } from 'react'

export default function Popup() {
  const [isOpen, setIsOpen] = useState(true)
  const [closing, setClosing] = useState(false)
  const openDialog = () => setIsOpen(true)
  const closeDialog = () => {
    setClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setClosing(false)
    }, 150)
  }

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
          <div
            className={`relative w-full max-w-2xl rounded-lg bg-white shadow-lg animate-duration-100 lg:w-[40vw] ${closing ? 'animate-fade-out-up' : ''}`}>
            <button
              onClick={closeDialog}
              className="absolute right-2 z-[10] mt-2 rounded-full border border-primary-800 bg-primary-800/10 px-2 py-1 text-primary-800 hover:bg-primary-800/20">
              ✖
            </button>

            <a
              href="https://drive.google.com/file/d/1edOFJ6ycZVYe2w9HIQli_5q1FvTDGw93/view"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="/assets/images/popups/Adminsion2025I.jpg"
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
