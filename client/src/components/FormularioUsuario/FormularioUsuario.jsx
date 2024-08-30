import React from 'react';

export const FormularioUsuario = ({ handleChange }) => {
    return (
        <div>
            <label>Nombre de Usuario</label>
            <input type="text" name='usuario_email' onChange={handleChange} />

            <label>Contraseña</label>
            <input type="password" name='usuario_pass' onChange={handleChange} />
        </div>
    );
}

export default FormularioUsuario;
