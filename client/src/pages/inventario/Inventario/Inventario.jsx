import React, { useEffect, useState } from 'react';
import { inventarioList } from '../../../api/inventario.api';
import InventarioList from '../../../components/InventarioList';
import { useNavigate } from 'react-router-dom';
import './Inventario.css';

const Inventario = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchInventario = async () => {
            try {
                const data = await inventarioList();
                setProductos(data);
            } catch (error) {
                console.error('Error fetching inventario:', error);
            }
        };

        fetchInventario();
    }, []);

    const navigate = useNavigate();

    const handleAgregarClick = () => {
        navigate('/productos/nuevo'); // Navegamos a la página de agregar un nuevo producto
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Inventario</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Agregar Producto
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar el inventario de productos.</h2>

            <InventarioList productos={productos} />
        </div>
    );
};

export default Inventario;