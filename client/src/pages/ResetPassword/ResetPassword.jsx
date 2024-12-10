import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://localhost:4000/reset-password/${token}`, { newPassword });
            setMessage(response.data.message);
            setModalIsOpen(true); // Mostrar el modal
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        navigate('/login'); // Redirigir al login
    };

    return (
        <div className="container mx-auto p-4">
            <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-gray-800 text-white rounded">
                ← Volver
            </button>
            <h1 className="text-2xl font-bold mb-4">Restablecer Contraseña</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nueva Contraseña</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Restablecer
                </button>
            </form>
            {message && <p className="text-red-500 text-xs italic">{message}</p>}

            <Modal show={modalIsOpen} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Información</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Contraseña restablecida correctamente</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeModal}>
                        De acuerdo
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ResetPassword;