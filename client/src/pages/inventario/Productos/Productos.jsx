import React, { useEffect, useState } from 'react';
import { productosList } from '../../../api/inventario.api';
import ProductosList from '../../../components/ProductosList/ProductosList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import { useNavigate } from 'react-router-dom';
import './Productos.css';

const Productos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await productosList();
                setProductos(data);
            } catch (error) {
                console.error('Error fetching productos:', error);
                setProductos([]);
            }
        };

        fetchProductos();
    }, []);

    const navigate = useNavigate();

    const handleAgregarClick = () => {
        navigate('/productos/nuevo'); // Navegamos a la página de agregar un nuevo producto
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Productos</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Agregar Producto
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar los productos.</h2>
            <MenuEnInventario />

            <ProductosList productos={productos} />
        </div>
    );
};

export default Productos;