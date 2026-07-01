import express from "express";
import EstadisticasControlador from "../../controladores/estadisticas-controlador.js";
import { esAutenticado, verificarRol } from "../../middlewares/auth-middleware.js";

const router = express.Router();
const estadisticasControlador = new EstadisticasControlador();

router.get('/turnos', esAutenticado, verificarRol([3]), estadisticasControlador.obtenerTurnos);
router.get('/pdf', esAutenticado, verificarRol([3]), estadisticasControlador.generarPDF);

export { router };
