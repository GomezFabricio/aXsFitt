import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getVendedorRequest } from '../../../api/vendedores.api';
import { deactivateVendedor } from '../../../api/vendedores.api';
import VendedorDetailContent from '../../../components/VendedorDetailContent/VendedorDetailContent';

const VendedorDetail = () => {
  const { id } = useParams();
  const [vendedor, setVendedor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendedor = async () => {
      const response = await getVendedorRequest(id);
      setVendedor(response.data);
    };
    fetchVendedor();
  }, [id]);

  const handleDelete = async () => {
    try {
        await deactivateVendedor(id); 
        navigate('/');  // Redireccionamos al listado de vendedores al eliminar el vendedor
    } catch (error) {
        console.error("Error al eliminar el vendedor:", error);
    }
  };

  const handleUpdate = async () => {
    navigate(`/vendedor/${id}/edit`); // Navegamos a la página de edición del vendedor
  }

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
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default VendedorDetail;
