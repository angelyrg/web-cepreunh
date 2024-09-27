import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputLabel from '../InputLabel'
import SelectLabel from '../SelectLabel'
import Button from '../Button'

import paises from '../../../../data/paises.json'
import departamentos from '../../../../data/ubigeo/departamentos.json'
import provincias from '../../../../data/ubigeo/provincias.json'
import distritos from '../../../../data/ubigeo/distritos.json'

const validationSchema = Yup.object().shape({
  // id: Yup.string().required('El ID es requerido'),
  tipo_documento: Yup.string().required('El tipo de documento es requerido'),
  nro_documento: Yup.string()
    .required('El número de documento es requerido')
    .matches(/^[0-9]+$/, 'El número de documento debe ser solo números'),
  nombres: Yup.string()
    .required('El nombre es requerido')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  apellido_paterno: Yup.string()
    .required('El apellido paterno es requerido')
    .max(100, 'El apellido no puede exceder los 100 caracteres'),
  apellido_materno: Yup.string().max(100, 'El apellido no puede exceder los 100 caracteres'),
  pais_nacimiento: Yup.string().required('El país de nacimiento es requerido'),
  nacionalidad: Yup.string().required('La nacionalidad es requerida'),
  telefono_personal: Yup.string()
    .required('El teléfono personal es requerido')
    .matches(/^[0-9]+$/, 'El teléfono debe ser solo números')
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(15, 'El teléfono no puede exceder los 15 dígitos'),
  whatsapp: Yup.string()
    .matches(/^[0-9]+$/, 'El WhatsApp debe ser solo números')
    .min(9, 'El WhatsApp debe tener al menos 9 dígitos')
    .max(9, 'El WhatsApp no puede exceder los 9 dígitos'),
  telefono_apoderado: Yup.string()
    .matches(/^[0-9]*$/, 'El teléfono del apoderado debe ser solo números')
    .max(15, 'El teléfono del apoderado no puede exceder los 15 dígitos'),
  correo_personal: Yup.string()
    .required('El correo personal es requerido')
    .email('El correo personal debe ser un correo válido'),
  correo_institucional: Yup.string().email('El correo institucional debe ser un correo válido'),
  tipo_colegio: Yup.string().required('El tipo de colegio es requerido'),
  nombre_colegio: Yup.string().required('El nombre del colegio es requerido'),
  year_culminacion: Yup.number()
    .required('El año de culminación es requerido')
    .min(1900, 'El año debe ser mayor a 1900')
    .max(new Date().getFullYear(), `El año no puede ser mayor a ${new Date().getFullYear()}`),
  departamento: Yup.string().required('El departamento es requerido'),
  provincia: Yup.string().required('La provincia es requerida'),
  distrito: Yup.string().required('El distrito es requerido'),
  direccion: Yup.string().required('La dirección es requerida')
  // estado: Yup.string().oneOf(['activo', 'inactivo'], 'El estado debe ser "activo" o "inactivo"')
})

