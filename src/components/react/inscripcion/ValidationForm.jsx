import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
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
  const [ciclos, setCiclos] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const initialValues = {
    dni: '',
    nTransaccion: '',
    ciclo: ''
  }

  const handleSubmit = async (values, { setErrors }) => {
    const validationApi = `${apiUrl}/matricula_virtual/validacion`
    try {
      setErrorMessage('')
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
        setErrorMessage(errorMessage)
        return
      }
      setErrorMessage('')

      const uuid = data.uuid
      window.location.href = `/inscripcion/datos-personales?data=${encodeURIComponent(uuid)}`
    } catch (error) {
      console.error('Error al hacer la petición:', error)
      setErrorMessage('Ocurrió un error inesperado. Por favor, intenta de nuevo.')
    }
  }

  useEffect(() => {
    const fetchCiclos = async () => {
      try {
        const response = await fetch(`${apiUrl}/matricula_virtual/ciclos`)
        const data = await response.json()

        if (data.success) {
          const opciones = data.ciclos.map((ciclo) => ({
            value: ciclo.id,
            label: ciclo.descripcion
          }))
          setCiclos(opciones)
        } else {
          console.error('Error al obtener ciclos:', data.message)
        }
      } catch (error) {
        console.error('Error al hacer la petición de ciclos:', error)
      }
    }

    fetchCiclos()
  }, [apiUrl])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <Form className="mx-auto bg-white">
          {errorMessage && (
            <div className="my-3 rounded-md border border-red-200 bg-red-100 px-4 py-2 text-red-700">
              {errorMessage}
            </div>
          )}
          <InputLabel label="DNI" name="dni" placeholder="Escribe tu DNI" maxLength="8" />
          <InputLabel
            label="Número de transacción"
            name="nTransaccion"
            placeholder="Número de transacción"
          />
          <SelectLabel
            label="Ciclo académico"
            name="ciclo"
            options={ciclos}
            onChange={(e) => {
              setFieldValue('ciclo', e.target.value)
            }}
          />
          <Button value="Consultar" type="submit" className="px-6" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  )
}

export default ValidationForm
