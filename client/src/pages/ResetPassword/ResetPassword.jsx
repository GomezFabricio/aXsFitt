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