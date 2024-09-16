import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createVendedorRequest } from '../../../api/vendedores.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import './VendedorCreate.css';

const VendedorCreate = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="container-page">
      <h1 className="title">Alta Vendedor</h1>
      <h2>Complete los siguientes campos para registrar un nuevo vendedor en el sistema. Asegúrese de ingresar toda la información requerida para garantizar un registro exitoso.</h2>
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
              navigate('/vendedores'); // Redirigir a la URL "/vendedores" después de finalizar el registro
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="form">
            {step === 1 ? (
              <FormularioPersona 
                handleChange={handleChange} 
                setFieldValue={setFieldValue} // Pasa setFieldValue
                values={values} // Pasa los valores actuales
              />
            ) : (
              <FormularioUsuario 
                handleChange={handleChange} 
                setFieldValue={setFieldValue} 
                values={values} 
              />
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
