import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'

const MultiSelectLabel = ({ label, name, options, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSearch = (event) => {
    const { value } = event.target
    setSearchTerm(value)

    if (onSearch) {
      setLoading(true)
      onSearch({
        inputValue: value,
        originalItems: options,
        setItems: (newItems) => {
          setLoading(false)
          options = newItems // Actualiza las opciones
        }
      })
    }
  }

  const handleSelect = (option) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option.value)) {
        return prev.filter((value) => value !== option.value)
      }
      return [...prev, option.value]
    })
    setSearchTerm('') // Limpiar el campo de búsqueda
    setIsOpen(false) // Cerrar el dropdown
  }

  const handleBadgeRemove = (value) => {
    setSelectedOptions((prev) => prev.filter((v) => v !== value))
  }

  const filteredOptions = options.filter((option) => !selectedOptions.includes(option.value))

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="mb-2 flex flex-wrap">
          {selectedOptions.map((value) => {
            const option = options.find((opt) => opt.value === value)
            return (
              <span key={value} className="mb-2 mr-2 rounded-md bg-blue-200 px-2 text-blue-800">
                {option.label}
                <button
                  type="button"
                  onClick={() => handleBadgeRemove(value)}
                  className="ml-1 text-blue-600 hover:text-blue-800">
                  &times;
                </button>
              </span>
            )
          })}
        </div>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          onClick={toggleDropdown}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-primary-800"
        />
        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300">
            {loading ? (
              <span className="text-sm text-gray-500">Cargando...</span>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.id ? option.id : option.value}
                  className={`cursor-pointer p-2 hover:bg-gray-200`}
                  onClick={() => handleSelect(option)}>
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <ErrorMessage component="span" name={name} className="text-sm text-red-500" />
    </div>
  )
}

export default MultiSelectLabel
