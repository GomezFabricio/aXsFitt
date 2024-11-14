import React from 'react';
import '../../assets/styles/forms.css';
import './FormularioPersona.css';

const FormularioPersona = ({ handleChange, setFieldValue, values, errors, touched }) => {
    return (
        <div className="formulario-persona">
            <div className="form-row">
                <div className="form-group">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name='persona_nombre' 
                        onChange={handleChange} 
                        value={values.persona_nombre || ''} 
                    />
                    {touched.persona_nombre && errors.persona_nombre && <div className="error-message">{errors.persona_nombre}</div>}
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        name='persona_apellido' 
                        onChange={handleChange} 
                        value={values.persona_apellido || ''} 
                    />
                    {touched.persona_apellido && errors.persona_apellido && <div className="error-message">{errors.persona_apellido}</div>}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>DNI</label>
                    <input 
                        type="text" 
                        name='persona_dni' 
                        onChange={handleChange} 
                        value={values.persona_dni || ''} 
                    />
                    {touched.persona_dni && errors.persona_dni && <div className="error-message">{errors.persona_dni}</div>}
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input 
                        type="text" 
                        name='persona_telefono' 
                        onChange={handleChange} 
                        value={values.persona_telefono || ''} 
                    />
                    {touched.persona_telefono && errors.persona_telefono && <div className="error-message">{errors.persona_telefono}</div>}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input 
                        type="date" 
                        name='persona_fecha_nacimiento' 
                        onChange={handleChange} 
                        value={values.persona_fecha_nacimiento || ''} 
                    />
                    {touched.persona_fecha_nacimiento && errors.persona_fecha_nacimiento && <div className="error-message">{errors.persona_fecha_nacimiento}</div>}
                </div>
                <div className="form-group">
                    <label>Domicilio</label>
                    <input 
                        type="text" 
                        name='persona_domicilio' 
                        onChange={handleChange} 
                        value={values.persona_domicilio || ''} 
                    />
                    {touched.persona_domicilio && errors.persona_domicilio && <div className="error-message">{errors.persona_domicilio}</div>}
                </div>
            </div>
        </div>
    );
}

export default FormularioPersona;