import { check, param } from "express-validator";

/*
|--------------------------------------------------------------------------
| VALIDAR CREAR ESPECIALIDAD
|--------------------------------------------------------------------------
*/
export const validarCrearEspecialidad = [

    check("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")

        .isLength({ min: 3, max: 120 })
        .withMessage("El nombre debe tener entre 3 y 120 caracteres")
];

/*
|--------------------------------------------------------------------------
| VALIDAR EDITAR ESPECIALIDAD
|--------------------------------------------------------------------------
*/
export const validarEditarEspecialidad = [

    param("id_especialidad")
        .isInt()
        .withMessage("El ID debe ser numérico"),

    check("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")

        .isLength({ min: 3, max: 120 })
        .withMessage("El nombre debe tener entre 3 y 120 caracteres")
];

/*
|--------------------------------------------------------------------------
| VALIDAR ID
|--------------------------------------------------------------------------
*/
export const validarIdEspecialidad = [

    param("id_especialidad")
        .isInt()
        .withMessage("El ID debe ser numérico")
];