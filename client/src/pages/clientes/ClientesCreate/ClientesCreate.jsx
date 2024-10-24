import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import { createClienteRequest } from '../../../api/clientes.api';
import './ClientesCreate.css';
import '../../../assets/styles/buttons.css';

const ClientesCreate = () => {
    const [persona, setPersona] = useState({
        persona_nombre: '',
        persona_apellido: '',
        persona_dni: '',
        persona_telefono: '',
        persona_fecha_nacimiento: '',
        persona_domicilio: ''
    });
    const navigate = useNavigate();

    const handlePersonaChange = (e) => {
        setPersona({ ...persona, [e.target.name]: e.target.value });
    };

    const handleAltaClick = async () => {
        try {
            console.log('Datos a enviar:', { persona });
            await createClienteRequest({ personaData: persona });
            navigate('/clientes');
        } catch (error) {
            console.error("Error al dar de alta el cliente:", error);
        }
    };

    return (
        <div className="container-page">
            <h1>Alta de Cliente</h1>
            <FormularioPersona values={persona} handleChange={handlePersonaChange} />
            <button className="alta-button" onClick={handleAltaClick}>
                Agregar Cliente
            </button>
        </div>
    );
};

export default ClientesCreate;