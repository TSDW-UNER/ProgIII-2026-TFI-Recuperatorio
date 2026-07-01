import express from 'express';
import PacientesControlador from "../../controladores/pacientes-controlador.js";
import { validarCampos } from "../../middlewares/validar-campos.js";
import { validarCrearPaciente, validarEditarPaciente, validarIdPaciente } from "../../validaciones/pacientes-validacion.js";
import { esAutenticado, verificarRol } from "../../middlewares/auth-middleware.js";

const router = express.Router();
const controlador = new PacientesControlador();

router.get('/', esAutenticado, verificarRol([3]), controlador.buscarTodos);
router.get('/:id_paciente', esAutenticado, verificarRol([3]), validarIdPaciente, validarCampos, controlador.buscarPorId);
router.post('/', esAutenticado, verificarRol([3]), validarCrearPaciente, validarCampos, controlador.crear);
router.put('/:id_paciente', esAutenticado, verificarRol([3]), validarEditarPaciente, validarCampos, controlador.modificarPorId);
router.delete('/:id_paciente', esAutenticado, verificarRol([3]), validarIdPaciente, validarCampos, controlador.eliminarPorId);

export { router };
