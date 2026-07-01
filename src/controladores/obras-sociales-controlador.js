import ObrasSocialesServicio from "../servicios/obras-sociales-servicio.js";

export default class ObrasSocialesControlador {
    
    constructor() {
        this.servicio = new ObrasSocialesServicio();
    }

    buscarTodas = async (req, res, next) => {
        try {
            const obrasSociales = await this.servicio.buscarTodas();
            res.status(200).json({
                estado: true,
                obras_sociales: obrasSociales
            });
        } catch (error) {
            next(error); // Delega al middleware global de errores
        }
    };

    buscarPorId = async (req, res, next) => {
        try {
            const { id_obra_social } = req.params;
            const obraSocial = await this.servicio.buscarPorId(id_obra_social);

            if (!obraSocial) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Obra social no encontrada'
                });
            }

            res.status(200).json({
                estado: true,
                obra_social: obraSocial
            });
        } catch (error) {
            next(error);
        }
    };

    crear = async (req, res, next) => {
        try {
            const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;
            const nuevoId = await this.servicio.crear({ nombre, descripcion, porcentaje_descuento, es_particular });

            res.status(201).json({
                estado: true,
                mensaje: 'Obra social creada con éxito',
                id: nuevoId
            });
        } catch (error) {
            next(error);
        }
    };

    modificarPorId = async (req, res, next) => {
        try {
            const { id_obra_social } = req.params;
            const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;

            const actualizado = await this.servicio.modificarPorId(id_obra_social, { 
                nombre, 
                descripcion, 
                porcentaje_descuento, 
                es_particular 
            });

            if (!actualizado) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Obra social no encontrada o inactiva"
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: "Obra social actualizada correctamente"
            });
        } catch (error) {
            next(error);
        }
    };

    eliminarPorId = async (req, res, next) => {
        try {
            const { id_obra_social } = req.params;
            const resultado = await this.servicio.eliminarPorId(id_obra_social);

            if (resultado === null) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Obra social no encontrada o ya está inactiva"
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: "Obra social eliminada correctamente"
            });
        } catch (error) {
            next(error);
        }
    };
}