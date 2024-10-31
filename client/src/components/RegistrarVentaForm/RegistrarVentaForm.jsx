import React, { useState } from 'react';
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';
import './RegistrarVentaForm.css';

const RegistrarVentaForm = ({ clientes, productos, venta, setVenta, onRegistrarVenta }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    const handleClienteChange = (selectedOption) => {
        setVenta({ ...venta, clienteId: selectedOption.value });
    };

    const handleAgregarProducto = () => {
        if (selectedProduct && cantidad > 0) {
            const producto = productos.find(p => p.idProducto === selectedProduct.value);
            const precioUnitario = venta.clienteId ? parseFloat(producto.PrecioAfiliados) : parseFloat(producto.PrecioVenta);
            const cantidadNumerica = parseInt(cantidad, 10);

            // Verificar que la cantidad seleccionada no supere la cantidad en stock
            if (cantidadNumerica > producto.Cantidad) {
                alert('La cantidad seleccionada supera la cantidad en stock.');
                return;
            }

            const subtotal = precioUnitario * cantidadNumerica;

            if (isNaN(subtotal)) {
                console.error('Error: Subtotal es NaN. Verifique los valores de precio y cantidad.');
                return;
            }

            const nuevoProducto = {
                inventarioId: producto.idProducto,
                cantidad: cantidadNumerica,
                precioUnitario,
                subtotal,
            };

            setVenta({
                ...venta,
                productos: [...venta.productos, nuevoProducto],
                total: venta.total + subtotal,
            });

            setModalIsOpen(false);
            setSelectedProduct(null);
            setCantidad(1);
        }
    };

    const handleEliminarProducto = (index) => {
        const productoEliminado = venta.productos[index];
        setVenta({
            ...venta,
            productos: venta.productos.filter((_, i) => i !== index),
            total: venta.total - productoEliminado.subtotal,
        });
    };

    return (
        <div className="registrar-venta-form">
            <div className="form-group">
                <label>Cliente</label>
                <Select
                    options={clientes.map(cliente => ({ value: cliente.cliente_id, label: `${cliente.persona_nombre} ${cliente.persona_apellido}` }))}
                    onChange={handleClienteChange}
                />
            </div>

            <div className="form-group">
                <Button onClick={() => setModalIsOpen(true)} className="agregar-producto-button">
                    Agregar Productos
                </Button>
            </div>

            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Select
                        options={productos.map(producto => ({ value: producto.idProducto, label: producto.Producto }))}
                        onChange={setSelectedProduct}
                    />
                    <div className="form-group">
                        <label>Cantidad</label>
                        <input
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
                            min="1"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleAgregarProducto} className="agregar-producto-button">
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="carrito-ventas">
                <h3>Carrito de Ventas</h3>
                <ul>
                    {venta.productos.map((producto, index) => (
                        <li key={index}>
                            {producto.cantidad} x {productos.find(p => p.idProducto === producto.inventarioId).Producto} - ${producto.subtotal.toFixed(2)}
                            <Button variant="danger" onClick={() => handleEliminarProducto(index)} className="eliminar-producto-button">
                                Eliminar
                            </Button>
                        </li>
                    ))}
                </ul>
                <h4>Total: ${venta.total.toFixed(2)}</h4>
            </div>

            <Button variant="success" onClick={onRegistrarVenta} className="finalizar-venta-button">
                Finalizar Venta
            </Button>
        </div>
    );
};

export default RegistrarVentaForm;