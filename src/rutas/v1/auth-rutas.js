import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.js';
import AuthControlador from '../../controladores/auth-controlador.js';

const router = express.Router();
const controlador = new AuthControlador();

router.post('/login',
    [
        check('email')
            .notEmpty().withMessage('El email es requerido.')
            .isEmail().withMessage('Formato de email inválido.'),
        check('contrasenia')
            .notEmpty().withMessage('La contraseña es requerida.'),
        validarCampos
    ],
    controlador.login
);

export { router };
