import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputLabel from '../InputLabel'
import Button from '../Button'

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
  const initialValues = {
    dni: '',
    nTransaccion: '',
    ciclo: ''
  }

  const handleSubmit = async (values) => {
    console.log(values)

    try {
      const response = await fetch('https://tu-endpoint.com/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const data = await response.json()

      // Redirigir a la nueva página y pasar los datos
      history.push({
        pathname: '/nueva-pagina', // Cambia esto a la ruta que necesitas
        state: { data } // Pasamos los datos a la nueva página
      })
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      // Manejar el error (puedes mostrar un mensaje al usuario)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="mx-auto rounded-lg border bg-white p-4 shadow-md">
          <h2 className="mb-4 text-lg font-bold">Formulario de Transacción</h2>

          <InputLabel label="DNI" name="dni" placeholder="Escribe tu DNI" maxLength="8" />

          <InputLabel
            label="Número de transacción"
            name="nTransaccion"
            placeholder="Número de transacción"
          />

          <InputLabel
            label="Ciclo académico"
            name="ciclo"
            options={[
              { value: '1', label: 'Ciclo Académico 2025 II' },
              { value: '2', label: 'Ciclo Académico 2025 III' },
              { value: '3', label: 'Ciclo Intensivo 2025' }
            ]}
          />

          <Button value="Consultar" type="submit" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  )
}

export default ValidationForm
