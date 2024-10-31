import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerVentasRequest } from '../../../api/ventas.api';
import SearchInput, { createFilter } from 'react-search-input';
import VentasListTable from '../../../components/VentasListTable/VentasListTable';
import './VentasList.css';

const KEYS_TO_FILTERS = ['clienteNombre', 'clienteApellido', 'vendedorNombre', 'vendedorApellido', 'venta_fecha']; // Campos a filtrar

const VentasList = () => {
    const [ventas, setVentas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadVentas() {
            const responseVentas = await obtenerVentasRequest();
            setVentas(responseVentas.data);
        }
        loadVentas();
    }, []);

    const filteredVentas = ventas.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos las ventas

    const handleVerDetallesClick = (id) => {
        // Navegar a la página de detalles de la venta
        navigate(`/ventas/${id}`);
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Ventas Realizadas</h1>
            </div>

            <h2>En esta sección podrás ver y gestionar las ventas realizadas.</h2>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                    placeholder="Buscar venta..."
                    onChange={(term) => setSearchTerm(term)}
                />
            </div>

            <VentasListTable 
                ventas={filteredVentas} // Pasamos las ventas filtradas
                onVerDetalles={handleVerDetallesClick} // Pasamos la función handleVerDetallesClick
            />
        </div>
    );
}

export default VentasList;