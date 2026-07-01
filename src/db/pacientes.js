import { pool } from "./conexion.js";

export default class Pacientes {

    /*
    |--------------------------------------------------------------------------
    | BUSCAR TODOS
    |--------------------------------------------------------------------------
    */
    buscarTodos = async () => {
        const sql = `SELECT * FROM v_pacientes`;
        const [pacientes] = await pool.query(sql);
        return pacientes;
    }

    /*
    |--------------------------------------------------------------------------
    | BUSCAR POR ID
    |--------------------------------------------------------------------------
    */

    buscarPorId = async(id) => {
        const sql = `SELECT * FROM pacientes WHERE id_paciente = ?`;
        const [paciente] = await pool.execute(sql, [id]);
        return paciente[0];
    }


    /*
    |--------------------------------------------------------------------------
    | CREAR PACIENTE
    |--------------------------------------------------------------------------
    */
    crear = async (datos) => {
        const { id_usuario, id_obra_social } = datos;
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sql = `
                INSERT INTO pacientes (id_usuario, id_obra_social)
                VALUES (?, ?)
            `;
            const [result] = await conexion.execute(sql, [id_usuario, id_obra_social || null]);

            await conexion.commit();
            return result.insertId;

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    }

    /*
    |--------------------------------------------------------------------------
    | MODIFICAR POR ID
    |--------------------------------------------------------------------------
    */
    modificarPorId = async (id, datos) => {
        const { id_usuario, id_obra_social } = datos;
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sqlUpdate = `
                UPDATE pacientes
                SET id_usuario = ?, id_obra_social = ?
                WHERE id_paciente = ?
            `;
            const [result] = await conexion.execute(sqlUpdate, [id_usuario, id_obra_social || null, id]);

            if (result.affectedRows === 0) {
                await conexion.rollback();
                return false;
            }

            await conexion.commit();
            return true;

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    }

    /*
    |--------------------------------------------------------------------------
    | ELIMINAR FÍSICO
    |--------------------------------------------------------------------------
    */
    eliminarPorId = async (id) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sqlDelete = `
                DELETE FROM pacientes 
                WHERE id_paciente = ?
            `;
            const [result] = await conexion.execute(sqlDelete, [id]);

            if (result.affectedRows === 0) {
                await conexion.rollback();
                return null;
            }

            await conexion.commit();
            return result;

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    }
}