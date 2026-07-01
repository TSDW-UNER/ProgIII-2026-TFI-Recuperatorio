export default class TransformarDTO {

    turnosReservasCrearDTO = async (req, res, next) => {
        const { id_medico, id_paciente, fecha_hora } = req.body;

        req.dto = {
            id_medico,
            id_paciente,
            fecha_hora
        };

        next();
    }
}