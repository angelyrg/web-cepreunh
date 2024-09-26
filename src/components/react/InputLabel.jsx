import React from 'react'
import { Field, ErrorMessage } from 'formik'

const InputLabel = ({ label, name, type = 'text', placeholder, options, onChange, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {options ? (
        <Field
          as="select"
          name={name}
          onChange={onChange}
          {...props}
          className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="" label="Seleccione una opción" />
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={type}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          {...props}
        />
      )}
      <ErrorMessage component="span" name={name} className="text-sm text-red-500" />
    </div>
  )
}

export default InputLabel
