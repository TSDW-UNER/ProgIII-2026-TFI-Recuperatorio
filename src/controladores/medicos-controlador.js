import MedicosServicio from "../servicios/medicos-servicio.js";

export default class MedicosControlador {
    
    constructor() {
        this.servicio = new MedicosServicio();
    }

    buscarTodos = async (req, res, next) => {
        try {
            const medicos = await this.servicio.buscarTodos();
            res.status(200).json({
                estado: true,
                medicos: medicos
            });
        } catch (error) {
            next(error);
        }
    };

    buscarPorId = async (req, res, next) => {
        try {
            const { id_medico } = req.params;
            const medico = await this.servicio.buscarPorId(id_medico);

            if (!medico) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Médico no encontrado'
                });
            }

            res.status(200).json({
                estado: true,
                medico: medico
            });
        } catch (error) {
            next(error);
        }
    };

    crear = async (req, res, next) => {
        try {
            const { matricula, valor_consulta, id_usuario, id_especialidad } = req.body;
            const nuevoId = await this.servicio.crear({ matricula, valor_consulta, id_usuario, id_especialidad });

            res.status(201).json({
                estado: true,
                mensaje: 'Médico creado con éxito',
                id: nuevoId
            });
        } catch (error) {
            next(error);
        }
    };

    modificarPorId = async (req, res, next) => {
        try {
            const { id_medico } = req.params;
            const { matricula, valor_consulta, id_usuario, id_especialidad } = req.body;

            const actualizado = await this.servicio.modificarPorId(id_medico, { 
                matricula, 
                valor_consulta, 
                id_usuario,
                id_especialidad 
            });

            if (!actualizado) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Médico no encontrado"
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: "Datos del médico actualizados correctamente"
            });
        } catch (error) {
            next(error);
        }
    };

    eliminarPorId = async (req, res, next) => {
        try {
            const { id_medico } = req.params;
            const resultado = await this.servicio.eliminarPorId(id_medico);

            if (resultado === null) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Médico no encontrado"
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: "Médico eliminado correctamente"
            });
        } catch (error) {
            next(error);
        }
    };

    asociarMedicoObrasSociales = async (req, res, next) => {
        try {            
            const { id_medico } = req.params;
            const { obras_sociales } = req.body;

            const relacion = await this.servicio.asociarMedicoObrasSociales(id_medico, obras_sociales);

            if (!relacion) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'No se pudieron crear las relaciones con las obras sociales'
                });
            }

            res.status(201).json({
                estado: true,
                mensaje: 'Médico y obras sociales vinculados correctamente'
            });

        } catch (error) {
            next(error);
        }
    }
}