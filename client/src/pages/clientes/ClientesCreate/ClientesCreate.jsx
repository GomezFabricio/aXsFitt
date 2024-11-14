import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createClienteRequest } from '../../../api/clientes.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import {
  validateNombre,
  validateApellido,
  validateDNI,
  validateTelefono,
  validateFechaNacimiento,
  validateDomicilio,
  validateEmail,
  validatePassword
} from '../../../utils/validation';
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

  const validateStep1 = (values) => {
    const errors = {};
    errors.persona_nombre = validateNombre(values.persona_nombre);
    errors.persona_apellido = validateApellido(values.persona_apellido);
    errors.persona_dni = validateDNI(values.persona_dni);
    errors.persona_telefono = validateTelefono(values.persona_telefono);
    errors.persona_fecha_nacimiento = validateFechaNacimiento(values.persona_fecha_nacimiento);
    errors.persona_domicilio = validateDomicilio(values.persona_domicilio);
    return errors;
  };

  const validateStep2 = (values) => {
    const errors = {};
    errors.usuario_email = validateEmail(values.usuario_email);
    errors.usuario_pass = validatePassword(values.usuario_pass);
    return errors;
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
        validate={step === 1 ? validateStep1 : validateStep2}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (step === 1) {
              handleNextStep(values);
            } else {
              const personaData = JSON.parse(localStorage.getItem('personaData'));
              const usuarioData = {
                usuario_email: values.usuario_email,
                usuario_pass: values.usuario_pass
              };

              await createClienteRequest({ personaData, usuarioData });
              navigate('/clientes');
            }
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="form">
            {step === 1 ? (
              <div>
                <FormularioPersona 
                  handleChange={handleChange} 
                  setFieldValue={setFieldValue} 
                  values={values} 
                  errors={errors}
                  touched={touched}
                />
                <button 
                  type="submit" 
                  className="siguiente-button" 
                  disabled={isSubmitting}
                >
                  Siguiente
                </button>
              </div>
            ) : (
              <div>
                <FormularioUsuario 
                  handleChange={handleChange} 
                  setFieldValue={setFieldValue} 
                  values={values} 
                  errors={errors}
                  touched={touched}
                />
                <button type="button" className="page-anterior-button" onClick={handlePreviousStep}>
                  Anterior
                </button>
                <button type="submit" className="alta-button" disabled={isSubmitting}>
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