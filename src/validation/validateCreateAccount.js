import moment from 'moment'

export default function validateCreateAccount(values) {
  let errors = {}

  if (values.password) {
    if (
      (values.type === 'Admin' && values.password === '') ||
      values.password.length < 6
    )
      errors.password = 'Debes escribir una contraseña de al menos 6 caracteres'
  }
  if (values.type === 'Doctor' && values.cv === '')
    errors.cv = 'Debes de subir tu curriculum'
  if (values.name === '' && values.type === 'Doctor')
    errors.name = 'Debes escribir tu nombre completo'
  if (!values.type || values.type === '')
    errors.type = 'Debes de seleccionar un tipo de cuenta'
  if (!values.city || values.city === '"Aguascalientes"')
    errors.city = 'Debes de RESIDIR en Aguascalientes México'
  if (values.birthday) {
    if (moment().diff(values.birthday, 'years') < 18)
      errors.birthday = 'Debes de ser mayor de edad para usar la aplicación'
  }

  if (values.phone) {
    if (!values.phone) errors.phone = 'El teléfono es obligatorio'
    else if (values.phone.length < 10)
      errors.phone = 'El teléfono debe de tener al menos 10 digitos'
  }

  if (values.children && values.type !== 'Admin') {
    if (values.children.length === 0 && values.type === 'Paciente')
      errors.children = 'Debes de agregar a tus hijos'

    values.children.forEach(child => {
      if (
        (child === '' || child.birthday === '' || child.name === '') &&
        values.type === 'Paciente'
      )
        errors.children = 'Debes de agregar la información de tus hijos'
    })
  }

  if (values.features && values.type !== 'Admin') {
    if (values.type === 'Doctor' && values.features.length === 0)
      errors.features =
        'Debes de agregar logros destacados de tu carrera, esto ayudara a tu proceso de selección'

    values.features.forEach(child => {
      if ((child === '' || child.name === '') && values.type === 'Doctor')
        errors.features = 'Debes de agregar cuales son tus logros'
    })
  }

  return errors
}
