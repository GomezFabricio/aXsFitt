import React from 'react';
import '../../assets/styles/forms.css';
import './FormularioUsuario.css';

export const FormularioUsuario = ({ handleChange }) => {
    return (
        <div className="formulario-usuario">
            <h2 className="titulo-formulario">Crear Usuario</h2>
            <div className="form-group">
                <label>Email</label>
                <input type="text" name='usuario_email' onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input type="password" name='usuario_pass' onChange={handleChange} />
            </div>
        </div>
    );
}

export default FormularioUsuario;
