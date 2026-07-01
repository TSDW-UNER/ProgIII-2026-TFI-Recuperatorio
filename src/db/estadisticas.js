import { pool } from "./conexion.js";

export default class Estadisticas {

    /*
    |--------------------------------------------------------------------------
    | STORED PROCEDURE
    |--------------------------------------------------------------------------
    */
    obtenerTurnos = async () => {

        const sql = `
            CALL sp_cantidad_turnos()
        `;

        const [rows] = await pool.query(sql);

        return rows[0];
    }
}