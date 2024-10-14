import React, { useEffect, useState } from 'react';
import { tiposProductosList } from '../../../api/inventario.api';
import TiposProductosList from '../../../components/TiposProductosList/TiposProductosList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import { useNavigate } from 'react-router-dom';
import './TiposProductos.css';

const TiposProductos = () => {
    const [tiposProductos, setTiposProductos] = useState([]);

    useEffect(() => {
        const fetchTiposProductos = async () => {
            try {
                const data = await tiposProductosList();
                setTiposProductos(data);
            } catch (error) {
                console.error('Error fetching tipos de productos:', error);
                setTiposProductos([]);
            }
        };

        fetchTiposProductos();
    }, []);

    const navigate = useNavigate();

    const handleAgregarClick = () => {
        navigate('/tiposproductos/nuevo'); // Navegamos a la página de agregar un nuevo tipo de producto
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Tipos de Productos</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Agregar Tipo de Producto
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar los tipos de productos.</h2>
            <MenuEnInventario />

            <TiposProductosList tiposProductos={tiposProductos} />
        </div>
    );
};

export default TiposProductos;