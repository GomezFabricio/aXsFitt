import React from 'react';
import './VendedorDetailContent.css';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

const VendedorDetailContent = ({
    nombre,
    apellido,
    dni,
    ventasAcumuladas,
    ventasUltimoPeriodo,
    totalComisiones,
    comisionesUltimoPeriodo,
}) => {
    return (
        <div className="vendedor-detail-container">
            <div className="vendedor-detail-header">
                <h2>{`${nombre} ${apellido}`}</h2>
                <p>DNI: {dni}</p>
            </div>

            <div className="vendedor-detail-info">
                <p>Ventas acumuladas: {ventasAcumuladas}</p>
                <p>Ventas en el último periodo: {ventasUltimoPeriodo}</p>
                <p>Total acumulado en comisiones: {totalComisiones}</p>
                <p>Total comisiones en el último periodo: {comisionesUltimoPeriodo}</p>
            </div>

            <div className="vendedor-detail-buttons">
                <button className="btn-client btn-edit">
                    <FaEdit /> Editar
                </button>
                <button className="btn-client btn-delete">
                    <FaTrash /> Eliminar
                </button>
            </div>
        </div>
    );
};

export default VendedorDetailContent;
