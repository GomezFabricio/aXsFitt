import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerVentasRequest, obtenerVentaPorIdRequest } from '../../../api/ventas.api';
import SearchInput, { createFilter } from 'react-search-input';
import VentasListTable from '../../../components/VentasListTable/VentasListTable';
import './VentasList.css';

const KEYS_TO_FILTERS = ['clienteNombre', 'clienteApellido', 'vendedorNombre', 'vendedorApellido', 'venta_fecha']; // Campos a filtrar

const VentasList = () => {
    const [ventas, setVentas] = useState([]);
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadVentas() {
            try {
                const responseVentas = await obtenerVentasRequest();
                setVentas(responseVentas.data);
            } catch (error) {
                console.error('Error cargando ventas:', error);
            }
        }
        loadVentas();
    }, []);

    const filteredVentas = ventas.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos las ventas

    const handleVerDetallesClick = async (id) => {
        try {
            const responseVenta = await obtenerVentaPorIdRequest(id);
            setSelectedVenta(responseVenta.data);
        } catch (error) {
            console.error('Error obteniendo detalles de la venta:', error);
        }
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
                selectedVenta={selectedVenta} // Pasamos la venta seleccionada
                setSelectedVenta={setSelectedVenta} // Pasamos la función para actualizar la venta seleccionada
            />
        </div>
    );
}

export default VentasList;