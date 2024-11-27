import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import InputLabel from '../InputLabel'
import SelectLabel from '../SelectLabel'
import Button from '../Button'

import MultiSelectLabel from '../MultipleSelectLabel'

const options = [
  { id: 1, label: 'Opción 1', value: 'opcion1' },
  { id: 2, label: 'Opción 2', value: 'opcion2' },
  { id: 3, label: 'Opción 3', value: 'opcion3' }
  // ... otras opciones
]

const validationSchema = Yup.object().shape({
  selectedOptions: Yup.array().min(1, 'Selecciona al menos una opción'), //TODO: REMOVE

  // id: Yup.string().required('El ID es requerido'),
  tipo_documento_id: Yup.string().required('El tipo de documento es requerido'),
  nro_documento: Yup.string()
    .required('El número de documento es requerido')
    .matches(/^[0-9]+$/, 'El número de documento debe ser solo números'),
  nombres: Yup.string()
    .required('El nombre es requerido')
    .max(150, 'El nombre no puede exceder los 150 caracteres'),
  apellido_paterno: Yup.string()
    .required('El apellido paterno es requerido')
    .max(100, 'El apellido paterno no puede exceder los 100 caracteres'),
  apellido_materno: Yup.string()
    .required('El apellido materno es requerido')
    .max(100, 'El apellido materno no puede exceder los 100 caracteres'),
  genero_id: Yup.string().required('El género es requerido'),
  estado_civil_id: Yup.string().required('El estado civil es requerido'),
  fecha_nacimiento: Yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro'),
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

  tiene_discapacidad: Yup.boolean(),
  discapacidades: Yup.array().when('tiene_discapacidad', {
    is: true,
    then: Yup.array().min(1, 'Seleccione al menos una opción.')
  }),

  // Validaciones de ubigeo de nacimiento
  nacimiento_ubigeodepartamento_id: Yup.string().required(
    'El departamento de nacimiento es requerido'
  ),
  nacimiento_ubigeoprovincia_id: Yup.string().required('La provincia de nacimiento es requerida'),
  nacimiento_ubigeodistrito_id: Yup.string().required('El distrito de nacimiento es requerido'),

  // Validaciones de dirección
  direccion_ubigeodepartamento_id: Yup.string().required('El departamento es requerido'),
  direccion_ubigeoprovincia_id: Yup.string().required('La provincia es requerida'),
  direccion_ubigeodistrito_id: Yup.string().required('El distrito es requerido'),
  direccion: Yup.string().required('La dirección es requerida'),

  // Validaciones de colegio
  colegio_id: Yup.string().required(
    'El colegio es requerido. Selecciona tu distrito para ver los colegios.'
  ),
  year_culminacion: Yup.number()
    .min(1900, 'El año debe ser mayor a 1900')
    .max(new Date().getFullYear(), `El año no puede ser mayor a ${new Date().getFullYear()}`),

  // Si deseas incluir la validación del apoderado
  apoderado_id: Yup.string().nullable(), // Puedes ajustar según sea necesario

  // Validaciones de discapacidad
  discapacidad: Yup.boolean().required('Selecione una opción'),
  discapacidad_detalle: Yup.string().nullable() // Agregado
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
  const [paises, setPaises] = useState([])

  useEffect(() => {
    fetch('/data/paises.json')
      .then((response) => response.json())
      .then((data) => setPaises(data))
      .catch((error) => console.error('Error al cargar los datos:', error))
  }, [])

  const apiUrl = import.meta.env.PUBLIC_API_URL
  const [initialValues, setInitialValues] = useState({
    id: '',
    tipo_documento_id: '',
    nro_documento: '',
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    genero_id: '',
    estado_civil_id: '',
    fecha_nacimiento: '',
    pais_nacimiento: 'Perú',
    nacionalidad: 'Peruano',
    telefono_personal: '',
    whatsapp: '',
    correo_personal: '',
    correo_institucional: '',

    tiene_discapacidad: false,
    discapacidades: '',

    identidad_etnica_id: '',

    // Ubigeo de nacimiento
    nacimiento_ubigeodepartamento_id: '',
    nacimiento_ubigeoprovincia_id: '',
    nacimiento_ubigeodistrito_id: '',

    // Dirección / Colegio
    direccion_ubigeodepartamento_id: '',
    direccion_ubigeoprovincia_id: '',
    direccion_ubigeodistrito_id: '',
    direccion: '',

    colegio_id: '',
    year_culminacion: '',

    apoderado_id: ''
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const uuid = params.get('data')

    if (!uuid || uuid.trim() === '') {
      // window.location.href = '/inscripcion'
    }

    const fetchMatriculaData = async () => {
      try {
        const data = await fetchData(`/matricula_virtual/getFullMatriculaDataByUUID/${uuid}`)
        console.log(data.data.ubigeos_departamentos)

        const estudiante = data.data.matricula.estudiante
        setInitialValues({
          selectedOptions: [], //TODO: REMOVE
          id: estudiante.id || '',
          tipo_documento_id: estudiante.tipo_documento_id || '',
          nro_documento: estudiante.nro_documento || '',
          nombres: estudiante.nombres || '',
          apellido_paterno: estudiante.apellido_paterno || '',
          apellido_materno: estudiante.apellido_materno || '',
          genero_id: estudiante.genero_id || '',
          estado_civil_id: estudiante.estado_civil_id || '',
          fecha_nacimiento: estudiante.fecha_nacimiento || '',
          pais_nacimiento: estudiante.pais_nacimiento || 'Perú',
          nacionalidad: estudiante.nacionalidad || 'Peruano',
          telefono_personal: estudiante.telefono_personal || '',
          whatsapp: estudiante.whatsapp || '',
          correo_personal: estudiante.correo_personal || '',
          correo_institucional: estudiante.correo_institucional || '',

          tiene_discapacidad: estudiante.tiene_discapacidad || false,
          discapacidades: estudiante.discapacidades || '',

          identidad_etnica_id: estudiante.identidad_etnica_id || '',

          // Ubigeo de nacimiento
          nacimiento_ubigeodepartamento_id: estudiante.nacimiento_ubigeodepartamento_id || '',
          nacimiento_ubigeoprovincia_id: estudiante.nacimiento_ubigeoprovincia_id || '',
          nacimiento_ubigeodistrito_id: estudiante.nacimiento_ubigeodistrito_id || '',

          // Dirección
          direccion_ubigeodepartamento_id: estudiante.direccion_ubigeodepartamento_id || '',
          direccion_ubigeoprovincia_id: estudiante.direccion_ubigeoprovincia_id || '',
          direccion_ubigeodistrito_id: estudiante.direccion_ubigeodistrito_id || '',
          direccion: estudiante.direccion || '',

          colegio_id: estudiante.colegio_id || '',
          year_culminacion: estudiante.year_culminacion || '',

          apoderado_id: estudiante.apoderado_id || ''
        })

        setTiposDocumentos(data.data.tipos_documentos)
        setGeneros(data.data.generos)
        setEstadosCiviles(data.data.estados_civiles)
        setDiscapacidades(data.data.discapacidades)
        setIdentidadesEtnicas(data.data.identidades_etnicas)
        setDepartamentos(data.data.ubigeos_departamentos)

        setSelectedDepartamento(estudiante.ubigeodepartamento_id || '')
        setSelectedProvincia(estudiante.ubigeoprovincia_id || '')
        setSelectedDistrito(estudiante.ubigeodistrito_id || '')
      } catch (error) {
        console.error('Error al obtener datos de matrícula:', error)
        // window.location.href = '/inscripcion'
      }
    }
    fetchMatriculaData()
  }, [apiUrl])

  // Opciones
  const [tipos_documentos, setTiposDocumentos] = useState([])
  const [estados_civiles, setEstadosCiviles] = useState([])
  const [generos, setGeneros] = useState([])
  const [discapacidades, setDiscapacidades] = useState([])
  const [identidades_etnicas, setIdentidadesEtnicas] = useState([])

  // Direccion nacimiento
  // const [departamentos, setDepartamentos] = useState([])
  const [nacimientoProvincias, setNacimientoProvincias] = useState([])
  const [nacimientoDistritos, setNacimientoDistritos] = useState([])
  const [selectedNacimientoDepartamento, setSelectedNacimientoDepartamento] = useState('')
  const [selectedNacimientoProvincia, setSelectedNacimientoProvincia] = useState('')

  // Ubicacion Geográfica
  const [departamentos, setDepartamentos] = useState([])
  const [provincias, setProvincias] = useState([])
  const [distritos, setDistritos] = useState([])
  const [colegios, setColegios] = useState([])
  const [selectedDepartamento, setSelectedDepartamento] = useState('')
  const [selectedProvincia, setSelectedProvincia] = useState('')
  const [selectedDistrito, setSelectedDistrito] = useState('')

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
      setColegios([])
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
      setColegios([])
    }
  }, [selectedProvincia])

  // Filtrar coelgios según distrito seleccionado
  useEffect(() => {
    if (selectedDistrito) {
      const getColegios = async () => {
        try {
          const data = await fetchData(`/common/colegios?ubigeo=${selectedDistrito}`)
          setColegios(data.data)
        } catch (error) {
          setColegios([])
          console.error('No se pudieron obtener los colegios.')
        }
      }
      getColegios()
    }
  }, [selectedDistrito])

  // NACIMIENTO DATA
  useEffect(() => {
    if (selectedNacimientoDepartamento) {
      const getProvincias = async () => {
        try {
          const data = await fetchData(
            `/common/ubigeos?departamento=${selectedNacimientoDepartamento}`
          )
          console.log('data.data: ', data.data)
          setNacimientoProvincias(data.data)
        } catch (error) {
          setNacimientoProvincias([])
          console.error('No se pudieron obtener los ubigeos.')
        }
      }
      getProvincias()
      setNacimientoDistritos([])
    }
  }, [selectedNacimientoDepartamento])

  // Filtrar distritos según la provincia seleccionada
  useEffect(() => {
    if (selectedNacimientoProvincia) {
      const getDistritos = async () => {
        try {
          const data = await fetchData(`/common/ubigeos?provincia=${selectedNacimientoProvincia}`)
          setNacimientoDistritos(data.data)
        } catch (error) {
          setNacimientoDistritos([])
          console.error('No se pudieron obtener los ubigeos.')
        }
      }
      getDistritos()
    }
  }, [selectedNacimientoProvincia])

  const handleSubmit = async (values) => {
    try {
      const { id, ...dataToUpdate } = values
      // const uuid = new URLSearchParams(window.location.search).get('data') // Obtenemos el UUID de la URL

      const response = await apiClient.put(`/matricula_virtual/estudiante/${id}`, dataToUpdate)

      // Manejar la respuesta exitosa
      console.log('Estudiante actualizado:', response.data)
      alert('Datos actualizados con éxito')

      // Aquí puedes redirigir o hacer otras acciones, como limpiar el formulario.
    } catch (error) {
      // Manejar errores
      console.error('Error al actualizar los datos:', error)
      alert('Error al actualizar los datos. Por favor, intenta nuevamente.')
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize>
      {({ isSubmitting, setFieldValue, errors }) => (
        <Form className="mx-auto text-wrap rounded-xl border-[6px] border-slate-100 bg-white p-8 px-10 shadow-md">
          {JSON.stringify(errors)}
          <div className="flex justify-between">
            <div>
              <h5 className="text-xl font-medium text-primary-800">Información del estudiante</h5>
              <p>Completa el fomulario con tus datos.</p>
            </div>
            <div>
              <Button value="Continuar" type="submit" className="px-8" disabled={isSubmitting} />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h2 className="w-100 mb-3 font-medium text-primary-700">Datos personales</h2>
              <SelectLabel
                label="Tipo de documento"
                name="tipo_documento_id"
                options={tipos_documentos.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
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
                label="Género"
                name="genero_id"
                options={generos.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setFieldValue('genero_id', e.target.value)
                }}
              />
              <SelectLabel
                label="Estado civil"
                name="estado_civil_id"
                options={estados_civiles.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setFieldValue('estado_civil_id', e.target.value)
                }}
              />

              <InputLabel label="Fecha de nacimiento" name="fecha_nacimiento" type="date" />
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
              <SelectLabel
                label="Identidad étnica"
                name="identidad_etnica_id"
                options={identidades_etnicas.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setFieldValue('identidad_etnica_id', e.target.value)
                }}
              />

              <InputLabel label="¿Tiene dispacidad?" name="tiene_discapacidad" type="checkbox" />

              <MultiSelectLabel
                label="Selecciona opciones"
                name="selectedOptions"
                options={options}
                onSearch={({ inputValue, originalItems, setItems }) => {
                  const filteredItems = originalItems.filter((item) =>
                    item.label.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  setItems(filteredItems)
                }}
              />
            </div>
            <div>
              <h2 className="w-100 mb-3 font-medium text-primary-700">Dirección de nacimiento</h2>
              <SelectLabel
                label="Departamento"
                name="nacimiento_ubigeodepartamento_id"
                options={departamentos.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setSelectedNacimientoDepartamento(e.target.value)
                  setFieldValue('nacimiento_ubigeodepartamento_id', e.target.value)
                  setFieldValue('nacimiento_ubigeoprovincia_id', '')
                  setFieldValue('nacimiento_ubigeodistrito_id', '')
                }}
              />

              <SelectLabel
                label="Provincia"
                name="nacimiento_ubigeoprovincia_id"
                options={nacimientoProvincias.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setSelectedNacimientoProvincia(e.target.value)
                  setFieldValue('nacimiento_ubigeoprovincia_id', e.target.value)
                  setFieldValue('nacimiento_ubigeodistrito_id', '')
                }}
              />
              <SelectLabel
                label="Distrito"
                name="nacimiento_ubigeodistrito_id"
                options={nacimientoDistritos.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setFieldValue('nacimiento_ubigeodistrito_id', e.target.value)
                }}
              />

              <h2 className="w-100 mb-3 font-medium text-primary-700">Datos de contacto</h2>
              <InputLabel
                type="tel"
                label="Teléfono Personal"
                name="telefono_personal"
                placeholder="Teléfono personal"
                maxLength="9"
              />
              <InputLabel label="Whatsapp" name="whatsapp" placeholder="Whatsapp" maxLength="9" />
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
            </div>
            <div>
              <h2 className="w-100 mb-3 font-medium text-primary-700">Datos de ubicación</h2>

              <SelectLabel
                label="Departamento"
                name="direccion_ubigeodepartamento_id"
                options={departamentos.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setSelectedDepartamento(e.target.value)
                  setFieldValue('direccion_ubigeodepartamento_id', e.target.value)
                  setFieldValue('direccion_ubigeoprovincia_id', '')
                  setFieldValue('direccion_ubigeodistrito_id', '')
                }}
              />

              <SelectLabel
                label="Provincia"
                name="direccion_ubigeoprovincia_id"
                options={provincias.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setSelectedProvincia(e.target.value)
                  setFieldValue('direccion_ubigeoprovincia_id', e.target.value)
                  setFieldValue('direccion_ubigeodistrito_id', '')
                }}
              />
              <SelectLabel
                label="Distrito"
                name="direccion_ubigeodistrito_id"
                options={distritos.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.descripcion
                }))}
                onChange={(e) => {
                  setSelectedDistrito(e.target.value)
                  setFieldValue('direccion_ubigeodistrito_id', e.target.value)
                }}
              />

              <InputLabel label="Dirección" name="direccion" placeholder="Dirección" />

              <h2 className="w-100 mb-3 font-medium text-primary-700">Datos de estudio</h2>
              <SelectLabel
                label="Colegio"
                name="colegio_id"
                options={colegios.map((item) => ({
                  id: item.id,
                  value: item.id,
                  label: item.cen_edu
                }))}
                onChange={(e) => {
                  setFieldValue('colegio_id', e.target.value)
                }}
              />
              <InputLabel
                type="number"
                label="Año de culminación"
                name="year_culminacion"
                placeholder="Año de culminación"
                maxLength="4"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default DatosPersonalesForm
