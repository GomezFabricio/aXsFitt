import React from 'react';

const FormularioPersona = ({ handleChange }) => {
    return (
        <div>
            <label>Nombre</label>
            <input type="text" name='persona_nombre' onChange={handleChange} />

            <label>Apellido</label>
            <input type="text" name='persona_apellido' onChange={handleChange} />

            <label>DNI</label>
            <input type="number" name='persona_dni' onChange={handleChange} />

            <label>Telefono</label>
            <input type="number" name='persona_telefono' onChange={handleChange} />

            <label>Fecha de Nacimiento</label>
            <input type="date" name='persona_fecha_nacimiento' onChange={handleChange} />

            <label>Domicilio</label>
            <input type="text" name='persona_domicilio' onChange={handleChange} />
        </div>
    );
}

export default FormularioPersona;
