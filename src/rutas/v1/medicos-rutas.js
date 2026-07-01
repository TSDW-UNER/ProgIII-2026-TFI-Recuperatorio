import express from 'express';
import MedicosControlador from "../../controladores/medicos-controlador.js";
import { validarCampos } from "../../middlewares/validar-campos.js";
import { validarCrearMedico, validarEditarMedico, validarIdMedico, validarAsociarObrasSociales } from "../../validaciones/medicos-validacion.js";
import { esAutenticado, verificarRol } from "../../middlewares/auth-middleware.js";

const router = express.Router();
const controlador = new MedicosControlador();

// ROL 2 (paciente) y 3 (admin) pueden listar
router.get('/', esAutenticado, verificarRol([2, 3]), controlador.buscarTodos);
router.get('/:id_medico', esAutenticado, verificarRol([2, 3]), validarIdMedico, validarCampos, controlador.buscarPorId);

// Solo admin
router.post('/', esAutenticado, verificarRol([3]), validarCrearMedico, validarCampos, controlador.crear);
router.put('/:id_medico', esAutenticado, verificarRol([3]), validarEditarMedico, validarCampos, controlador.modificarPorId);
router.delete('/:id_medico', esAutenticado, verificarRol([3]), validarIdMedico, validarCampos, controlador.eliminarPorId);
router.post('/:id_medico/obras-sociales', esAutenticado, verificarRol([3]), validarAsociarObrasSociales, validarCampos, controlador.asociarMedicoObrasSociales);

export { router };
