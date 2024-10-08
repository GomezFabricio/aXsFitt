// UsuarioEdit.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsuarioRequest, updateUsuarioRequest, getRolesRequest } from '../../../api/usuarios.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import FormularioRol from '../../../components/FormularioRol/FormularioRol';
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

  const handlePersonaChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleUsuarioChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleUpdateClick = async () => {
    try {
      console.log('Datos a enviar:', { persona, usuario, roles: selectedRoles });
      await updateUsuarioRequest(id, { persona, usuario, roles: selectedRoles });
      navigate('/usuarios');
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  if (!persona || !usuario) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="container-page">
      <h1>Modificar Usuario</h1>
      {step === 1 && (
        <div>
          <FormularioPersona values={persona} handleChange={handlePersonaChange} />
          <button className="siguiente-button" onClick={handleNextStep}>
            Siguiente
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <FormularioUsuario values={usuario} handleChange={handleUsuarioChange} disablePassword={true} />
          <FormularioRol roles={roles} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
          <button className="page-anterior-button" onClick={handlePreviousStep}>
            Anterior
          </button>
          <button className="actualizar-button" onClick={handleUpdateClick} disabled={selectedRoles.length === 0}>
            Actualizar Usuario
          </button>
        </div>
      )}
    </div>
  );
};

export default UsuarioEdit;