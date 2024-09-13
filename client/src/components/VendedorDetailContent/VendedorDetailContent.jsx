import React from 'react';
import './VendedorDetailContent.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const VendedorDetailContent = ({
    nombre,
    apellido,
    dni,
    ventasAcumuladas,
    ventasUltimoPeriodo,
    totalComisiones,
    onDelete,
    onUpdate 
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
            </div>

            <div className="vendedor-detail-buttons">
                <button className="btn-client btn-edit" onClick={onUpdate}>
                    <FaEdit /> Editar
                </button>
                <button className="btn-client btn-delete" onClick={onDelete}>
                    <FaTrash /> Eliminar
                </button>
            </div>
        </div>
    );
};

export default VendedorDetailContent;
