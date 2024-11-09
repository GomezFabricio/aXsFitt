import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { procesarPagoEfectivoRequest } from '../../../api/ventas.api';
import { crearOrdenQRRequest } from '../../../api/mercadopago.api';
import { getClientesRequest } from '../../../api/clientes.api';
import { inventarioList } from '../../../api/inventario.api';
import RegistrarVentaForm from '../../../components/RegistrarVentaForm/RegistrarVentaForm';
import QRCode from 'qrcode';  // Importa la librería QRCode
import './RegistrarVenta.css';

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
        try {
            // Datos necesarios para la API de Mercado Pago
            const userId = '250056888'; 
            const externalPosId = 'SUC001POS001'; 
    
            // Preparar la data que se envía a la API
            const data = {
                external_reference: 'reference_12345',
                title: 'Product order',
                description: 'Purchase description.',
                notification_url: 'https://www.yourserver.com/notifications',
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
                sponsor: {
                    id: 662208785
                },
                cash_out: {
                    amount: 0
                }
            };
    
            // Crear la orden en Mercado Pago y generar el QR
            const response = await crearOrdenQRRequest(data, userId, externalPosId);
            
            // Obtener la URL del QR
            console.log('URL del QR:', response.qr_code);
            setQrData(response.qr_code);  // Guarda la URL del QR
        } catch (error) {
            console.error('Error al procesar el pago con Mercado Pago:', error.response ? error.response.data : error.message);
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
            {paymentStatus === 'success' && qrData && (
                <div>
                    <h3>Escanee el QR para completar el pago</h3>
                    <canvas id="canvas" />
                </div>
            )}
        </div>
    );
};

export default RegistrarVenta;