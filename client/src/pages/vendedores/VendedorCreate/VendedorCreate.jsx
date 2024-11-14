import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createVendedorRequest } from '../../../api/vendedores.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import * as Yup from 'yup'; // Importar Yup
import './VendedorCreate.css';
import '../../../assets/styles/buttons.css';

// Definir el esquema de validación con Yup
const validationSchemaStep1 = Yup.object().shape({
  persona_nombre: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  persona_apellido: Yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  persona_dni: Yup.string()
    .required('El DNI es obligatorio')
    .matches(/^\d+$/, 'El DNI debe contener solo números')
    .min(7, 'El DNI debe tener al menos 7 caracteres')
    .max(8, 'El DNI no puede tener más de 8 caracteres'),
  persona_telefono: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^\d+$/, 'El teléfono debe contener solo números')
    .min(10, 'El teléfono debe tener al menos 10 caracteres')
    .max(15, 'El teléfono no puede tener más de 15 caracteres'),
  persona_fecha_nacimiento: Yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro'),
  persona_domicilio: Yup.string()
    .required('El domicilio es obligatorio')
    .min(5, 'El domicilio debe tener al menos 5 caracteres'),
});

const validationSchemaStep2 = Yup.object().shape({
  usuario_email: Yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  usuario_pass: Yup.string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const VendedorCreate = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = (values, setErrors, validateForm) => {
    validateForm().then(errors => {
      if (Object.keys(errors).length === 0) {
        localStorage.setItem('personaData', JSON.stringify(values));
        setStep(step + 1);
      } else {
        setErrors(errors);
      }
    });
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

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
        validationSchema={step === 1 ? validationSchemaStep1 : validationSchemaStep2} // Añadir el esquema de validación según el paso
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (step === 1) {
              // Guardar datos en localStorage y pasar al siguiente paso
              handleNextStep(values, setSubmitting);
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
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched, validateForm, setErrors }) => (
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
                <button type="submit" className="siguiente-button" onClick={() => handleNextStep(values, setErrors, validateForm)}>
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

export default VendedorCreate;