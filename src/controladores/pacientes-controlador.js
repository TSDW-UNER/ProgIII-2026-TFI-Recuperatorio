import PacientesServicio from "../servicios/pacientes-servicios.js";

export default class PacientesControlador {
    
    constructor() {
        this.servicio = new PacientesServicio();
    }

    buscarTodos = async (req, res, next) => {
        try {
            const pacientes = await this.servicio.buscarTodos();
            res.status(200).json({
                estado: true,
                pacientes: pacientes
            });
        } catch (error) {
            next(error);
        }
    };

    buscarPorId = async (req, res, next) => {
        try {
            const { id_paciente } = req.params;
            const paciente = await this.servicio.buscarPorId(id_paciente);

            if (!paciente) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Paciente no encontrado'
                });
            }

            res.status(200).json({
                estado: true,
                paciente: paciente
            });
        } catch (error) {
            next(error);
        }
    };

    crear = async (req, res, next) => {
        try {
            const { id_usuario, id_obra_social } = req.body;
            const nuevoId = await this.servicio.crear({ id_usuario, id_obra_social });

            res.status(201).json({
                estado: true,
                mensaje: 'Paciente creado con éxito',
                id: nuevoId
            });
        } catch (error) {
            next(error);
        }
    };

    modificarPorId = async (req, res, next) => {
        try {
            const { id_paciente } = req.params;
            const { id_usuario, id_obra_social } = req.body;

            const actualizado = await this.servicio.modificarPorId(id_paciente, { 
                id_usuario, 
                id_obra_social 
            });

            if (!actualizado) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Paciente no encontrado"
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: "Datos del paciente actualizados correctamente"
            });
        } catch (error) {
            next(error);
        }
    };

    eliminarPorId = async (req, res, next) => {
        try {
            const { id_paciente } = req.params;
            const resultado = await this.servicio.eliminarPorId(id_paciente);

            if (resultado === null) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Paciente no encontrado"
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: "Paciente eliminado correctamente"
            });
        } catch (error) {
            next(error);
        }
    };
}