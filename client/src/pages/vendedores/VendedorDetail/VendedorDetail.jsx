import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVendedorRequest } from '../../../api/vendedores.api';
import VendedorDetailContent from '../../../components/VendedorDetailContent/VendedorDetailContent';

const VendedorDetail = () => {
  const { id } = useParams(); // Obtenemos el id de la URL
  const [vendedor, setVendedor] = useState(null);

  useEffect(() => {
    const fetchVendedor = async () => {
      const response = await getVendedorRequest(id);
      setVendedor(response.data);
    };
    fetchVendedor();
  }, [id]);

  if (!vendedor) {
    return <p>Cargando...</p>; 
  }

  return (
    <div className="container-page">
      <h1>Detalles de Vendedor</h1>
      <VendedorDetailContent
        nombre={vendedor.persona_nombre}
        apellido={vendedor.persona_apellido}
        dni={vendedor.persona_dni}
        ventasAcumuladas={0} // Temporales hasta que se implemente la lógica
        ventasUltimoPeriodo={0}
        totalComisiones={0}
      />
    </div>
  );
};

export default VendedorDetail;