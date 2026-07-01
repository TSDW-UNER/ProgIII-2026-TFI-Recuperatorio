/*
|--------------------------------------------------------------------------
| MANEJO GLOBAL DE ERRORES
|--------------------------------------------------------------------------
*/
export const manejarErrores = (err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        estado: false,
        mensaje: "Error interno del servidor"
    });
};