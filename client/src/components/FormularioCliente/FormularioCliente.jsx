import React, { useState } from 'react';
import './FormularioCliente.css';

function FormularioCliente({ onSubmit, initialData }) {
  const [persona, setPersona] = useState(initialData?.persona || {
    nombre: '',
    email: '',
    telefono: '',
  });

  const [cliente, setCliente] = useState(initialData?.cliente || {
    estado_afiliacion_id: '',
    cliente_fecha_afiliacion: '',
  });

  const handlePersonaChange = (e) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: value });
  };

  const handleClienteChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ persona, cliente });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Datos de Persona */}
      <label htmlFor="nombre">Nombre:</label>
      <input type="text" name="nombre" value={persona.nombre} onChange={handlePersonaChange} required />

      <label htmlFor="email">Email:</label>
      <input type="email" name="email" value={persona.email} onChange={handlePersonaChange} required />

      <label htmlFor="telefono">Teléfono:</label>
      <input type="tel" name="telefono" value={persona.telefono} onChange={handlePersonaChange} required />

      {/* Datos de Cliente */}
      <label htmlFor="estado_afiliacion_id">Estado Afiliación:</label>
      <input type="text" name="estado_afiliacion_id" value={cliente.estado_afiliacion_id} onChange={handleClienteChange} required />

      <label htmlFor="cliente_fecha_afiliacion">Fecha de Afiliación:</label>
      <input type="date" name="cliente_fecha_afiliacion" value={cliente.cliente_fecha_afiliacion} onChange={handleClienteChange} />

      <button type="submit">Guardar Cliente</button>
    </form>
  );
}

export default FormularioCliente;
