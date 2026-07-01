import Estadisticas from "../db/estadisticas.js";

export default class EstadisticasServicio {

    constructor() {

        this.estadisticas = new Estadisticas();
    }

    obtenerTurnos = async () => {

        return await this.estadisticas.obtenerTurnos();
    }
}