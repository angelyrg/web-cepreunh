import React from 'react'
import { Field, ErrorMessage } from 'formik'

const InputLabel = ({ label, name, type = 'text', placeholder, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === 'checkbox' ? (
        <div className="mt-2 flex items-center">
          <Field
            type={type}
            name={name}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            {...props}
          />
          <span className="ml-2 text-sm text-gray-700">{label}</span>
        </div>
      ) : (
        <Field
          type={type}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-primary-800"
          placeholder={placeholder}
          {...props}
        />
      )}
      <ErrorMessage component="span" name={name} className="text-sm text-red-500" />
    </div>
  )
}

export default InputLabel
