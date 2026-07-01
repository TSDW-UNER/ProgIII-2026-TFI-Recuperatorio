import EspecialidadesServicio from "../servicios/especialidades-servicio.js";

export default class EspecialidadesControlador {
    constructor() {
        this.especialidades = new EspecialidadesServicio
    }

    buscarTodas = async (req, res) => {
        try {
            const especialidades = await this.especialidades.buscarTodas();
            res.status(200).json(
                {
                    'estado': true,
                    'especialidades': especialidades
                });
        }
        catch (error) {
            console.log(`Error en GET /especialidades ${error}`);
            res.status(500).json({
                'estado': false,
                'mensaje': 'Error interno'
            });

        }
    };

    buscarPorId = async (req, res) => {
        try {
            const { id_especialidad } = req.params;
            const especialidad = await this.especialidades.buscarPorId(id_especialidad);
            /*
            |--------------------------------------------------------------------------
            | VALIDAR EXISTENCIA
            |--------------------------------------------------------------------------
            */
            if (!especialidad) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Especialidad no encontrada'
                });
            }
            /*
            |--------------------------------------------------------------------------
            | RESPUESTA
            |--------------------------------------------------------------------------
            */
            res.status(200).json({
                estado: true,
                especialidad
            });
        }
        catch (error) {
            console.log(`Error en GET /especialidades/:id ${error}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno'
            });
        }
    }

    modificarPorId = async (req, res) => {
        try {
            const { id_especialidad } = req.params;
            const { nombre } = req.body;

            const actualizado = await this.especialidades.modificarPorId(id_especialidad, nombre);

            if (!actualizado) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Especialidad no encontrada o inactiva"
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: "Especialidad actualizada correctamente"
            });

        } catch (error) {
            res.status(500).json({ estado: false, mensaje: "Error interno" });
        }
    }
    eliminarPorId = async (req, res) => {
        try {
            const { id_especialidad } = req.params;
            const resultado = await this.especialidades.eliminarPorId(id_especialidad);

            if (resultado === null) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Especialidad no encontrada o ya está inactiva"
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: "Especialidad eliminada correctamente"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ estado: false, mensaje: "Error interno" });
        }
    }

    crear = async (req, res) => {
        try {
            const { nombre } = req.body;
            const nuevoId = await this.especialidades.crear(nombre);

            if (nuevoId) {
                res.status(201).json({
                    estado: true,
                    mensaje: `Especialidad creada con éxito`,
                    id: nuevoId
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno al crear la especialidad'
            });
        }
    }
}