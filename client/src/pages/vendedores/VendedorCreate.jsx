import React from 'react'
import {Form, Formik} from 'formik'

const VendedorCreate = () => {
  return (
    <div>
      <Formik>
        <Form>
          <label>Nombre</label>
          <input type="text" name='nombre' />

          <label>Apellido</label>
          <input type="text" name='apellido' />

          <label>DNI</label>
          <input type="number" name='dni' />

          <label>Telefono</label>
          <input type="number" name='telefono' />

          <label>Fecha de Nacimiento</label>
          <input type="date" name='fecha_nacimiento' />

          <label>Sexo</label>
          <input type="text" name='Nombre' />

          <label>Domicilio</label>
          <input type="text" name='domicilio' />
        </Form>
      </Formik>
    </div>
  )
}

export default VendedorCreate