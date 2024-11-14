import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:4000/reset-password', { token, newPassword });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="container-page">
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nueva Contraseña</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Restablecer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;