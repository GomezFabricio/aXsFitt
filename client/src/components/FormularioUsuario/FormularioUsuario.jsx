import React from 'react';
import '../../assets/styles/forms.css';
import './FormularioUsuario.css';

export const FormularioUsuario = ({ handleChange, values = {}, disablePassword = false }) => {
    return (
        <div className="formulario-usuario">
            <div className="form-group">
                <label>Email</label>
                <input
                    type="text"
                    name='usuario_email'
                    value={values.usuario_email || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    name='usuario_pass'
                    value={values.usuario_pass || ''}
                    onChange={handleChange}
                    disabled={disablePassword}
                />
            </div>
        </div>
    );
}

export default FormularioUsuario;