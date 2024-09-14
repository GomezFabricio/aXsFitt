// ClienteDetailContent.jsx
import React from 'react';
import './ClienteDetailContent.css';

function ClienteDetailContent({ cliente }) {
  return (
    <div className="cliente-detail-content">
      <h1>{cliente.nombre}</h1>
      <p>Email: {cliente.email}</p>
      <p>Teléfono: {cliente.telefono}</p>
      {/* Más detalles del cliente */}
    </div>
  );
}

export default ClienteDetailContent;
