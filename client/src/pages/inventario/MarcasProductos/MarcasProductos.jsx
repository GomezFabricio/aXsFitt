import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { marcasList, agregarMarca, eliminarMarca, editarMarca } from '../../../api/inventario.api';
import MarcasList from '../../../components/MarcasList/MarcasList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import FormularioMarcas from '../../../components/FormularioMarcas/FormularioMarcas';
import { useNavigate } from 'react-router-dom';
import './MarcasProductos.css';

const MarcasProductos = () => {
    const [marcas, setMarcas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
        setFormValues(initialValues);
        setShowModal(true);
        setIsEditing(false);
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

    const handleEdit = (marca) => {
        setFormValues({
            idMarcaProducto: marca.idMarcaProducto,
            nombreMarcaProducto: marca.nombreMarcaProducto,
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const initialValues = {
        nombreMarcaProducto: '',
    };

    const validationSchema = Yup.object({
        nombreMarcaProducto: Yup.string().required('El nombre de la marca es obligatorio'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (isEditing) {
                await editarMarca(formValues.idMarcaProducto, values);
            } else {
                await agregarMarca(values.nombreMarcaProducto);
            }
            handleMarcaAgregada();
            handleCloseModal();
        } catch (error) {
            console.error('Error agregando/editando marca:', error);
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

            <MarcasList marcas={marcas} onDelete={handleDelete} onEdit={handleEdit} />

            {showModal && (
                <Formik
                    initialValues={formValues || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ handleSubmit }) => (
                        <FormularioMarcas handleSubmit={handleSubmit} onClose={handleCloseModal} isEditing={isEditing} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default MarcasProductos;