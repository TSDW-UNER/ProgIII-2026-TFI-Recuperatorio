import { pool } from "./conexion.js";

export default class Especialidades {

    /*
    |--------------------------------------------------------------------------
    | BUSCAR TODAS
    |--------------------------------------------------------------------------
    */
    buscarTodas = async () => {

        const sql = `
            SELECT *
            FROM especialidades
            WHERE activo = 1
        `;

        const [especialidades] = await pool.query(sql);

        return especialidades;
    }

    /*
    |--------------------------------------------------------------------------
    | BUSCAR POR ID
    |--------------------------------------------------------------------------
    */
    buscarPorId = async (id) => {

        const sql = `
            SELECT *
            FROM especialidades
            WHERE activo = 1
            AND id_especialidad = ?
        `;

        const [especialidades] = await pool.execute(sql, [id]);

        return especialidades[0];
    }

    /*
    |--------------------------------------------------------------------------
    | MODIFICAR ESPECIALIDAD
    |--------------------------------------------------------------------------
    */
    modificarPorId = async (id, nombre) => {

        const conexion = await pool.getConnection();

        try {

            /*
            |--------------------------------------------------------------------------
            | INICIAR TRANSACCIÓN
            |--------------------------------------------------------------------------
            */
            await conexion.beginTransaction();

            /*
            |--------------------------------------------------------------------------
            | VERIFICAR EXISTENCIA
            |--------------------------------------------------------------------------
            */
            const sqlCheck = `
                SELECT id_especialidad
                FROM especialidades
                WHERE activo = 1
                AND id_especialidad = ?
            `;

            const [especialidades] = await conexion.execute(sqlCheck, [id]);

            if (especialidades.length === 0) {

                await conexion.rollback();

                return false;
            }

            /*
            |--------------------------------------------------------------------------
            | ACTUALIZAR
            |--------------------------------------------------------------------------
            */
            const sqlUpdate = `
                UPDATE especialidades
                SET nombre = ?
                WHERE id_especialidad = ?
            `;

            const [result] = await conexion.execute(sqlUpdate, [nombre, id]);

            /*
            |--------------------------------------------------------------------------
            | CONFIRMAR CAMBIOS
            |--------------------------------------------------------------------------
            */
            await conexion.commit();

            return result;

        } catch(error) {

            /*
            |--------------------------------------------------------------------------
            | DESHACER CAMBIOS
            |--------------------------------------------------------------------------
            */
            await conexion.rollback();

            throw error;

        } finally {

            conexion.release();
        }
    }

    /*
    |--------------------------------------------------------------------------
    | ELIMINAR ESPECIALIDAD (SOFT DELETE)
    |--------------------------------------------------------------------------
    */
    eliminarPorId = async (id) => {

        const conexion = await pool.getConnection();

        try {

            /*
            |--------------------------------------------------------------------------
            | INICIAR TRANSACCIÓN
            |--------------------------------------------------------------------------
            */
            await conexion.beginTransaction();

            /*
            |--------------------------------------------------------------------------
            | VERIFICAR EXISTENCIA
            |--------------------------------------------------------------------------
            */
            const sqlCheck = `
                SELECT id_especialidad
                FROM especialidades
                WHERE activo = 1
                AND id_especialidad = ?
            `;

            const [rows] = await conexion.execute(sqlCheck, [id]);

            if (rows.length === 0) {

                await conexion.rollback();

                return null;
            }

            /*
            |--------------------------------------------------------------------------
            | SOFT DELETE
            |--------------------------------------------------------------------------
            */
            const sqlDelete = `
                UPDATE especialidades
                SET activo = 0
                WHERE id_especialidad = ?
            `;

            const [result] = await conexion.execute(sqlDelete, [id]);

            /*
            |--------------------------------------------------------------------------
            | CONFIRMAR CAMBIOS
            |--------------------------------------------------------------------------
            */
            await conexion.commit();

            return result;

        } catch(error) {

            /*
            |--------------------------------------------------------------------------
            | DESHACER CAMBIOS
            |--------------------------------------------------------------------------
            */
            await conexion.rollback();

            throw error;

        } finally {

            conexion.release();
        }
    }

    /*
    |--------------------------------------------------------------------------
    | CREAR ESPECIALIDAD
    |--------------------------------------------------------------------------
    */
    crear = async (nombre) => {

        const conexion = await pool.getConnection();

        try {

            /*
            |--------------------------------------------------------------------------
            | INICIAR TRANSACCIÓN
            |--------------------------------------------------------------------------
            */
            await conexion.beginTransaction();

            /*
            |--------------------------------------------------------------------------
            | INSERTAR
            |--------------------------------------------------------------------------
            */
            const sql = `
                INSERT INTO especialidades (nombre)
                VALUES (?)
            `;

            const [result] = await conexion.execute(sql, [nombre]);

            /*
            |--------------------------------------------------------------------------
            | CONFIRMAR CAMBIOS
            |--------------------------------------------------------------------------
            */
            await conexion.commit();

            return result.insertId;

        } catch(error) {

            /*
            |--------------------------------------------------------------------------
            | DESHACER CAMBIOS
            |--------------------------------------------------------------------------
            */
            await conexion.rollback();

            throw error;

        } finally {

            conexion.release();
        }
    }
}