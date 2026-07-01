import Medicos from "../db/medicos.js";

export default class MedicosServicio {

    constructor() {
        this.medicos = new Medicos();
    }

    buscarTodos = async () => {
        return await this.medicos.buscarTodos();
    }

    buscarPorId = async (id) => {
        return await this.medicos.buscarPorId(id);
    }

    crear = async (datos) => {
        return await this.medicos.crear(datos);
    }

    modificarPorId = async (id, datos) => {
        return await this.medicos.modificarPorId(id, datos);
    }

    eliminarPorId = async (id) => {
        return await this.medicos.eliminarPorId(id);
    }

    asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
        return await this.medicos.relacionarConObraSocial(id_medico, obras_sociales); 
    }
}