import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { productosList, agregarProducto, eliminarProducto } from '../../../api/inventario.api';
import ProductosList from '../../../components/ProductosList/ProductosList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import FormularioProducto from '../../../components/FormularioProducto/FormularioProducto';
import { useNavigate } from 'react-router-dom';
import './Productos.css';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await productosList();
                setProductos(data);
            } catch (error) {
                console.error('Error fetching productos:', error);
                setProductos([]);
            }
        };

        fetchProductos();
    }, []);

    const navigate = useNavigate();

    const handleAgregarClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleProductoAgregado = async () => {
        const data = await productosList();
        setProductos(data);
    };

    const handleDelete = async (idProducto) => {
        try {
            await eliminarProducto(idProducto);
            const updatedProductos = productos.filter(producto => producto.idProducto !== idProducto);
            setProductos(updatedProductos);
        } catch (error) {
            console.error('Error eliminando producto:', error);
            setErrorMessage(error.message || 'No se puede eliminar el producto porque está asociado a uno o más registros de inventario.');
        }
    };

    const initialValues = {
        codigoBarrasProducto: '',
        nombreProducto: '',
        idTipoProducto: '',
        idMarcaProducto: ''
    };

    const validationSchema = Yup.object({
        codigoBarrasProducto: Yup.string().required('Requerido'),
        nombreProducto: Yup.string().required('Requerido'),
        idTipoProducto: Yup.number().required('Requerido'),
        idMarcaProducto: Yup.number().required('Requerido')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await agregarProducto(values);
            handleProductoAgregado();
            handleCloseModal();
        } catch (error) {
            console.error('Error agregando producto:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Productos</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Agregar Producto
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar los productos.</h2>
            <MenuEnInventario />

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <ProductosList productos={productos} onDelete={handleDelete} />

            {showModal && (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, setFieldValue }) => (
                        <FormularioProducto handleSubmit={handleSubmit} onClose={handleCloseModal} setFieldValue={setFieldValue} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default Productos;