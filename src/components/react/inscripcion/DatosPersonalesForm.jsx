import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import InputLabel from '../InputLabel'
import SelectLabel from '../SelectLabel'
import Button from '../Button'

import paises from '../../../../data/paises.json'

const validationSchema = Yup.object().shape({
  // id: Yup.string().required('El ID es requerido'),
  tipo_documento_id: Yup.string().required('El tipo de documento es requerido'),
  nro_documento: Yup.string()
    .required('El número de documento es requerido')
    .matches(/^[0-9]+$/, 'El número de documento debe ser solo números'),
  nombres: Yup.string()
    .required('El nombre es requerido')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  apellido_paterno: Yup.string()
    .required('El apellido paterno es requerido')
    .max(100, 'El apellido paterno no puede exceder los 100 caracteres'),
  apellido_materno: Yup.string().max(
    100,
    'El apellido materno no puede exceder los 100 caracteres'
  ),
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
  correo_personal: Yup.string()
    .required('El correo personal es requerido')
    .email('El correo personal debe ser un correo válido'),
  correo_institucional: Yup.string().email('El correo institucional debe ser un correo válido'),

  // Cambios en la validación de colegio
  colegio_id: Yup.string().required('El ID del colegio es requerido'),
  year_culminacion: Yup.number()
    .required('El año de culminación es requerido')
    .min(1900, 'El año debe ser mayor a 1900')
    .max(new Date().getFullYear(), `El año no puede ser mayor a ${new Date().getFullYear()}`),

  // Validaciones de ubigeo
  ubigeodepartamento_id: Yup.string().required('El departamento es requerido'),
  ubigeoprovincia_id: Yup.string().required('La provincia es requerida'),
  ubigeodistrito_id: Yup.string().required('El distrito es requerido'),
  direccion: Yup.string().required('La dirección es requerida'),

  // Si deseas incluir la validación del apoderado
  apoderado_id: Yup.string().nullable() // Puedes ajustar según sea necesario
  // estado: Yup.string().oneOf(['activo', 'inactivo'], 'El estado debe ser "activo" o "inactivo"')
})

const apiClient = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params })
    return response.data
  } catch (error) {
    console.error('Error en la petición:', error)
    throw error
  }
}

