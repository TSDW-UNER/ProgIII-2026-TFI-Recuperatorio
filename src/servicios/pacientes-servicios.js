import Pacientes from "../db/pacientes.js";

export default class PacientesServicio {

    constructor() {
        this.pacientes = new Pacientes();
    }

    buscarTodos = async () => {
        return await this.pacientes.buscarTodos();
    }

    buscarPorId = async (id) => {
        return await this.pacientes.buscarPorId(id);
    }

    crear = async (datos) => {
        return await this.pacientes.crear(datos);
    }

    modificarPorId = async (id, datos) => {
        return await this.pacientes.modificarPorId(id, datos);
    }

    eliminarPorId = async (id) => {
        return await this.pacientes.eliminarPorId(id);
    }
}