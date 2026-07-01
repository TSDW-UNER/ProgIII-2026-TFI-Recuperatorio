import ObrasSociales from "../db/obras-sociales.js";

export default class ObrasSocialesServicio {

    constructor() {
        this.obrasSociales = new ObrasSociales();
    }

    buscarTodas = async () => {
        return await this.obrasSociales.buscarTodas();
    }

    buscarPorId = async (id) => {
        return await this.obrasSociales.buscarPorId(id);
    }

    crear = async (datos) => {
        return await this.obrasSociales.crear(datos);
    }

    modificarPorId = async (id, datos) => {
        return await this.obrasSociales.modificarPorId(id, datos);
    }

    eliminarPorId = async (id) => {
        return await this.obrasSociales.eliminarPorId(id);
    }
}