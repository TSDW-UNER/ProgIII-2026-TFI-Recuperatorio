import express from 'express';
import EspecialidadesControlador from "../../controladores/especialidades-controlador.js";
import { validarCrearEspecialidad, validarEditarEspecialidad, validarIdEspecialidad } from "../../validaciones/especialidades-validacion.js";
import { validarCampos } from "../../middlewares/validar-campos.js";
import { esAutenticado, verificarRol } from "../../middlewares/auth-middleware.js";

const router = express.Router();
const especialidadesControlador = new EspecialidadesControlador();

router.get('/', esAutenticado, verificarRol([2, 3]), especialidadesControlador.buscarTodas);
router.get('/:id_especialidad', esAutenticado, verificarRol([2, 3]), validarIdEspecialidad, validarCampos, especialidadesControlador.buscarPorId);
router.post('/', esAutenticado, verificarRol([3]), validarCrearEspecialidad, validarCampos, especialidadesControlador.crear);
router.put('/:id_especialidad', esAutenticado, verificarRol([3]), validarEditarEspecialidad, validarCampos, especialidadesControlador.modificarPorId);
router.delete('/:id_especialidad', esAutenticado, verificarRol([3]), validarIdEspecialidad, validarCampos, especialidadesControlador.eliminarPorId);

export { router };
