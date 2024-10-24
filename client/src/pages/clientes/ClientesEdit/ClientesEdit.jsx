import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClienteRequest, updateClienteRequest } from '../../../api/clientes.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import './ClientesEdit.css';
import '../../../assets/styles/buttons.css';

const ClientesEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [persona, setPersona] = useState(null);

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
        setPersona({ ...persona, [e.target.name]: e.target.value });
    };

    const handleUpdateClick = async () => {
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
            <FormularioPersona values={persona} handleChange={handlePersonaChange} />
            <button className="actualizar-button" onClick={handleUpdateClick}>
                Actualizar Cliente
            </button>
        </div>
    );
};

export default ClientesEdit;