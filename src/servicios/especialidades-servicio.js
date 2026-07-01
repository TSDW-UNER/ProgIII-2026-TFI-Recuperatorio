import Especialidades from "../db/especialidades.js";

export default class EspecialidadesServicio {

    constructor(){
        this.especialidades = new Especialidades();
    }

    buscarTodas = async () => {
        return await this.especialidades.buscarTodas();
    }

    buscarPorId = async (id) => {
        return await this.especialidades.buscarPorId(id);
    }

    modificarPorId = async (id,nombre) => {
        return await this.especialidades.modificarPorId(id,nombre);
    }

    eliminarPorId = async (id) => {
    return await this.especialidades.eliminarPorId(id);
    }

    crear = async (nombre) => {
    return await this.especialidades.crear(nombre);
    }
}