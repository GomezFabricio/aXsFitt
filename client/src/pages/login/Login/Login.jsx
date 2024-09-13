import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null); // Para manejar errores

    return (
        <div className="login-page-container">
            <h1>Iniciar Sesión</h1>

            {error && <div className="error">{error}</div>} {/* Mostrar errores si hay */}
        
            <Formik
                initialValues = {{
                    email: '',
                    password: '',
                }}

                onSubmit={async (values) => {
                    try {
                        navigate('/dashboard');
                    } catch (err) {
                        setError('Error en el inicio de sesión. Intenta nuevamente.'); 
                        console.log(err);
                    }
                }}
            >
                {({ handleChange, values }) => (
                    <Form className="form">
                        <LoginForm handleChange={handleChange} values={values} />
                        <button type="submit" className="login-button">
                            Iniciar Sesión
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;

