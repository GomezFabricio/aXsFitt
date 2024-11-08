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
                console.log('Productos recibidos:', responseProductos);
                setProductos(responseProductos);
            } catch (error) {
                console.error('Error cargando productos:', error);
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
            const storeId = '59552643'; 
            const externalPosId = '96494571'; 

            // Preparar la data que se envía a la API
            const data = {
                cantidad: venta.total,
                productos: venta.productos.map(producto => ({
                    descripcion: producto.nombre,
                    cantidad: producto.cantidad,
                    precio: producto.subtotal,
                })),
                clienteId: venta.clienteId,
            };

            // Crear la orden en Mercado Pago y generar el QR
            const response = await crearOrdenQRRequest(data, userId, storeId, externalPosId);
            
            // Obtener la URL del QR
            const qrUrl = response.qr_url;  // Suponiendo que Mercado Pago devuelve la URL del QR
            setQrData(qrUrl);

            // Mostrar el QR usando la librería qrcode
            QRCode.toCanvas(document.getElementById('canvas'), qrUrl, (error) => {
                if (error) console.error('Error generando el QR:', error);
                console.log('QR generado con éxito');
            });

            setPaymentStatus('success');
        } catch (error) {
            setPaymentStatus('error');
            console.error('Error al procesar el pago con Mercado Pago:', error);
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
