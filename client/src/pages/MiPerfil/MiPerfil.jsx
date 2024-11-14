import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile, updateUserPassword } from '../../api/usuarios.api';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import {
  validateNombre,
  validateApellido,
  validateDNI,
  validateTelefono,
  validateFechaNacimiento,
  validateDomicilio,
  validateEmail,
  validatePassword
} from '../../utils/validation';
import './MiPerfil.css';

const MiPerfil = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalField, setModalField] = useState('');
    const [modalValue, setModalValue] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await getUserProfile();
            const userData = response.data;
            // Convertir la fecha de nacimiento al formato YYYY-MM-DD
            if (userData.persona_fecha_nacimiento) {
                userData.persona_fecha_nacimiento = userData.persona_fecha_nacimiento.split('T')[0];
            }
            setUser(userData);
        };
        fetchUserProfile();
    }, []);

    const handleEditClick = (field, title) => {
        setModalField(field);
        setModalTitle(title);
        setModalValue(user[field]);
        setErrors({});
        setShowModal(true);
    };

    const handleSave = async () => {
        let error = '';
        switch (modalField) {
            case 'persona_nombre':
                error = validateNombre(modalValue);
                break;
            case 'persona_apellido':
                error = validateApellido(modalValue);
                break;
            case 'persona_dni':
                error = validateDNI(modalValue);
                break;
            case 'persona_telefono':
                error = validateTelefono(modalValue);
                break;
            case 'persona_fecha_nacimiento':
                error = validateFechaNacimiento(modalValue);
                break;
            case 'persona_domicilio':
                error = validateDomicilio(modalValue);
                break;
            case 'usuario_email':
                error = validateEmail(modalValue);
                break;
            case 'password':
                error = validatePassword(newPassword);
                break;
            default:
                break;
        }

        if (error) {
            setErrors({ [modalField]: error });
            return;
        }

        if (modalField === 'password') {
            try {
                await updateUserPassword(currentPassword, newPassword);
                setShowModal(false);
            } catch (error) {
                console.error('Error al actualizar la contraseña:', error);
            }
        } else {
            try {
                await updateUserProfile({ [modalField]: modalValue });
                const response = await getUserProfile();
                const userData = response.data;
                // Convertir la fecha de nacimiento al formato YYYY-MM-DD
                if (userData.persona_fecha_nacimiento) {
                    userData.persona_fecha_nacimiento = userData.persona_fecha_nacimiento.split('T')[0];
                }
                setUser(userData);
                setShowModal(false);
            } catch (error) {
                console.error('Error al actualizar el perfil:', error);
            }
        }
    };

    if (!user) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container-page">
            <h1>Mi Perfil</h1>
            <div className="profile-section">
                <h2>Información Personal</h2>
                <p>Nombre: {user.persona_nombre} <button onClick={() => handleEditClick('persona_nombre', 'Editar Nombre')}><FaEdit /></button></p>
                <p>Apellido: {user.persona_apellido} <button onClick={() => handleEditClick('persona_apellido', 'Editar Apellido')}><FaEdit /></button></p>
                <p>DNI: {user.persona_dni} <button onClick={() => handleEditClick('persona_dni', 'Editar DNI')}><FaEdit /></button></p>
                <p>Fecha de Nacimiento: {user.persona_fecha_nacimiento} <button onClick={() => handleEditClick('persona_fecha_nacimiento', 'Editar Fecha de Nacimiento')}><FaEdit /></button></p>
                <p>Domicilio: {user.persona_domicilio} <button onClick={() => handleEditClick('persona_domicilio', 'Editar Domicilio')}><FaEdit /></button></p>
                <p>Teléfono: {user.persona_telefono} <button onClick={() => handleEditClick('persona_telefono', 'Editar Teléfono')}><FaEdit /></button></p>
            </div>
            <div className="profile-section">
                <h2>Información de la Cuenta</h2>
                <p>Correo: {user.usuario_email} <button onClick={() => handleEditClick('usuario_email', 'Editar Correo')}><FaEdit /></button></p>
                <p>Contraseña: ****** <button onClick={() => handleEditClick('password', 'Cambiar Contraseña')}><FaEdit /></button></p>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalField === 'password' ? (
                        <>
                            <Form.Group>
                                <Form.Label>Contraseña Actual</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nueva Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                {errors.password && <div className="error-message">{errors.password}</div>}
                            </Form.Group>
                        </>
                    ) : (
                        <Form.Group>
                            <Form.Label>{modalTitle}</Form.Label>
                            <Form.Control
                                type={modalField === 'persona_fecha_nacimiento' ? 'date' : 'text'}
                                value={modalValue}
                                onChange={(e) => setModalValue(e.target.value)}
                            />
                            {errors[modalField] && <div className="error-message">{errors[modalField]}</div>}
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MiPerfil;