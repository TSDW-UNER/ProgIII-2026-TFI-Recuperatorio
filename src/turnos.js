import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import { testConexion } from "./db/test-conexion.js";
import { manejarErrores } from "./middlewares/manejar-errores.js";
import { configPassport } from "./config/passport.js";

import { router as v1EspecialidadesRutas } from "./rutas/v1/especialidades-rutas.js";
import { router as v1EstadisticasRutas } from "./rutas/v1/estadisticas-rutas.js";
import { router as v1ObrasSocialesRutas } from "./rutas/v1/obras-sociales-rutas.js";
import { router as v1MedicosRutas } from "./rutas/v1/medicos-rutas.js";
import { router as v1PacientesRutas } from "./rutas/v1/pacientes-rutas.js";
import { router as v1TurnosReservas } from "./rutas/v1/turnos-reservas-rutas.js";
import { router as v1AuthRutas } from "./rutas/v1/auth-rutas.js";
import { router as v1UsuariosRutas } from "./rutas/v1/usuarios-rutas.js";
import { swaggerUi, specs } from "./swagger.js";

const app = express();

await testConexion();

// Middlewares globales
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Passport
configPassport(passport);
app.use(passport.initialize());

/*
|--------------------------------------------------------------------------
| RUTA TEST
|--------------------------------------------------------------------------
*/
app.get('/', (req, res) => {
    res.status(200).json({ estado: true, mensaje: 'API ok' });
});

/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS (sin autenticación)
|--------------------------------------------------------------------------
*/
app.use('/api/v1/auth', v1AuthRutas);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/*
|--------------------------------------------------------------------------
| RUTAS PROTEGIDAS (requieren JWT)
|--------------------------------------------------------------------------
*/
app.use('/api/v1/especialidades', passport.authenticate('jwt', { session: false }), v1EspecialidadesRutas);
app.use('/api/v1/estadisticas', passport.authenticate('jwt', { session: false }), v1EstadisticasRutas);
app.use('/api/v1/obras-sociales', passport.authenticate('jwt', { session: false }), v1ObrasSocialesRutas);
app.use('/api/v1/medicos', passport.authenticate('jwt', { session: false }), v1MedicosRutas);
app.use('/api/v1/pacientes', passport.authenticate('jwt', { session: false }), v1PacientesRutas);
app.use('/api/v1/turnos-reservas', passport.authenticate('jwt', { session: false }), v1TurnosReservas);
app.use('/api/v1/usuarios', passport.authenticate('jwt', { session: false }), v1UsuariosRutas);

/*
|--------------------------------------------------------------------------
| MIDDLEWARE GLOBAL DE ERRORES
|--------------------------------------------------------------------------
*/
app.use(manejarErrores);

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});
