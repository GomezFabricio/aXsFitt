import React from 'react';
import { Table, Button } from 'react-bootstrap';

const VendedoresInactivosTable = ({ vendedores, onActivate }) => {
    return (
        <Table striped bordered hover className="vendedores-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {vendedores.map((vendedor) => (
                    <tr key={vendedor.vendedor_id}>
                        <td>{vendedor.persona_nombre}</td>
                        <td>{vendedor.persona_apellido}</td>
                        <td>{vendedor.persona_dni}</td>
                        <td>
                            <Button 
                                onClick={() => onActivate(vendedor.vendedor_id)} 
                                className="btn btn-primary btn-sm"
                            >
                                Alta
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default VendedoresInactivosTable;