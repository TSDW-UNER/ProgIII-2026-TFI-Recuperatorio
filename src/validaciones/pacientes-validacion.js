import { check, param } from "express-validator";

export const validarIdPaciente = [
    param("id_paciente")
        .isInt()
        .withMessage("El ID del paciente debe ser un número entero válido")
];

export const validarCrearPaciente = [
    check("id_usuario")
        .notEmpty().withMessage("El id_usuario es obligatorio")
        .isInt().withMessage("El id_usuario debe ser un número entero válido"),

    check("id_obra_social")
        .optional({ nullable: true })
        .isInt().withMessage("El id_obra_social debe ser un número entero")
];

export const validarEditarPaciente = [
    ...validarIdPaciente,
    ...validarCrearPaciente
];