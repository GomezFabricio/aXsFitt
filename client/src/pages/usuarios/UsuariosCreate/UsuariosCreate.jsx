import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createUsuarioRequest, getRolesRequest, checkEmailExistsRequest } from '../../../api/usuarios.api';
import { checkDniExistsRequest } from '../../../api/personas.api'; // Importar la función de verificación del DNI
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import FormularioRol from '../../../components/FormularioRol/FormularioRol';
import * as Yup from 'yup';
import './UsuariosCreate.css';
import '../../../assets/styles/buttons.css';

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

const generateRandomPassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

const UsuariosCreate = () => {
  const [step, setStep] = useState(1);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [emailError, setEmailError] = useState(''); // Estado para el mensaje de error del email
  const [dniError, setDniError] = useState(''); // Estado para el mensaje de error del DNI
  const navigate = useNavigate();

  useEffect(() => {
    async function loadRoles() {
      try {
        const responseRoles = await getRolesRequest();
        setRoles(responseRoles.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    }
    loadRoles();
  }, []);

  const handleNextStep = async (values, setErrors, validateForm) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      if (dniError) {
        setErrors({ persona_dni: dniError });
        return;
      }
      setStep(step + 1);
    } else {
      setErrors(errors);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleEmailCheck = async (email) => {
    console.log('Verificando correo electrónico:', email);
    try {
      const response = await checkEmailExistsRequest(email);
      console.log('Respuesta de verificación de correo:', response.data);
      if (response.data.message === 'El correo electrónico ya está registrado') {
        setEmailError('El correo electrónico ya está registrado');
        return false;
      }
      setEmailError('');
      return true;
    } catch (error) {
      console.error('Error verificando el correo electrónico:', error);
      setEmailError(error.message || 'Error verificando el correo electrónico');
      return false;
    }
  };

  const handleDniCheck = async (dni) => {
    console.log('Verificando DNI:', dni);
    try {
      const response = await checkDniExistsRequest(dni);
      console.log('Respuesta de verificación de DNI:', response.data);
      if (response.data.message === 'El DNI ya está registrado') {
        setDniError('El DNI ya está registrado');
        return false;
      }
      setDniError('');
      return true;
    } catch (error) {
      console.error('Error verificando el DNI:', error);
      setDniError(error.message || 'Error verificando el DNI');
      return false;
    }
  };

  return (
    <div className="container-page">
      <h1>Alta de Usuario</h1>
      <Formik
        initialValues={{
          persona_nombre: "",
          persona_apellido: "",
          persona_dni: "",
          persona_telefono: "",
          persona_fecha_nacimiento: "",
          persona_domicilio: "",
          usuario_email: "",
          usuario_pass: generateRandomPassword(), // Generar contraseña aleatoria
        }}
        validationSchema={step === 1 ? validationSchemaStep1 : validationSchemaStep2}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (step === 1) {
              handleNextStep(values, setErrors, validateForm);
            } else {
              const emailValid = await handleEmailCheck(values.usuario_email);
              if (!emailValid) {
                setSubmitting(false);
                return;
              }

              const personaData = {
                persona_nombre: values.persona_nombre,
                persona_apellido: values.persona_apellido,
                persona_dni: values.persona_dni,
                persona_telefono: values.persona_telefono,
                persona_fecha_nacimiento: values.persona_fecha_nacimiento,
                persona_domicilio: values.persona_domicilio,
              };
              const usuarioData = {
                usuario_email: values.usuario_email,
                usuario_pass: values.usuario_pass,
              };

              await createUsuarioRequest({ persona: personaData, usuario: usuarioData, roles: selectedRoles });
              navigate('/usuarios');
            }
          } catch (error) {
            console.log(error);
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue, errors, touched, validateForm, setErrors, isSubmitting }) => (
          <Form className="form">
            {step === 1 ? (
              <div>
                <FormularioPersona 
                  handleChange={handleChange} 
                  setFieldValue={setFieldValue} 
                  values={values} 
                  errors={errors}
                  touched={touched}
                  handleBlur={async (e) => {
                    handleBlur(e);
                    if (e.target.name === 'persona_dni') {
                      await handleDniCheck(e.target.value);
                    }
                  }} // Pasar handleBlur para manejar el evento onBlur y validar el DNI
                />
                {dniError && <div className="error-dni-message">{dniError}</div>}
                <button 
                  type="submit" 
                  className="siguiente-button" 
                  onClick={() => handleNextStep(values, setErrors, validateForm)}
                  disabled={isSubmitting}
                >
                  Siguiente
                </button>
              </div>
            ) : (
              <div>
                <FormularioUsuario 
                  handleChange={handleChange} 
                  handleBlur={handleBlur} 
                  setFieldValue={setFieldValue} 
                  values={values} 
                  errors={errors}
                  touched={touched}
                  disablePassword={true} // Deshabilitar el campo de contraseña
                />
                {emailError && <div className="error-email-message">{emailError}</div>}
                <FormularioRol roles={roles} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
                <button type="button" className="page-anterior-button" onClick={handlePreviousStep}>
                  Anterior
                </button>
                <button type="submit" className="alta-button" disabled={isSubmitting || selectedRoles.length === 0}>
                  Agregar Usuario
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UsuariosCreate;