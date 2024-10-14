import React, { useEffect, useState } from 'react';
import { marcasList } from '../../../api/inventario.api';
import MarcasList from '../../../components/MarcasList/MarcasList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import { useNavigate } from 'react-router-dom';
import './MarcasProductos.css';

const MarcasProductos = () => {
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const data = await marcasList();
                setMarcas(data);
            } catch (error) {
                console.error('Error fetching marcas:', error);
                setMarcas([]);
            }
        };

        fetchMarcas();
    }, []);

    const navigate = useNavigate();

    const handleAgregarClick = () => {
        navigate('/marcas/nuevo'); // Navegamos a la página de agregar una nueva marca
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Marcas de Productos</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Agregar Marca
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar las marcas de productos.</h2>
            <MenuEnInventario />

            <MarcasList marcas={marcas} />
        </div>
    );
};

export default MarcasProductos;