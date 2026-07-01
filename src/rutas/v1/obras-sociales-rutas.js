import express from 'express';
import ObrasSocialesControlador from "../../controladores/obras-sociales-controlador.js";
import { validarCampos } from "../../middlewares/validar-campos.js";
import { validarCrearObraSocial, validarEditarObraSocial, validarIdObraSocial } from "../../validaciones/obras-sociales-validacion.js";
import { esAutenticado, verificarRol } from "../../middlewares/auth-middleware.js";

const router = express.Router();
const controlador = new ObrasSocialesControlador();

router.get('/', esAutenticado, verificarRol([3]), controlador.buscarTodas);
router.get('/:id_obra_social', esAutenticado, verificarRol([3]), validarIdObraSocial, validarCampos, controlador.buscarPorId);
router.post('/', esAutenticado, verificarRol([3]), validarCrearObraSocial, validarCampos, controlador.crear);
router.put('/:id_obra_social', esAutenticado, verificarRol([3]), validarEditarObraSocial, validarCampos, controlador.modificarPorId);
router.delete('/:id_obra_social', esAutenticado, verificarRol([3]), validarIdObraSocial, validarCampos, controlador.eliminarPorId);

export { router };
