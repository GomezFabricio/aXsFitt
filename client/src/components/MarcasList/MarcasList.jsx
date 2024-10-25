import React, { useState } from 'react';
import './MarcasList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const MarcasList = ({ marcas, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMarcas = marcas.filter(item =>
        item.nombreMarcaProducto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="marcasTableContainer">
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            {Array.isArray(filteredMarcas) && filteredMarcas.length > 0 ? (
                <table id="marcasTable" className="display">
                    <thead>
                        <tr>
                            <th>Marca Producto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMarcas.map((marca) => (
                            <tr key={marca.idMarcaProducto}>
                                <td>{marca.nombreMarcaProducto}</td>
                                <td className="action-buttons">
                                    <button className="edit-button btn btn-sm me-2" onClick={() => onEdit(marca)}>
                                        <i className="fas fa-edit icon"></i>
                                    </button>
                                    <button className="delete-button btn btn-sm me-2" onClick={() => onDelete(marca.idMarcaProducto)}>
                                        <i className="fas fa-trash-alt icon"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos disponibles en las marcas.</p>
            )}
        </div>
    );
};

export default MarcasList;