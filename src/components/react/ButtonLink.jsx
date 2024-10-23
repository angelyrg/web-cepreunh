// ButtonLink.js
import React from 'react'

const ButtonLink = ({ href, children, className = '' }) => {
  return (
    <a
      href={href}
      className={`flex items-center justify-between rounded-full bg-primary-900 px-3 py-2 text-white hover:bg-primary-800 ${className}`}>
      {children}
    </a>
  )
}

export default ButtonLink
