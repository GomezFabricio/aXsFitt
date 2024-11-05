import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './RegistrarVentaForm.css';

const RegistrarVentaForm = ({ clientes, productos = [], venta, setVenta, onRegistrarVenta, onProcesarPago }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [qrCode, setQrCode] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null); // Estado para el resultado del pago

    const navigate = useNavigate(); // Definir navigate

    useEffect(() => {
        console.log('Productos en RegistrarVentaForm:', productos); // Verificar que los productos se pasen correctamente
    }, [productos]);

    const handleClienteChange = (selectedOption) => {
        const cliente = clientes.find(cliente => cliente.cliente_id === selectedOption.value);
        setVenta({ ...venta, clienteId: selectedOption.value });
        setEmail(cliente.usuario_email || '');
        setPhone(cliente.persona_telefono || '');
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

    const handleContinue = () => {
        setShowPaymentOptions(true);
    };

    const handlePaymentOptionClick = (method) => {
        setPaymentMethod(method);
        setQrCode(null); // Reset QR code when changing payment method
    };

    const handleConfirmPayment = async (method) => {
        if (!paymentMethod) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }

        setShowPaymentOptions(false); // Cerrar el modal de opciones de pago
        if (method === 'qr') {
            // Simular la generación de un código QR
            setQrCode('https://via.placeholder.com/150');
            setShowPaymentOptions(true); // Reabrir el modal de opciones de pago para mostrar el QR
        } else {
            try {
                await onProcesarPago(paymentMethod, email, phone);
                setPaymentStatus('success');
            } catch (error) {
                setPaymentStatus('error');
            }
            setShowConfirmationModal(true); // Mostrar el modal de confirmación
        }
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

            <div className="form-group">
                <Button onClick={handleContinue} className="continuar-button">
                    Continuar
                </Button>
            </div>

            <Modal show={showPaymentOptions} onHide={() => setShowPaymentOptions(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Opciones de Pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="payment-options">
                        <Button variant="primary" onClick={() => handlePaymentOptionClick('efectivo')} className="pago-button">
                            Pago en Efectivo
                        </Button>
                        <Button variant="primary" onClick={() => handlePaymentOptionClick('mercadopago')} className="pago-button">
                            Pago con Mercado Pago
                        </Button>
                        <Button variant="primary" onClick={() => handlePaymentOptionClick('tarjeta')} className="pago-button">
                            Pago con Tarjeta
                        </Button>
                    </div>

                    {paymentMethod === 'mercadopago' && (
                        <div className="mercadopago-options">
                            <Button variant="primary" onClick={() => handleConfirmPayment('qr')}>
                                Pagar con QR
                            </Button>
                            <Button variant="primary" onClick={() => handleConfirmPayment('link')}>
                                Enviar Link de Pago
                            </Button>
                            {qrCode && (
                                <div className="qr-code">
                                    <img src={qrCode} alt="QR Code" />
                                </div>
                            )}
                        </div>
                    )}
                    {paymentMethod && paymentMethod !== 'mercadopago' && (
                        <div className="contact-info">
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleConfirmPayment}>
                                Confirmar Pago
                            </Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>

            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{paymentStatus === 'success' ? 'Pago realizado correctamente' : 'Error en el pago'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {paymentStatus === 'success' ? (
                        <p>El pago se ha realizado con éxito.</p>
                    ) : (
                        <p>Ha ocurrido un error al procesar el pago. Por favor, intenta nuevamente.</p>
                    )}
                    <div className="confirmation-buttons">
                        <Button variant="primary" onClick={() => navigate('/ventas/listado')}>
                            Regresar al listado de ventas
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/ventas/registrar')}>
                            Iniciar nueva venta
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RegistrarVentaForm;