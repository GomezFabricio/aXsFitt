import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './FormularioMarcas.css';

const FormularioMarcas = ({ handleSubmit, onClose }) => {
    return (
        <div className="modal-marca">
            <div className="modal-content-marca">
                <span className="close-marca" onClick={onClose}>&times;</span>
                <h2>Agregar Nueva Marca</h2>
                <form onSubmit={handleSubmit} className="form-marca">
                    <label htmlFor="nombreMarca" className="label-marca">Nombre de la Marca:</label>
                    <Field type="text" id="nombreMarca" name="nombreMarca" className="input-marca" />
                    <ErrorMessage name="nombreMarca" component="div" className="error-marca" />
                    <button type="submit" className="button-marca">Agregar</button>
                </form>
            </div>
        </div>
    );
};

export default FormularioMarcas;