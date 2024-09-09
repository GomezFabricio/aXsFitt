import React from 'react';
import './VendedoresInactivosTable.css';

const VendedoresInactivosTable = ({ vendedores, onActivate }) => {
    return (
        <table className="vendedores-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Fecha de Ingreso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {vendedores.map((vendedor) => (
                    <tr key={vendedor.vendedor_id}>
                        <td>{vendedor.persona_nombre}</td>
                        <td>{vendedor.persona_apellido}</td>
                        <td>{vendedor.persona_dni}</td>
                        <td>{new Date(vendedor.vendedor_fecha_ingreso).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => onActivate(vendedor.vendedor_id)} className="btn-activate">
                                Alta
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VendedoresInactivosTable;
