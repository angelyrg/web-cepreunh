import React from 'react'

function Button({ value, onClick, type = 'button', className = '', disabled = false, ...props }) {
  return (
    <button
      type={type}
      className={`rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        disabled ? 'cursor-not-allowed bg-gray-400' : 'bg-primary-800 hover:bg-primary-700'
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}>
      {value}
    </button>
  )
}

export default Button
