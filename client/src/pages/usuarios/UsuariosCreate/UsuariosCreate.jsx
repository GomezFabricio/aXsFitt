import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createUsuarioRequest, getRolesRequest } from '../../../api/usuarios.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import FormularioRol from '../../../components/FormularioRol/FormularioRol';
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
import './UsuariosCreate.css';
import '../../../assets/styles/buttons.css';

const UsuariosCreate = () => {
  const [step, setStep] = useState(1);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
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
          usuario_pass: "",
        }}
        validate={step === 1 ? validateStep1 : validateStep2}
        onSubmit={async (values) => {
          try {
            if (step === 1) {
              setStep(step + 1);
            } else {
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
              await createUsuarioRequest({ personaData, usuarioData, roles: selectedRoles });
              navigate('/usuarios');
            }
          } catch (error) {
            console.log(error);
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
                <FormularioRol roles={roles} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
                <button type="button" className="page-anterior-button" onClick={() => setStep(step - 1)}>
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