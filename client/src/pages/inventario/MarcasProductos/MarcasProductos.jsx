import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { marcasList, agregarMarca, eliminarMarca } from '../../../api/inventario.api';
import MarcasList from '../../../components/MarcasList/MarcasList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import FormularioMarcas from '../../../components/FormularioMarcas/FormularioMarcas';
import { useNavigate } from 'react-router-dom';
import './MarcasProductos.css';

const MarcasProductos = () => {
    const [marcas, setMarcas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const data = await marcasList();
                setMarcas(data);
            } catch (error) {
                console.error('Error fetching marcas:', error);
                setMarcas([]);
            }
        };

        fetchMarcas();
    }, []);

    const navigate = useNavigate();

    const handleAgregarClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleMarcaAgregada = async () => {
        const data = await marcasList();
        setMarcas(data);
    };

    const handleDelete = async (idMarcaProducto) => {
        try {
            await eliminarMarca(idMarcaProducto);
            const updatedMarcas = marcas.filter(marca => marca.idMarcaProducto !== idMarcaProducto);
            setMarcas(updatedMarcas);
        } catch (error) {
            console.error('Error eliminando marca:', error);
            setErrorMessage(error.message || 'No se puede eliminar la marca porque está asociada a uno o más productos.');
        }
    };

    const initialValues = {
        nombreMarca: '',
    };

    const validationSchema = Yup.object({
        nombreMarca: Yup.string().required('El nombre de la marca es obligatorio'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await agregarMarca(values.nombreMarca);
            handleMarcaAgregada();
            handleCloseModal();
        } catch (error) {
            console.error('Error agregando marca:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Marcas de Productos</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Agregar Marca
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar las marcas de productos.</h2>
            <MenuEnInventario />

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <MarcasList marcas={marcas} onDelete={handleDelete} />

            {showModal && (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <FormularioMarcas handleSubmit={handleSubmit} onClose={handleCloseModal} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default MarcasProductos;