import React from 'react';
import { useNavigate } from 'react-router-dom';
import { descargarReporteVentasRequest } from '../../../api/ventas.api';

const VentasHome = () => {
    const navigate = useNavigate();

    const handleRegistrarVentaClick = () => {
        navigate('/ventas/registrar');
    };

    const handleVerVentasClick = () => {
        navigate('/ventas/listado');
    };

    const handleReportesClick = async () => {
        try {
            await descargarReporteVentasRequest();
        } catch (error) {
            console.error('Error descargando el reporte de ventas:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-light mb-4" style={{ color: '#9E3DA5' }}>Ventas</h1>
                <h2 className="text-xl" style={{ color: '#989898' }}>En esta sección podrás gestionar todas las operaciones relacionadas con las ventas.</h2>
            </div>

            <div className="flex flex-col items-center gap-4 p-5 mt-5 w-full md:w-1/3 mx-auto">
                <button
                    className="text-white px-6 py-3 rounded-md shadow-md hover:bg-[#7b2a7d] transition duration-300 w-full"
                    style={{ backgroundColor: '#9E3DA5' }}
                    onClick={handleRegistrarVentaClick}
                >
                    Registrar Venta
                </button>
                <button
                    className="text-white px-6 py-3 rounded-md shadow-md hover:bg-[#7b2a7d] transition duration-300 w-full"
                    style={{ backgroundColor: '#9E3DA5' }}
                    onClick={handleVerVentasClick}
                >
                    Ver Ventas Realizadas
                </button>
                <button
                    className="text-white px-6 py-3 rounded-md shadow-md hover:bg-[#7b2a7d] transition duration-300 w-full"
                    style={{ backgroundColor: '#9E3DA5' }}
                    onClick={handleReportesClick}
                >
                    Reportes de Ventas
                </button>
            </div>
        </div>
    );
};

export default VentasHome;