import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsuarioRequest, updateUsuarioRequest, getRolesRequest } from '../../../api/usuarios.api';
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
import './UsuariosEdit.css';
import '../../../assets/styles/buttons.css';

const UsuarioEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [persona, setPersona] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [step, setStep] = useState(1); // Estado para controlar el paso actual

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUsuarioRequest(id);
        const usuarioData = response.data;
        setPersona({
          persona_nombre: usuarioData.persona_nombre,
          persona_apellido: usuarioData.persona_apellido,
          persona_dni: usuarioData.persona_dni,
          persona_telefono: usuarioData.persona_telefono,
          persona_fecha_nacimiento: usuarioData.persona_fecha_nacimiento ? new Date(usuarioData.persona_fecha_nacimiento).toISOString().split('T')[0] : '',
          persona_domicilio: usuarioData.persona_domicilio
        });
        setUsuario({
          usuario_email: usuarioData.usuario_email,
          usuario_pass: '' // No queremos mostrar la contraseña actual
        });
        setSelectedRoles(usuarioData.roles.map(role => role.rol_id)); // Asegurarse de que selectedRoles contenga los IDs de los roles
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsuario();
  }, [id]);

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
      <h1>Modificar Usuario</h1>
      <Formik
        initialValues={{
          persona_nombre: persona?.persona_nombre || '',
          persona_apellido: persona?.persona_apellido || '',
          persona_dni: persona?.persona_dni || '',
          persona_telefono: persona?.persona_telefono || '',
          persona_fecha_nacimiento: persona?.persona_fecha_nacimiento || '',
          persona_domicilio: persona?.persona_domicilio || '',
          usuario_email: usuario?.usuario_email || '',
          usuario_pass: '',
        }}
        enableReinitialize
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
              await updateUsuarioRequest(id, { persona: personaData, usuario: usuarioData, roles: selectedRoles });
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
                  disablePassword={true}
                />
                <FormularioRol roles={roles} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
                <button type="button" className="page-anterior-button" onClick={() => setStep(step - 1)}>
                  Anterior
                </button>
                <button type="submit" className="actualizar-button" disabled={isSubmitting || selectedRoles.length === 0}>
                  Actualizar Usuario
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UsuarioEdit;