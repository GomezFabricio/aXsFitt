import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { inventarioList, agregarInventario } from '../../../api/inventario.api';
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
        setShowModal(true);
        setErrorMessage('');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage('');
        setShowWarning(false);
    };

    const handleInventarioAgregado = async () => {
        const data = await inventarioList();
        setInventario(data);
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
            const response = await agregarInventario(values);
            if (response.reingreso) {
                setFormValues(values);
                setShowWarning(true);
            } else {
                handleInventarioAgregado();
                handleCloseModal();
            }
        } catch (error) {
            console.error('Error agregando inventario:', error);
            setErrorMessage(error.message || 'Error agregando inventario');
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
                handleCloseModal();
            } catch (error) {
                console.error('Error realizando reingreso:', error);
                setErrorMessage(error.message || 'Error realizando reingreso');
            }
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

            <InventarioList inventario={inventario} />

            {showModal && (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, setFieldValue }) => (
                        <FormularioInventario handleSubmit={handleSubmit} onClose={handleCloseModal} setFieldValue={setFieldValue} isSubmitting={isSubmitting} errorMessage={errorMessage} showWarning={showWarning} handleReingreso={handleReingreso} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default Inventario;