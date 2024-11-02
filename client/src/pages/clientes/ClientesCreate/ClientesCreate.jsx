import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createClienteRequest } from '../../../api/clientes.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import './ClientesCreate.css';
import '../../../assets/styles/buttons.css';

const ClientesCreate = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = (values) => {
    localStorage.setItem('personaData', JSON.stringify(values));
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container-page">
      <h1 className="title">Alta Cliente</h1>
      <h2>Complete los siguientes campos para registrar un nuevo cliente en el sistema. Asegúrese de ingresar toda la información requerida para garantizar un registro exitoso.</h2>
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
              handleNextStep(values);
            } else {
              const personaData = JSON.parse(localStorage.getItem('personaData'));
              const usuarioData = {
                usuario_email: values.usuario_email,
                usuario_pass: values.usuario_pass
              };

              // Enviar la solicitud con ambos pasos completados
              await createClienteRequest({ personaData, usuarioData });
              navigate('/clientes'); // Redirigir a la URL "/clientes" después de finalizar el registro
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="form">
            {step === 1 ? (
              <div>
                <FormularioPersona 
                  handleChange={handleChange} 
                  setFieldValue={setFieldValue} // Pasa setFieldValue
                  values={values} // Pasa los valores actuales
                />
                <button type="button" className="siguiente-button" onClick={() => handleNextStep(values)}>
                  Siguiente
                </button>
              </div>
            ) : (
              <div>
                <FormularioUsuario 
                  handleChange={handleChange} 
                  setFieldValue={setFieldValue} 
                  values={values} 
                />
                <button type="button" className="page-anterior-button" onClick={handlePreviousStep}>
                  Anterior
                </button>
                <button type="submit" className="alta-button">
                  Finalizar Registro
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ClientesCreate;