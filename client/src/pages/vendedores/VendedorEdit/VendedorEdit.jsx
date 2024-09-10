import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { getVendedorRequest, updateVendedorRequest } from '../../../api/vendedores.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import './VendedorEdit.css';

const VendedorEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vendedor, setVendedor] = useState(null);

  useEffect(() => {
    const fetchVendedor = async () => {
      try {
        const response = await getVendedorRequest(id);
        const vendedorData = response.data;

        // Convertir la fecha al formato YYYY-MM-DD
        const fechaNacimiento = vendedorData.persona_fecha_nacimiento
          ? new Date(vendedorData.persona_fecha_nacimiento).toISOString().split('T')[0]
          : '';

        setVendedor({
          ...vendedorData,
          persona_fecha_nacimiento: fechaNacimiento, // Formato YYYY-MM-DD
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendedor();
  }, [id]);

  return (
    <div className="container-page">
      <h1 className="title">Modificar Vendedor</h1>
      <Formik
        enableReinitialize
        initialValues={{
          persona_nombre: vendedor?.persona_nombre || '',
          persona_apellido: vendedor?.persona_apellido || '',
          persona_dni: vendedor?.persona_dni || '',
          persona_telefono: vendedor?.persona_telefono || '',
          persona_fecha_nacimiento: vendedor?.persona_fecha_nacimiento || '',
          persona_domicilio: vendedor?.persona_domicilio || '',
        }}
        onSubmit={async (values) => {
          try {
            // Enviar la solicitud con los nuevos datos
            await updateVendedorRequest(values);
            navigate('/'); // Redirigir a la URL "/" después de finalizar el registro
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, values }) => (
          <Form className="form">
            <FormularioPersona handleChange={handleChange} values={values} />

            <button type='submit' className="btn">
              Siguiente
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VendedorEdit;
