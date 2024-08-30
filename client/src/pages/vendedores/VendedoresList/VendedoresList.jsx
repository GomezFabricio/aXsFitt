import React, { useEffect, useState } from 'react';
import { getVendedoresRequest } from '../../../api/vendedores.api';
import VendedorCard from '../../../components/VendedorCard/VendedorCard';
import SearchInput, { createFilter } from 'react-search-input'; // Importamos la librería
import './VendedoresList.css';

const KEYS_TO_FILTERS = ['persona_nombre', 'persona_apellido', 'persona_dni']; // Campos a filtrar

const VendedoresList = () => {
  const [vendedores, setVendedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadVendedores() {
      const responseVendedores = await getVendedoresRequest();
      setVendedores(responseVendedores.data);
    }
    loadVendedores();
  }, []);

  const filteredVendedores = vendedores.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos los vendedores

  return (
    <div className="container">
      <h1>Vendedores</h1>
      <SearchInput
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '12px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '25px',
          fontSize: '16px',
          outline: 'none',
          boxSizing: 'border-box',
          textAlign: 'center', 
        }}
        onChange={setSearchTerm}
        placeholder="Buscar vendedores..."
      />
      <div className="vendedores-list">
        {filteredVendedores.map((vendedor) => (
          <VendedorCard
            key={vendedor.vendedor_id}
            nombre={vendedor.persona_nombre}
            apellido={vendedor.persona_apellido}
            dni={vendedor.persona_dni}
            ventasRealizadas={0} // Aun no trabajado, así que lo dejamos fijo en 0
            comisionesPendientes={0} // Aun no trabajado, así que lo dejamos fijo en 0
            onDetalleClick={() => alert(`Detalles de ${vendedor.persona_nombre} ${vendedor.persona_apellido}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default VendedoresList;
