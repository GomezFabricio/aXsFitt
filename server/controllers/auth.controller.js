import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import nodemailer from 'nodemailer';

// Configurar nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',
        pass: 'tu-contraseña'
    }
});

// Controlador para solicitar la recuperación de contraseña
export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario_email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        const mailOptions = {
            from: 'fabricio.gomez4371@gmail.com',
            to: email,
            subject: 'Recuperación de contraseña',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:3000/reset-password?token=${token}`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Correo de recuperación enviado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para restablecer la contraseña
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const email = decoded.email;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await pool.query('UPDATE usuarios SET usuario_pass = ? WHERE usuario_email = ?', [hashedPassword, email]);

        res.json({ message: 'Contraseña restablecida correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};