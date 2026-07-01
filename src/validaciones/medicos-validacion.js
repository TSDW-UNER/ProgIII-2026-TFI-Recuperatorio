import { check, param } from "express-validator";

export const validarIdMedico = [
    param("id_medico")
        .isInt()
        .withMessage("El ID del médico debe ser un número entero válido")
];

export const validarCrearMedico = [
    check("matricula")
        .notEmpty().withMessage("La matrícula es obligatoria")
        .isLength({ min: 3, max: 50 }).withMessage("La matrícula debe tener entre 3 y 50 caracteres"),
    
    check("valor_consulta")
        .notEmpty().withMessage("El valor de la consulta es obligatorio")
        .isFloat({ min: 0 }).withMessage("El valor de la consulta debe ser un número decimal positivo"),
    
    check("id_usuario")
        .notEmpty().withMessage("El id_usuario es obligatorio")
        .isInt().withMessage("El id_usuario debe ser un número entero válido"),

    check("id_especialidad")
        .notEmpty().withMessage("El id_especialidad es obligatorio")
        .isInt().withMessage("El id_especialidad debe ser un número entero válido")
];

export const validarEditarMedico = [
    ...validarIdMedico,
    ...validarCrearMedico
];

export const validarAsociarObrasSociales = [
    param('id_medico')
        .notEmpty().withMessage('El id_medico es obligatorio en la URL.')
        .isInt().withMessage('El id_medico debe ser un número entero.'),
    
    check('obras_sociales')
        .isArray().withMessage('obras_sociales debe ser un array.')
        .notEmpty().withMessage('El listado de obras sociales no puede estar vacío.'),
    
    check('obras_sociales.*.id_obra_social') 
        .notEmpty().withMessage('Cada obra social enviada debe contener su respectivo id_obra_social.')
        .isInt().withMessage('El id_obra_social debe ser un número entero.')
];