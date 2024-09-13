import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../../components/LoginForm/LoginForm';
import { loginRequest } from '../../../api/login.api'; // Asegúrate de tener esta función
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null); // Para manejar errores

    return (
        <div className="container-page">
            <h1>Iniciar Sesión</h1>

            {error && <div className="error">{error}</div>} {/* Mostrar errores si hay */}

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}

                onSubmit={async (values) => {
                    try {
                        const response = await loginRequest(values); // Llama a la API para iniciar sesión
                        const { token, roles } = response.data;

                        // Guardar el token en localStorage (o en el estado, según prefieras)
                        localStorage.setItem('token', token);

                        // Redirigir al dashboard
                        navigate('/dashboard');
                    } catch (err) {
                        setError('Error en el inicio de sesión. Intenta nuevamente.'); // Manejo de errores
                        console.log(err);
                    }
                }}
            >
                {({ handleChange, values }) => (
                    <Form className="form">
                        <LoginForm handleChange={handleChange} values={values} />
                        <div className="button-container">
                            <button type="submit" className="button-login">Iniciar Sesión</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
