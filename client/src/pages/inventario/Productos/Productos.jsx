import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { productosList, agregarProducto, eliminarProducto, editarProducto } from '../../../api/inventario.api';
import ProductosList from '../../../components/ProductosList/ProductosList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import FormularioProducto from '../../../components/FormularioProducto/FormularioProducto';
import { useNavigate } from 'react-router-dom';
import './Productos.css';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
        setFormValues(initialValues);
        setShowModal(true);
        setErrorMessage('');
        setIsEditing(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage('');
    };

    const handleProductoAgregado = async () => {
        const data = await productosList();
        setProductos(data);
        handleCloseModal();
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
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await editarProducto(formValues.idProducto, values);
                handleProductoAgregado();
            } else {
                await agregarProducto(values);
                handleProductoAgregado();
            }
        } catch (error) {
            console.error('Error agregando/editando producto:', error);
            setErrorMessage(error.message || 'Error agregando/editando producto');
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };

    const handleDelete = async (idProducto) => {
        try {
            await eliminarProducto(idProducto);
            const updatedProductos = productos.filter(producto => producto.idProducto !== idProducto);
            setProductos(updatedProductos);
        } catch (error) {
            console.error('Error eliminando producto:', error);
            setErrorMessage(error.message || 'Error eliminando producto');
        }
    };

    const handleEdit = (producto) => {
        setFormValues({
            idProducto: producto.idProducto,
            codigoBarrasProducto: producto.CodigoBarras,
            nombreProducto: producto.Producto,
            idTipoProducto: producto.idTipoProducto,
            idMarcaProducto: producto.idMarcaProducto
        });
        setShowModal(true);
        setIsEditing(true);
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

            <ProductosList productos={productos} onDelete={handleDelete} onEdit={handleEdit} />

            {showModal && (
                <Formik
                    initialValues={formValues || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ handleSubmit, setFieldValue }) => (
                        <FormularioProducto handleSubmit={handleSubmit} onClose={handleCloseModal} setFieldValue={setFieldValue} isSubmitting={isSubmitting} errorMessage={errorMessage} isEditing={isEditing} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default Productos;