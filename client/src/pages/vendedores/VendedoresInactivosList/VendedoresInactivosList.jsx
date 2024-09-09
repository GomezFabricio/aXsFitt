import React, { useEffect, useState } from 'react';
import { getVendedoresInactivosRequest, activateVendedorRequest } from '../../../api/vendedores.api';
import VendedoresInactivosTable from '../../../components/VendedoresInactivosTable/VendedoresInactivosTable';
import './VendedoresInactivosList.css';

const VendedoresInactivosList = () => {
    const [vendedoresInactivos, setVendedoresInactivos] = useState([]);

    const loadVendedoresInactivos = async () => {
        try {
            const response = await getVendedoresInactivosRequest();
            setVendedoresInactivos(response.data);
        } catch (error) {
            console.error('Error al cargar los vendedores inactivos:', error);
        }
    };

    useEffect(() => {
        loadVendedoresInactivos(); // Cargar los vendedores inactivos cuando el componente se monta
    }, []);

    const handleActivate = async (vendedorId) => {
        try {
            await activateVendedorRequest(vendedorId);
            // Volver a cargar la lista de vendedores inactivos tras la activación
            loadVendedoresInactivos();
        } catch (error) {
            console.error('Error al activar el vendedor:', error);
        }
    };
    
    return (
        <div className="container-page">
            <h1>Vendedores Inactivos</h1>
            <VendedoresInactivosTable vendedores={vendedoresInactivos} onActivate={handleActivate} />
        </div>
    );
};

export default VendedoresInactivosList;
