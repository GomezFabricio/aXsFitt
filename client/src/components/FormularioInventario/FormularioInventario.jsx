import React, { useState, useEffect } from 'react';
import { Field, Form, ErrorMessage } from 'formik';
import './FormularioInventario.css';
import { productosList } from '../../api/inventario.api';

const FormularioInventario = ({ handleSubmit, onClose, setFieldValue, isSubmitting }) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await productosList();
                setProductos(data);
            } catch (error) {
                console.error('Error fetching productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className="modal-inventario">
            <div className="modal-content-inventario">
                <span className="close-inventario" onClick={onClose}>&times;</span>
                <h2>Registrar Nuevo Ingreso</h2>
                <Form className="form-inventario" onSubmit={handleSubmit}>
                    <label htmlFor="productoId" className="label-inventario">Producto:</label>
                    <Field as="select" id="productoId" name="productoId" className="input-inventario">
                        <option value="">Seleccione un producto</option>
                        {productos.map(producto => (
                            <option key={producto.idProducto} value={producto.idProducto}>{producto.Producto}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="productoId" component="div" className="error-inventario" />

                    <label htmlFor="cantidad" className="label-inventario">Cantidad:</label>
                    <Field type="number" id="cantidad" name="cantidad" className="input-inventario" />
                    <ErrorMessage name="cantidad" component="div" className="error-inventario" />

                    <label htmlFor="precioCosto" className="label-inventario">Precio de Costo:</label>
                    <Field type="number" id="precioCosto" name="precioCosto" className="input-inventario" />
                    <ErrorMessage name="precioCosto" component="div" className="error-inventario" />

                    <label htmlFor="incremento" className="label-inventario">Incremento (%):</label>
                    <Field type="number" id="incremento" name="incremento" className="input-inventario" />
                    <ErrorMessage name="incremento" component="div" className="error-inventario" />

                    <label htmlFor="precioVenta" className="label-inventario">Precio de Venta:</label>
                    <Field type="number" id="precioVenta" name="precioVenta" className="input-inventario" />
                    <ErrorMessage name="precioVenta" component="div" className="error-inventario" />

                    <button type="submit" className="button-inventario" disabled={isSubmitting}>Registrar</button>
                </Form>
            </div>
        </div>
    );
};

export default FormularioInventario;