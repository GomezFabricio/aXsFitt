import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { procesarPagoEfectivoRequest } from '../../../api/ventas.api';
import { crearOrdenQRRequest } from '../../../api/mercadopago.api';
import { getClientesRequest } from '../../../api/clientes.api';
import { inventarioList } from '../../../api/inventario.api';
import RegistrarVentaForm from '../../../components/RegistrarVentaForm/RegistrarVentaForm';
import { QRCode } from 'react-qrcode-logo';  // Importa la librería QRCode correctamente
import { Modal, Button, Spinner } from 'react-bootstrap';
import './RegistrarVenta.css';
//import logo from '../../../assets/img/logo_escalado.png';  // Importa la imagen del logo y asígnala a una variable

const RegistrarVenta = () => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [venta, setVenta] = useState({
        clienteId: '',
        vendedorId: '', // Asumimos que el vendedor está autenticado y su ID está disponible
        productos: [],
        total: 0,
    });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [qrData, setQrData] = useState('');  // Aquí se guarda la URL del QR
    const [showQrModal, setShowQrModal] = useState(false);  // Estado para mostrar el modal del QR
    const [loadingQr, setLoadingQr] = useState(false);  // Estado para manejar la carga del QR
    const navigate = useNavigate();

    useEffect(() => {
        async function loadClientes() {
            const responseClientes = await getClientesRequest();
            setClientes(responseClientes.data);
        }

        async function loadProductos() {
            try {
                const responseProductos = await inventarioList();
                setProductos(responseProductos);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        }

        loadClientes();
        loadProductos();
    }, []);

    const onProcesarPago = async () => {
        try {
            await procesarPagoEfectivoRequest(venta);
            setPaymentStatus('success');
        } catch (error) {
            setPaymentStatus('error');
        }
    };

    const onProcesarPagoMercadoPago = async () => {
        setShowQrModal(true);  // Mostrar el modal del QR inmediatamente
        setLoadingQr(true);  // Mostrar el spinner de carga

        try {
            // Datos necesarios para la API de Mercado Pago
            const userId = '250056888'; 
            const externalPosId = 'SUC001POS001'; 
    
            // Preparar la data que se envía a la API
            const data = {
                external_reference: 'reference_12345',
                title: 'Product order',
                description: 'Purchase description.',
                notification_url: 'https://webhook.site/8738876d-8f52-458a-ba1d-be3e40adbf59',
                total_amount: venta.total,
                items: venta.productos.map(producto => ({
                    sku_number: producto.inventarioId.toString(), // Convierte el ID del inventario a cadena
                    category: 'marketplace',
                    title: productos.find(p => p.idProducto === producto.inventarioId).Producto,
                    description: productos.find(p => p.idProducto === producto.inventarioId).Producto || 'Descripción del producto',
                    unit_price: producto.precioUnitario,
                    quantity: producto.cantidad,
                    unit_measure: 'unit',
                    total_amount: producto.subtotal
                })),
                cash_out: {
                    amount: 0
                }
            };
    
            // Crear la orden en Mercado Pago y generar el QR
            const response = await crearOrdenQRRequest(data, userId, externalPosId);
            
            // Obtener la URL del QR
            console.log('Respuesta de Mercado Pago:', response);
            setQrData(response.qr_data);  // Guarda la URL del QR
            setLoadingQr(false);  // Ocultar el spinner de carga
        } catch (error) {
            console.error('Error al procesar el pago con Mercado Pago:', error.response ? error.response.data : error.message);
            setLoadingQr(false);  // Ocultar el spinner de carga en caso de error
        }
    };

    const handleNewSale = () => {
        setVenta({
            clienteId: '',
            vendedorId: '',
            productos: [],
            total: 0,
        });
        setPaymentStatus(null);
        setQrData('');
        setShowQrModal(false);  // Ocultar el modal del QR
    };

    return (
        <div className="container-page">
            <RegistrarVentaForm
                clientes={clientes}
                productos={productos}
                venta={venta}
                setVenta={setVenta}
                onProcesarPago={onProcesarPago}
                onProcesarPagoMercadoPago={onProcesarPagoMercadoPago}
                paymentStatus={paymentStatus}
                handleNewSale={handleNewSale}
            />
            <Modal show={showQrModal} onHide={() => setShowQrModal(false)} centered className="qr-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Escanee el QR para completar el pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingQr ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </Spinner>
                        </div>
                    ) : (
                        qrData && (
                            <div className="qr-code">
                                <QRCode 
                                    value={qrData} 
                                    size={256} 
                                />
                            </div>
                        )
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowQrModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegistrarVenta;