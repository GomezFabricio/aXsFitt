// middlewares/auth.middleware.js
import { SECRET_KEY } from '../config';
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }
        req.user = decoded; // Puedes almacenar el usuario decodificado en la solicitud
        next(); // Continúa con el siguiente middleware o ruta
    });
};
