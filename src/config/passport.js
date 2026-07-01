import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { pool } from '../db/conexion.js';

export const configPassport = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const [rows] = await pool.execute(
                'SELECT id_usuario, rol FROM usuarios WHERE id_usuario = ? AND activo = 1',
                [jwt_payload.id_usuario]
            );
            if (rows.length > 0) {
                return done(null, rows[0]);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    }));
};
