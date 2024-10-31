import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VentasHome.css';

const VentasHome = () => {
    const navigate = useNavigate();

    const handleRegistrarVentaClick = () => {
        navigate('/ventas/registrar');
    };

    const handleVerVentasClick = () => {
        navigate('/ventas/listado');
    };

    const handleReportesClick = () => {
        navigate('/ventas/reportes');
    };

    const handleConfiguracionClick = () => {
        navigate('/ventas/configuracion');
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Ventas</h1>
            </div>

            <h2>En esta sección podrás gestionar todas las operaciones relacionadas con las ventas.</h2>

            <div className="opciones-container">
                <button className="ventas-button" onClick={handleRegistrarVentaClick}>
                    Registrar Venta
                </button>
                <button className="ventas-button" onClick={handleVerVentasClick}>
                    Ver Ventas Realizadas
                </button>
                <button className="ventas-button" onClick={handleReportesClick}>
                    Reportes de Ventas
                </button>
                <button className="ventas-button" onClick={handleConfiguracionClick}>
                    Configuración de Ventas
                </button>
            </div>


        </div>
    );
};

export default VentasHome;