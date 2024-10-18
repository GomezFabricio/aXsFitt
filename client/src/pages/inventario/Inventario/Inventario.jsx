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
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInventarioAgregado = async () => {
        const data = await inventarioList();
        setInventario(data);
    };

    const initialValues = {
        productoId: '',
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
            await agregarInventario(values);
            handleInventarioAgregado();
            handleCloseModal();
        } catch (error) {
            console.error('Error agregando inventario:', error);
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
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
                        <FormularioInventario handleSubmit={handleSubmit} onClose={handleCloseModal} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default Inventario;