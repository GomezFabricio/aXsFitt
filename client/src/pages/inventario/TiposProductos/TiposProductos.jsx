import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { tiposProductosList, agregarTipoProducto, eliminarTipoProducto } from '../../../api/inventario.api';
import TiposProductosList from '../../../components/TiposProductosList/TiposProductosList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import FormularioTiposProductos from '../../../components/FormularioTiposProductos/FormularioTiposProductos';
import { useNavigate } from 'react-router-dom';
import './TiposProductos.css';

const TiposProductos = () => {
    const [tiposProductos, setTiposProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchTiposProductos = async () => {
            try {
                const data = await tiposProductosList();
                setTiposProductos(data);
            } catch (error) {
                console.error('Error fetching tipos de productos:', error);
                setTiposProductos([]);
            }
        };

        fetchTiposProductos();
    }, []);

    const navigate = useNavigate();

    const handleAgregarClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleTipoProductoAgregado = async () => {
        const data = await tiposProductosList();
        setTiposProductos(data);
    };

    const handleDelete = async (idTipoProducto) => {
        try {
            await eliminarTipoProducto(idTipoProducto);
            const updatedTiposProductos = tiposProductos.filter(tipoProducto => tipoProducto.idTipoProducto !== idTipoProducto);
            setTiposProductos(updatedTiposProductos);
        } catch (error) {
            console.error('Error eliminando tipo de producto:', error);
            setErrorMessage(error.message || 'No se puede eliminar el tipo de producto porque está asociado a uno o más productos.');
        }
    };

    const initialValues = {
        nombreTipoProducto: '',
    };

    const validationSchema = Yup.object({
        nombreTipoProducto: Yup.string().required('El nombre del tipo de producto es obligatorio'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await agregarTipoProducto(values.nombreTipoProducto);
            handleTipoProductoAgregado();
            handleCloseModal();
        } catch (error) {
            console.error('Error agregando tipo de producto:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Tipos de Productos</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Agregar Tipo de Producto
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar los tipos de productos.</h2>
            <MenuEnInventario />

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <TiposProductosList tiposProductos={tiposProductos} onDelete={handleDelete} />

            {showModal && (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <FormularioTiposProductos handleSubmit={handleSubmit} onClose={handleCloseModal} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default TiposProductos;