import React from 'react';
import '../../assets/styles/forms.css'
import './FormularioPersona.css'

const FormularioPersona = ({ handleChange }) => {
    return (
        <div className="formulario-persona">
            {/* Fila para Nombre y Apellido */}
            <div className="form-row">
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" name='persona_nombre' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input type="text" name='persona_apellido' onChange={handleChange} />
                </div>
            </div>

            {/* Fila para DNI y Teléfono */}
            <div className="form-row">
                <div className="form-group">
                    <label>DNI</label>
                    <input type="number" name='persona_dni' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input type="number" name='persona_telefono' onChange={handleChange} />
                </div>
            </div>

            {/* Fila para Fecha de Nacimiento y Domicilio */}
            <div className="form-row">
                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input type="date" name='persona_fecha_nacimiento' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Domicilio</label>
                    <input type="text" name='persona_domicilio' onChange={handleChange} />
                </div>
            </div>
        </div>
    );
}



export default FormularioPersona;