const DatosPersonalesForm = () => {
  const initialValues = {
    id: '1', //TODO: obtener del API
    tipo_documento: '',
    nro_documento: '',
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    pais_nacimiento: 'Perú',
    nacionalidad: 'Peruano',
    telefono_personal: '',
    whatsapp: '',
    telefono_apoderado: '',
    correo_personal: '',
    correo_institucional: '',
    tipo_colegio: '',
    nombre_colegio: '',
    year_culminacion: '',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '123',
    estado: 'activo'
  }

  const [selectedDepartamento, setSelectedDepartamento] = useState('')
  const [selectedProvincia, setSelectedProvincia] = useState('')
  const [filteredProvincias, setFilteredProvincias] = useState([])
  const [filteredDistritos, setFilteredDistritos] = useState([])

  // Filtrar provincias según el departamento seleccionado
  useEffect(() => {
    if (selectedDepartamento) {
      const provinciasFiltradas = provincias.filter(
        (provincia) => provincia.department_id === selectedDepartamento
      )

      setFilteredProvincias(
        provinciasFiltradas.map((item) => ({
          id: item.id,
          value: item.name,
          label: item.name
        }))
      )
      setSelectedProvincia('')
      setFilteredDistritos([])
    } else {
      setFilteredProvincias([])
      setFilteredDistritos([])
    }
  }, [selectedDepartamento])

  // Filtrar distritos según la provincia seleccionada
  useEffect(() => {
    if (selectedProvincia) {
      const distritosFiltrados = distritos.filter(
        (distrito) => distrito.province_id === selectedProvincia
      )
      setFilteredDistritos(
        distritosFiltrados.map((item) => ({
          id: item.id,
          value: item.name,
          label: item.name
        }))
      )
    } else {
      setFilteredDistritos([])
    }
  }, [selectedProvincia])

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <Form className="mx-auto text-wrap rounded-lg border bg-white p-4 shadow-md">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h2 className="w-100 mb-4 font-medium text-primary-700">Datos personales</h2>
              <SelectLabel
                label="Tipo de documento"
                name="tipo_documento"
                options={[
                  { value: '1', label: 'DNI' },
                  { value: '2', label: 'Carnet de extranjería' }
                ]}
                onChange={(e) => {
                  setFieldValue('tipo_documento', e.target.value)
                }}
              />
              <InputLabel
                label="Número de documento"
                name="nro_documento"
                placeholder="Número de documento"
              />
              <InputLabel label="Nombres" name="nombres" placeholder="Nombres" />
              <InputLabel
                label="Apellido paterno"
                name="apellido_paterno"
                placeholder="Apellido paterno"
              />
              <InputLabel
                label="Apellido materno"
                name="apellido_materno"
                placeholder="Apellido materno"
              />
              <SelectLabel
                label="País de nacimiento"
                name="pais_nacimiento"
                options={paises.map((pais) => ({
                  id: pais.code,
                  value: pais.es_name,
                  label: pais.es_name
                }))}
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const dataLabel = selectedOption.getAttribute('data-label')
                  setFieldValue('pais_nacimiento', dataLabel)
                }}
              />
              <SelectLabel
                label="Nacionalidad"
                name="nacionalidad"
                options={paises.map((pais) => ({
                  id: pais.code,
                  value: pais.nationality,
                  label: pais.nationality
                }))}
                onChange={(e) => {
                  setFieldValue('nacionalidad', e.target.value)
                }}
              />
            </div>
            <div>
              <h2 className="w-100 mb-3 font-medium text-primary-700">Datos de contacto</h2>
              <InputLabel
                type="tel"
                label="Teléfono Personal"
                name="telefono_personal"
                placeholder="Teléfono personal"
              />
              <InputLabel label="Whatsapp" name="whatsapp" placeholder="Whatsapp" />
              <InputLabel
                type="tel"
                label="Telefono del Apoderado"
                name="telefono_apoderado"
                placeholder="Telefono del Apoderado"
              />
              <InputLabel
                type="email"
                label="Correo personal"
                name="correo_personal"
                placeholder="Correo personal"
              />
              <InputLabel
                type="email"
                label="Correo institucional"
                name="correo_institucional"
                placeholder="Correo institucional"
              />

              <h2 className="w-100 mb-3 font-medium text-primary-700">Datos de estudio</h2>
              <SelectLabel
                label="Tipo colegio"
                name="tipo_colegio"
                options={[
                  { value: '1', label: 'Público' },
                  { value: '2', label: 'Privado' }
                ]}
                onChange={(e) => {
                  setFieldValue('tipo_colegio', e.target.value)
                }}
              />
              <InputLabel
                label="Nombre del colegio"
                name="nombre_colegio"
                placeholder="Nombre del colegio"
              />
              <InputLabel
                type="number"
                label="Año de culminación"
                name="year_culminacion"
                placeholder="Año de culminación"
                maxLength="4"
              />
            </div>
            <div>
              <h2 className="w-100 mb-3 font-medium text-primary-700">Datos de ubicación</h2>

              <SelectLabel
                label="Departamento"
                name="departamento"
                options={departamentos.map((item) => ({
                  id: item.id,
                  value: item.name,
                  label: item.name
                }))}
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const dataID = selectedOption.getAttribute('data-id')
                  setSelectedDepartamento(dataID)
                  setFieldValue('departamento', e.target.value)
                  setFieldValue('provincia', '')
                  setFieldValue('distrito', '')
                }}
              />
              <SelectLabel
                label="Provincia"
                name="provincia"
                options={filteredProvincias}
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const dataID = selectedOption.getAttribute('data-id')
                  setSelectedProvincia(dataID)
                  setFieldValue('provincia', e.target.value)
                  setFieldValue('distrito', '')
                }}
              />
              <SelectLabel
                label="Distrito"
                name="distrito"
                options={filteredDistritos}
                onChange={(e) => {
                  setFieldValue('distrito', e.target.value)
                }}
              />

              <InputLabel label="Dirección" name="direccion" placeholder="Dirección" />
            </div>
          </div>

          <Button value="Enviar" type="submit" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  )
}

export default DatosPersonalesForm
