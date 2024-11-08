import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarVentaRequest, procesarPagoEfectivoRequest, crearOrdenQRRequest } from '../../../api/ventas.api';
import { getClientesRequest } from '../../../api/clientes.api';
import { inventarioList } from '../../../api/inventario.api';
import RegistrarVentaForm from '../../../components/RegistrarVentaForm/RegistrarVentaForm';
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
                setProductos(responseProductos); // Asegurarse de que los datos se asignen correctamente
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
                onRegistrarVenta={registrarVentaRequest}
                onProcesarPago={onProcesarPago}
                onProcesarPagoMercadoPago={onProcesarPagoMercadoPago}
                paymentStatus={paymentStatus}
                handleNewSale={handleNewSale}
            />
        </div>
    );
};

export default RegistrarVenta;