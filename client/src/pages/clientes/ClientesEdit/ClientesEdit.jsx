import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClienteRequest, updateClienteRequest } from '../../../api/clientes.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import {
  validateNombre,
  validateApellido,
  validateDNI,
  validateTelefono,
  validateFechaNacimiento,
  validateDomicilio
} from '../../../utils/validation';
import './ClientesEdit.css';
import '../../../assets/styles/buttons.css';

const ClientesEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [persona, setPersona] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await getClienteRequest(id);
                const clienteData = response.data;
                setPersona({
                    persona_nombre: clienteData.persona_nombre,
                    persona_apellido: clienteData.persona_apellido,
                    persona_dni: clienteData.persona_dni,
                    persona_telefono: clienteData.persona_telefono,
                    persona_fecha_nacimiento: clienteData.persona_fecha_nacimiento ? new Date(clienteData.persona_fecha_nacimiento).toISOString().split('T')[0] : '',
                    persona_domicilio: clienteData.persona_domicilio
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchCliente();
    }, [id]);

    const handlePersonaChange = (e) => {
        const { name, value } = e.target;
        setPersona({ ...persona, [name]: value });
        setTouched({ ...touched, [name]: true });

        // Validar el campo actualizado
        let error = '';
        switch (name) {
            case 'persona_nombre':
                error = validateNombre(value);
                break;
            case 'persona_apellido':
                error = validateApellido(value);
                break;
            case 'persona_dni':
                error = validateDNI(value);
                break;
            case 'persona_telefono':
                error = validateTelefono(value);
                break;
            case 'persona_fecha_nacimiento':
                error = validateFechaNacimiento(value);
                break;
            case 'persona_domicilio':
                error = validateDomicilio(value);
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleUpdateClick = async () => {
        // Validar todos los campos antes de enviar
        const newErrors = {
            persona_nombre: validateNombre(persona.persona_nombre),
            persona_apellido: validateApellido(persona.persona_apellido),
            persona_dni: validateDNI(persona.persona_dni),
            persona_telefono: validateTelefono(persona.persona_telefono),
            persona_fecha_nacimiento: validateFechaNacimiento(persona.persona_fecha_nacimiento),
            persona_domicilio: validateDomicilio(persona.persona_domicilio)
        };
        setErrors(newErrors);

        // Verificar si hay errores
        const hasErrors = Object.values(newErrors).some(error => error);
        if (hasErrors) {
            return;
        }

        try {
            console.log('Datos a enviar:', { persona });
            await updateClienteRequest(id, { personaData: persona });
            navigate('/clientes');
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
        }
    };

    if (!persona) {
        return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className="container-page">
            <h1>Modificar Cliente</h1>
            <FormularioPersona values={persona} handleChange={handlePersonaChange} errors={errors} touched={touched} />
            <button type="button" className="actualizar-button" onClick={handleUpdateClick}>
                Actualizar Cliente
            </button>
        </div>
    );
};

export default ClientesEdit;