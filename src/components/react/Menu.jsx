import React, { useState } from 'react'
import MenuIcon from './icons/MenuIcon'
import CloseIcon from './icons/CloseIcon'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="w-full bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-lg font-bold text-gray-800">
                CepreUNH
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:justify-between">
            <div className="flex space-x-4">
              <a
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200">
                Inicio
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200">
                Nosotros
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200">
                Contacto
              </a>
            </div>
          </div>
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>
      {/* Menú móvil */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-200">
              Inicio
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-200">
              Nosotros
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-200">
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Menu
