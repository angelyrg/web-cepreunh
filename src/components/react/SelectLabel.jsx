import React from 'react'
import { Field, ErrorMessage } from 'formik'

const SelectLabel = ({ label, name, options, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-primary-800"
        onChange={onChange}>
        <option value="" label="Seleccione una opción" />
        {options.map((option) => (
          <option
            key={option.id ? option.id : option.value}
            value={option.value}
            data-label={option.label}
            data-id={option.id ? option.id : option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage component="span" name={name} className="text-sm text-red-500" />
    </div>
  )
}

export default SelectLabel
