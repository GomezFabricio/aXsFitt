import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import FormularioRol from '../../../components/FormularioRol/FormularioRol';
import { createUsuarioRequest, getRolesRequest } from '../../../api/usuarios.api';
import './UsuariosCreate.css';
import '../../../assets/styles/buttons.css';

const UsuariosCreate = () => {
    const [persona, setPersona] = useState({
        persona_nombre: '',
        persona_apellido: '',
        persona_dni: '',
        persona_telefono: '',
        persona_fecha_nacimiento: '',
        persona_domicilio: ''
    });
    const [usuario, setUsuario] = useState({ usuario_email: '', usuario_password: '' });
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [step, setStep] = useState(1); // Estado para controlar el paso actual
    const navigate = useNavigate();

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

    const handleAltaClick = async () => {
        try {
            console.log('Datos a enviar:', { persona, usuario, roles: selectedRoles });
            await createUsuarioRequest({ persona, usuario, roles: selectedRoles });
            navigate('/usuarios');
        } catch (error) {
            console.error("Error al dar de alta el usuario:", error);
        }
    };

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

    return (
        <div className="container-page">
            <h1>Alta de Usuario</h1>
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
                    <FormularioUsuario values={usuario} handleChange={handleUsuarioChange} />
                    <FormularioRol roles={roles} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
                    <button className="page-anterior-button" onClick={handlePreviousStep}>
                        Anterior
                    </button>
                    <button className="alta-button" onClick={handleAltaClick} disabled={selectedRoles.length === 0}>
                        Agregar Usuario
                    </button>
                </div>
            )}
        </div>
    );
};

export default UsuariosCreate;