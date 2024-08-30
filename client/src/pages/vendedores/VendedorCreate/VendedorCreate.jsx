import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import { createVendedorRequest } from '../../../api/vendedores.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import './VendedorCreate.css'

const VendedorCreate = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // Aquí está correcto

  return (
    <div className="container">
      <h1 className="title">Alta Vendedor</h1>
      <Formik
        initialValues={{
          persona_nombre: "",
          persona_apellido: "",
          persona_dni: "",
          persona_telefono: "",
          persona_fecha_nacimiento: "",
          persona_domicilio: "",
          usuario_email: "",
          usuario_pass: "",
        }}

        onSubmit={async (values) => {
          try {
            if (step === 1) {
              // Guardar datos en localStorage y pasar al siguiente paso
              localStorage.setItem('personaData', JSON.stringify(values));
              setStep(2);
            } else {
              const personaData = JSON.parse(localStorage.getItem('personaData'));
              const usuarioData = {
                usuario_email: values.usuario_email,
                usuario_pass: values.usuario_pass
              };

              // Enviar la solicitud con ambos pasos completados
              await createVendedorRequest({ personaData, usuarioData });
              navigate('/'); // Redirigir a la URL "/" después de finalizar el registro
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange }) => (
          <Form className="form">
            {step === 1 ? (
              <FormularioPersona handleChange={handleChange} />
            ) : (
              <FormularioUsuario handleChange={handleChange} />
            )}
            <button type='submit' className="btn">
              {step === 1 ? 'Siguiente' : 'Finalizar Registro'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default VendedorCreate;
