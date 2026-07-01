import { check, param } from "express-validator";

export const validarIdObraSocial = [
    param("id_obra_social")
        .isInt()
        .withMessage("El ID debe ser numérico")
];

export const validarCrearObraSocial = [
    check("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 120 }).withMessage("El nombre debe tener entre 2 y 120 caracteres"),
    
    check("descripcion")
        .notEmpty().withMessage("La descripción es obligatoria")
        .isLength({ max: 255 }).withMessage("La descripción no puede superar los 255 caracteres"),
    
    check("porcentaje_descuento")
        .notEmpty().withMessage("El porcentaje de descuento es obligatorio")
        .isFloat({ min: 0, max: 100 }).withMessage("El porcentaje debe ser un número decimal entre 0 y 100"),
    
    check("es_particular")
        .optional()
        .isIn([0, 1, true, false]).withMessage("El campo es_particular debe ser un valor booleano o (0 o 1)")
];

export const validarEditarObraSocial = [
    ...validarIdObraSocial,
    ...validarCrearObraSocial
];