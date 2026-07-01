import { pool } from "./conexion.js";

export default class Medicos {

    /*
    |--------------------------------------------------------------------------
    | BUSCAR TODOS
    |--------------------------------------------------------------------------
    */
    buscarTodos = async () => {
        const sql = "SELECT * FROM v_medicos";        
        const [medicos] = await pool.execute(sql);
        return medicos;
    }

    /*
    |--------------------------------------------------------------------------
    | BUSCAR POR ID
    |--------------------------------------------------------------------------
    */
    buscarPorId = async (id) => {
        const sql = `SELECT * FROM medicos WHERE id_medico = ?`;
        const [medico] = await pool.execute(sql, [id]);
        return medico[0];
    }

    /*
    |--------------------------------------------------------------------------
    | CREAR MÉDICO
    |--------------------------------------------------------------------------
    */
    crear = async (datos) => {
        const { matricula, valor_consulta, id_usuario, id_especialidad } = datos;
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            // Incluimos id_especialidad en el INSERT para satisfacer la FK
            const sql = `
                INSERT INTO medicos (matricula, valor_consulta, id_usuario, id_especialidad)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await conexion.execute(sql, [matricula, valor_consulta, id_usuario, id_especialidad]);

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
        const { matricula, valor_consulta, id_usuario, id_especialidad } = datos;
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sqlUpdate = `
                UPDATE medicos
                SET matricula = ?, valor_consulta = ?, id_usuario = ?, id_especialidad = ?
                WHERE id_medico = ?
            `;
            const [result] = await conexion.execute(sqlUpdate, [matricula, valor_consulta, id_usuario, id_especialidad, id]);

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
                DELETE FROM medicos 
                WHERE id_medico = ?
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

    /*
    |--------------------------------------------------------------------------
    | ASOCIAR CON OBRAS SOCIALES (NUEVO)
    |--------------------------------------------------------------------------
    */
    relacionarConObraSocial = async (id_medico, obras_sociales) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            // 1. Limpiamos relaciones previas para evitar conflictos de duplicados
            const sqlDelete = `DELETE FROM medicos_obras_sociales WHERE id_medico = ?`;
            await conexion.execute(sqlDelete, [id_medico]);

            // 2. Insertamos la lista de obras sociales provistas en el array
            const sqlInsert = `
                INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) 
                VALUES (?, ?)
            `;
            
            for (const os of obras_sociales) {
                await conexion.execute(sqlInsert, [id_medico, os.id_obra_social]);
            }

            await conexion.commit();
            return true;

        } catch (error) {
            await conexion.rollback();
            throw error; // Dejamos que el middleware global maneje el error
        } finally {
            conexion.release();
        }
    }
}