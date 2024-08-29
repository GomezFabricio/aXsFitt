import React from 'react'
import {Form, Formik} from 'formik'
import {createVendedorRequest} from '../../api/vendedores.api'

const VendedorCreate = () => {
  return (
    <div>
      <Formik
        initialValues={{
          nombre: "",
          apellido: "",
          dni: "",
          telefono: "",
          fecha_nacimiento: "",
          domicilio: ""
        }}

        onSubmit={async (values) => {
          try{
            const response = await createVendedorRequest (values)
          } catch (error) {
            console.error(error)
          }  
        }}
      >
        {({handleChange, handleSubmit}) => (
          <Form>
          <label>Nombre</label>
          <input type="text" name='nombre' onChange={handleChange} />

          <label>Apellido</label>
          <input type="text" name='apellido' onChange={handleChange} />

          <label>DNI</label>
          <input type="number" name='dni' onChange={handleChange} />

          <label>Telefono</label>
          <input type="number" name='telefono' onChange={handleChange} />

          <label>Fecha de Nacimiento</label>
          <input type="date" name='fecha_nacimiento' onChange={handleChange} />

          <label>Domicilio</label>
          <input type="text" name='domicilio' onChange={handleChange} />

          <button type='submit'>Siguiente</button>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default VendedorCreate