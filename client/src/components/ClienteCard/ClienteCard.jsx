// ClienteCard.jsx
import React from 'react';
import './ClienteCard.css';

function ClienteCard({ cliente }) {
  return (
    <div className="cliente-card">
      <h2>{cliente.nombre}</h2>
      <p>Email: {cliente.email}</p>
      <p>Teléfono: {cliente.telefono}</p>
      {/* Otros campos según lo que necesites mostrar */}
    </div>
  );
}

export default ClienteCard;
