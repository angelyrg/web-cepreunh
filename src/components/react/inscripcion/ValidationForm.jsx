import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputLabel from '../InputLabel'
import Button from '../Button'
import SelectLabel from '../SelectLabel'

const validationSchema = Yup.object().shape({
  dni: Yup.string()
    .required('El DNI es requerido')
    .matches(/^[0-9]{8}$/, 'El DNI debe tener 8 dígitos'),
  nTransaccion: Yup.string()
    .required('El número de transacción es requerido')
    .max(20, 'El número de transacción no puede exceder los 20 caracteres'),
  ciclo: Yup.string().required('El ciclo es requerido')
})

const ValidationForm = () => {
  const apiUrl = import.meta.env.PUBLIC_API_URL

  const initialValues = {
    dni: '',
    nTransaccion: '',
    ciclo: ''
  }

  const handleSubmit = async (values, { setErrors }) => {
    const validationApi = `${apiUrl}/matricula_virtual/validacion`
    try {
      const response = await fetch(validationApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dni: values.dni,
          nTransaccion: values.nTransaccion,
          ciclo: values.ciclo
        })
      })

      const data = await response.json()

      if (!response.ok) {
        const errors = data.errors || {}
        const errorMessage = data.message || 'Error en la petición'
        setErrors(errors)
        throw new Error(errorMessage)
      }

      console.log('Respuesta de la API:', data)
      //TODO: Redirigir a la siguiente pantalla

    } catch (error) {
      console.error('Error al hacer la petición:', error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <Form className="mx-auto bg-white p-4">
          <InputLabel label="DNI" name="dni" placeholder="Escribe tu DNI" maxLength="8" />

          <InputLabel
            label="Número de transacción"
            name="nTransaccion"
            placeholder="Número de transacción"
          />

          <SelectLabel
            label="Ciclo académico"
            name="ciclo"
            options={[
              { value: '1', label: 'Ciclo Académico 2025 II' },
              { value: '2', label: 'Ciclo Académico 2025 III' },
              { value: '3', label: 'Ciclo Intensivo 2026' }
            ]}
            onChange={(e) => {
              setFieldValue('ciclo', e.target.value)
            }}
          />

          <Button value="Consultar" type="submit" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  )
}

export default ValidationForm
