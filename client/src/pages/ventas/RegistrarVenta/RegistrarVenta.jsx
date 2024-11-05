import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarVentaRequest, procesarPagoMercadoPagoRequest, procesarPagoEfectivoRequest, procesarPagoTarjetaRequest } from '../../../api/ventas.api';
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

    const handleRegistrarVenta = async () => {
        try {
            const response = await registrarVentaRequest(venta);
            setVenta({ ...venta, id: response.data.ventaId }); // Guardar el ID de la venta
            navigate('/ventas/listado');
        } catch (error) {
            console.error('Error registrando la venta:', error);
        }
    };

    const handleProcesarPago = async (method, email, phone) => {
        try {
            let response;
            if (method === 'efectivo') {
                response = await procesarPagoEfectivoRequest({ clienteId: venta.clienteId, productos: venta.productos, total: venta.total });
            } else if (method === 'mercadopago') {
                response = await procesarPagoMercadoPagoRequest({ token: 'dummy_token', transactionAmount: venta.total, description: 'Venta', installments: 1, paymentMethodId: 'visa', email });
            } else if (method === 'tarjeta') {
                response = await procesarPagoTarjetaRequest({ token: 'dummy_token', transactionAmount: venta.total, description: 'Venta', installments: 1, paymentMethodId: 'visa', email });
            }
            console.log('Pago procesado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error procesando el pago:', error);
            throw error;
        }
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Registrar Venta</h1>
            </div>

            <RegistrarVentaForm
                clientes={clientes}
                productos={productos}
                venta={venta}
                setVenta={setVenta}
                onRegistrarVenta={handleRegistrarVenta}
                onProcesarPago={handleProcesarPago}
            />
        </div>
    );
};

export default RegistrarVenta;