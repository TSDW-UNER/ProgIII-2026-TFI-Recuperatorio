import jwt from 'jsonwebtoken';
import { pool } from '../db/conexion.js';

export default class AuthControlador {

    login = async (req, res, next) => {
        try {
            const { email, contrasenia } = req.body;

            const sql = `
                SELECT id_usuario, CONCAT(nombres, ' ', apellido) AS usuario, rol
                FROM usuarios
                WHERE email = ? AND contrasenia = SHA2(?, 256) AND activo = 1
            `;
            const [rows] = await pool.execute(sql, [email, contrasenia]);

            if (rows.length === 0) {
                return res.status(401).json({ estado: false, mensaje: 'Credenciales incorrectas' });
            }

            const usuario = rows[0];
            const token = jwt.sign(
                { id_usuario: usuario.id_usuario, rol: usuario.rol },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            res.status(200).json({
                estado: true,
                mensaje: 'Login exitoso',
                token,
                usuario: { id: usuario.id_usuario, nombre: usuario.usuario, rol: usuario.rol }
            });

        } catch (error) {
            next(error);
        }
    };
}
