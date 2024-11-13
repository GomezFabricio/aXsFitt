import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { inventarioList, agregarInventario, obtenerInventarioPorId, eliminarInventario, editarInventario } from '../../../api/inventario.api';
import InventarioList from '../../../components/InventarioList/InventarioList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import FormularioInventario from '../../../components/FormularioInventario/FormularioInventario';
import { useNavigate } from 'react-router-dom';
import './Inventario.css';

const Inventario = () => {
    const [inventario, setInventario] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const [isReingreso, setIsReingreso] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchInventario = async () => {
            try {
                const data = await inventarioList();
                setInventario(data);
            } catch (error) {
                console.error('Error fetching inventario:', error);
                setInventario([]);
            }
        };

        fetchInventario();
    }, []);

    const navigate = useNavigate();

    const handleAgregarClick = () => {
        setFormValues(initialValues);
        setShowModal(true);
        setErrorMessage('');
        setIsReingreso(false);
        setIsEditing(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage('');
        setShowWarning(false);
    };

    const handleInventarioAgregado = async () => {
        const data = await inventarioList();
        setInventario(data);
        handleCloseModal();
    };

    const initialValues = {
        productoId: '',
        codigoBarras: '',
        cantidad: '',
        precioCosto: '',
        incremento: '',
        precioVenta: ''
    };

    const validationSchema = Yup.object({
        productoId: Yup.number().required('Requerido'),
        cantidad: Yup.number().required('Requerido'),
        precioCosto: Yup.number().required('Requerido'),
        incremento: Yup.number(),
        precioVenta: Yup.number()
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await editarInventario(formValues.productoId, values);
                handleInventarioAgregado();
                window.location.reload(); // Recargar la página inmediatamente después de editar
            } else {
                const response = await agregarInventario(values);
                if (response.reingreso) {
                    setFormValues(values);
                    setShowWarning(true);
                } else {
                    handleInventarioAgregado();
                }
            }
        } catch (error) {
            console.error('Error agregando/editando inventario:', error);
            setErrorMessage(error.message || 'Error agregando/editando inventario');
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };

    const handleReingreso = async () => {
        if (formValues) {
            try {
                await agregarInventario({ ...formValues, reingreso: true });
                handleInventarioAgregado();
            } catch (error) {
                console.error('Error realizando reingreso:', error);
                setErrorMessage(error.message || 'Error realizando reingreso');
            }
        }
    };

    const handleReingresoClick = async (idProducto) => {
        try {
            const inventarioData = await obtenerInventarioPorId(idProducto);
            setFormValues({
                productoId: inventarioData.idProducto,
                codigoBarras: inventarioData.CodigoBarras,
                cantidad: '',
                precioCosto: inventarioData.PrecioCosto,
                incremento: '',
                precioVenta: inventarioData.PrecioVenta
            });
            setShowModal(true);
            setIsReingreso(true);
        } catch (error) {
            console.error('Error obteniendo producto para reingreso:', error);
        }
    };

    const handleDelete = async (idProducto) => {
        setIsLoading(true);
        try {
            await eliminarInventario(idProducto);
            const updatedInventario = inventario.filter(item => item.idProducto !== idProducto);
            setInventario(updatedInventario);
        } catch (error) {
            console.error('Error eliminando producto del inventario:', error);
            setErrorMessage(error.message || 'Error eliminando producto del inventario');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (idProducto) => {
        try {
            const inventarioData = await obtenerInventarioPorId(idProducto);
            setFormValues({
                productoId: inventarioData.idProducto,
                codigoBarras: inventarioData.CodigoBarras,
                cantidad: inventarioData.Cantidad,
                precioCosto: inventarioData.PrecioCosto,
                incremento: inventarioData.Incremento,
                precioVenta: inventarioData.PrecioVenta
            });
            setShowModal(true);
            setIsEditing(true);
        } catch (error) {
            console.error('Error obteniendo producto para edición:', error);
        }
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Inventario</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Nuevo Ingreso
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar el inventario.</h2>
            <MenuEnInventario />

            {isLoading ? (
                <div className="loading">Cargando...</div>
            ) : (
                <InventarioList inventario={inventario} onDelete={handleDelete} onEdit={handleEdit} onReingreso={handleReingresoClick} />
            )}

            {showModal && (
                <Formik
                    initialValues={formValues || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ handleSubmit, setFieldValue }) => (
                        <FormularioInventario handleSubmit={handleSubmit} onClose={handleCloseModal} setFieldValue={setFieldValue} isSubmitting={isSubmitting} errorMessage={errorMessage} showWarning={showWarning} handleReingreso={handleReingreso} isReingreso={isReingreso} formValues={formValues} isEditing={isEditing} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default Inventario;