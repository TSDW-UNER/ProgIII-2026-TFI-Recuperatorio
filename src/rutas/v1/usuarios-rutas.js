import express from 'express';
import { subirFoto } from '../../middlewares/subir-foto.js';
import { esAutenticado } from '../../middlewares/auth-middleware.js';
import { pool } from '../../db/conexion.js';
import path from 'path';

const router = express.Router();

/**
 * PUT /api/v1/usuarios/:id_usuario/foto
 * Permite subir/actualizar la foto de perfil de un usuario.
 * El usuario solo puede actualizar su propia foto.
 */
router.put('/:id_usuario/foto', esAutenticado, subirFoto, async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ estado: false, mensaje: 'No se recibió ninguna imagen.' });
        }

        // Solo el propio usuario puede cambiar su foto
        if (req.user.id_usuario !== parseInt(req.params.id_usuario)) {
            return res.status(403).json({ estado: false, mensaje: 'No podés modificar la foto de otro usuario.' });
        }

        const foto_path = req.file.filename;

        await pool.execute(
            'UPDATE usuarios SET foto_path = ? WHERE id_usuario = ? AND activo = 1',
            [foto_path, req.params.id_usuario]
        );

        res.status(200).json({
            estado: true,
            mensaje: 'Foto de perfil actualizada correctamente.',
            foto_path
        });

    } catch (error) {
        next(error);
    }
});

export { router };