const DatosPersonalesForm = () => {
  const apiUrl = import.meta.env.PUBLIC_API_URL
  const [initialValues, setInitialValues] = useState({
    id: '',
    tipo_documento_id: '',
    nro_documento: '',
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    pais_nacimiento: 'Perú',
    nacionalidad: 'Peruano',
    telefono_personal: '',
    whatsapp: '',
    correo_personal: '',
    correo_institucional: '',

    ubigeodepartamento_id: '',
    ubigeoprovincia_id: '',
    ubigeodistrito_id: '',
    direccion: '',

    colegio_id: '',
    year_culminacion: '',

    apoderado_id: '',

    estado: ''
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const uuid = params.get('data')

    const fetchMatriculaData = async () => {
      if (uuid) {
        const data = await fetchData(`/matricula_virtual/getMatriculaByUUID/${uuid}`)
        const estudiante = data.data.estudiante
        setInitialValues({
          id: estudiante.id || '',
          tipo_documento_id: estudiante.tipo_documento_id || '',
          nro_documento: estudiante.nro_documento || '',
          nombres: estudiante.nombres || '',
          apellido_paterno: estudiante.apellido_paterno || '',
          apellido_materno: estudiante.apellido_materno || '',
          pais_nacimiento: estudiante.pais_nacimiento || 'Perú',
          nacionalidad: estudiante.nacionalidad || 'Peruano',
          telefono_personal: estudiante.telefono_personal || '',
          whatsapp: estudiante.whatsapp || '',
          correo_personal: estudiante.correo_personal || '',
          correo_institucional: estudiante.correo_institucional || '',
          ubigeodepartamento_id: estudiante.ubigeodepartamento_id || '',
          ubigeoprovincia_id: estudiante.ubigeoprovincia_id || '',
          ubigeodistrito_id: estudiante.ubigeodistrito_id || '',
          direccion: estudiante.direccion || '',
          colegio_id: estudiante.colegio_id || '',
          year_culminacion: estudiante.year_culminacion || '',
          apoderado_id: estudiante.apoderado_id || '',
          estado: estudiante.estado || ''
        })
      } else {
        window.location.href = '/inscripcion'
      }
    }

    fetchMatriculaData()

    console.log('initialValues: ', initialValues)
  }, [apiUrl])

  // Ubicacion Geográfica
  const [departamentos, setDepartamentos] = useState([])
  const [provincias, setProvincias] = useState([])
  const [distritos, setDistritos] = useState([])
  const [selectedDepartamento, setSelectedDepartamento] = useState('')
  const [selectedProvincia, setSelectedProvincia] = useState('')

  // Obtener departamentos
  useEffect(() => {
    const getDepartamentos = async () => {
      try {
        const data = await fetchData('/common/ubigeos')
        setDepartamentos(data.data)
      } catch (error) {
        setDepartamentos([])
        console.error('No se pudieron obtener los ubigeos.')
      }
    }
    getDepartamentos()
    setProvincias([])
    setDistritos([])
  }, [])

  // Filtrar provincias según el departamento seleccionado
  useEffect(() => {
    if (selectedDepartamento) {
      const getProvincias = async () => {
        try {
          const data = await fetchData(`/common/ubigeos?departamento=${selectedDepartamento}`)
          setProvincias(data.data)
        } catch (error) {
          setProvincias([])
          console.error('No se pudieron obtener los ubigeos.')
        }
      }
      getProvincias()
      setDistritos([])
    }
  }, [selectedDepartamento])

  // Filtrar distritos según la provincia seleccionada
  useEffect(() => {
    if (selectedProvincia) {
      const getDistritos = async () => {
        try {
          const data = await fetchData(`/common/ubigeos?provincia=${selectedProvincia}`)
          setDistritos(data.data)
        } catch (error) {
          setDistritos([])
          console.error('No se pudieron obtener los ubigeos.')
        }
      }
      getDistritos()
    }
  }, [selectedProvincia])

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize>
      {({ isSubmitting, setFieldValue }) => (
        <Form className="mx-auto text-wrap rounded-lg border bg-white p-4 shadow-md">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h2 className="w-100 mb-4 font-medium text-primary-700">Datos personales</h2>
              <SelectLabel
                label="Tipo de documento"
                name="tipo_documento_id"
                options={[
                  { value: '1', label: 'DNI' },
                  { value: '2', label: 'Carnet de extranjería' }
                ]}
                onChange={(e) => {
                  setFieldValue('tipo_documento_id', e.target.value)
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
                name="ubigeodepartamento_id"
                options={departamentos.map((item) => ({
                  id: item.id,
                  value: item.name,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const dataID = selectedOption.getAttribute('data-id')
                  setSelectedDepartamento(dataID)
                  setFieldValue('ubigeodepartamento_id', e.target.value)
                  setFieldValue('ubigeoprovincia_id', '')
                  setFieldValue('ubigeodistrito_id', '')
                }}
              />

              <SelectLabel
                label="Provincia"
                name="ubigeoprovincia_id"
                options={provincias.map((item) => ({
                  id: item.id,
                  value: item.name,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const dataID = selectedOption.getAttribute('data-id')
                  setSelectedProvincia(dataID)
                  setFieldValue('ubigeoprovincia_id', e.target.value)
                  setFieldValue('ubigeodistrito_id', '')
                }}
              />
              <SelectLabel
                label="Distrito"
                name="ubigeodistrito_id"
                options={distritos.map((item) => ({
                  id: item.id,
                  value: item.name,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setFieldValue('ubigeodistrito_id', e.target.value)
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
