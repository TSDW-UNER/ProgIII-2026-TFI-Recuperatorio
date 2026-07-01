import { pool } from "./conexion.js";

export default class ObrasSociales {

    /*
    |--------------------------------------------------------------------------
    | BUSCAR TODAS
    |--------------------------------------------------------------------------
    */
    buscarTodas = async () => {
        const sql = `
            SELECT id_obra_social, nombre, descripcion, porcentaje_descuento, es_particular, activo
            FROM obras_sociales
            WHERE activo = 1
        `;
        const [obrasSociales] = await pool.query(sql);
        return obrasSociales;
    }

    /*
    |--------------------------------------------------------------------------
    | BUSCAR POR ID
    |--------------------------------------------------------------------------
    */
    buscarPorId = async (id) => {
        const sql = `
            SELECT id_obra_social, nombre, descripcion, porcentaje_descuento, es_particular, activo
            FROM obras_sociales
            WHERE activo = 1
            AND id_obra_social = ?
        `;
        const [obrasSociales] = await pool.execute(sql, [id]);
        return obrasSociales[0];
    }

    /*
    |--------------------------------------------------------------------------
    | CREAR OBRA SOCIAL
    |--------------------------------------------------------------------------
    */
    crear = async (datos) => {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = datos;
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sql = `
                INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await conexion.execute(sql, [
                nombre, 
                descripcion, 
                porcentaje_descuento, 
                es_particular || 0
            ]);

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
        const { nombre, descripcion, porcentaje_descuento, es_particular } = datos;
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            // Verificar existencia
            const sqlCheck = `SELECT id_obra_social FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?`;
            const [rows] = await conexion.execute(sqlCheck, [id]);

            if (rows.length === 0) {
                await conexion.rollback();
                return false;
            }

            const sqlUpdate = `
                UPDATE obras_sociales
                SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ?
                WHERE id_obra_social = ?
            `;
            const [result] = await conexion.execute(sqlUpdate, [
                nombre, 
                descripcion, 
                porcentaje_descuento, 
                es_particular, 
                id
            ]);

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
    | ELIMINAR (SOFT DELETE)
    |--------------------------------------------------------------------------
    */
    eliminarPorId = async (id) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sqlCheck = `SELECT id_obra_social FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?`;
            const [rows] = await conexion.execute(sqlCheck, [id]);

            if (rows.length === 0) {
                await conexion.rollback();
                return null;
            }

            const sqlDelete = `UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?`;
            const [result] = await conexion.execute(sqlDelete, [id]);

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