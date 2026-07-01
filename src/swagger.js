import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "API Gestor de Turnos",
      version: "1.0.0",
      description: "Documentación API del Trabajo Final Integrador"
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor Local v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      /*
      |--------------------------------------------------------------------------
      | MODULO: ESPECIALIDADES
      |--------------------------------------------------------------------------
      */
      '/especialidades': {
        get: {
          summary: 'Obtener todas las especialidades activas',
          tags: ['Especialidades'],
          responses: {
            200: { description: 'Lista de especialidades obtenida con éxito' },
            500: { description: 'Error interno del servidor' }
          }
        },
        post: {
          summary: 'Crear una nueva especialidad (Solo Admin)',
          tags: ['Especialidades'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nombre'],
                  properties: { nombre: { type: 'string', example: 'Pediatría' } }
                }
              }
            }
          },
          responses: {
            201: { description: 'Especialidad creada con éxito' },
            401: { description: 'No autorizado (Token faltante o inválido)' },
            500: { description: 'Error interno del servidor' }
          }
        }
      },
      '/especialidades/{id_especialidad}': {
        get: {
          summary: 'Buscar una especialidad por su ID',
          tags: ['Especialidades'],
          parameters: [
            { in: 'path', name: 'id_especialidad', required: true, schema: { type: 'integer' }, description: 'ID de la especialidad' }
          ],
          responses: {
            200: { description: 'Especialidad encontrada' },
            404: { description: 'Especialidad no encontrada o inactiva' }
          }
        },
        put: {
          summary: 'Modificar una especialidad por ID (Solo Admin)',
          tags: ['Especialidades'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id_especialidad', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nombre'],
                  properties: { nombre: { type: 'string', example: 'Neurología' } }
                }
              }
            }
          },
          responses: {
            200: { description: 'Especialidad actualizada correctamente' },
            404: { description: 'Especialidad no encontrada' }
          }
        },
        delete: {
          summary: 'Dar de baja una especialidad (Solo Admin)',
          tags: ['Especialidades'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id_especialidad', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Especialidad dada de baja (inactiva) con éxito' },
            404: { description: 'Especialidad no encontrada o ya dada de baja' }
          }
        }
      },

      /*
      |--------------------------------------------------------------------------
      | MODULO: OBRAS SOCIALES
      |--------------------------------------------------------------------------
      */
      '/obras-sociales': {
        get: {
          summary: 'Obtener todas las obras sociales activas',
          tags: ['Obras Sociales'],
          responses: {
            200: { description: 'Lista de obras sociales obtenida con éxito' },
            500: { description: 'Error interno del servidor' }
          }
        },
        post: {
          summary: 'Crear una nueva obra social (Solo Admin)',
          tags: ['Obras Sociales'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nombre'],
                  properties: { 
                    nombre: { type: 'string', example: 'OSDE 310' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Obra social creada con éxito' },
            401: { description: 'No autorizado (Token faltante o inválido)' },
            500: { description: 'Error interno del servidor' }
          }
        }
      },
      '/obras-sociales/{id_obra_social}': {
        get: {
          summary: 'Buscar una obra social por su ID',
          tags: ['Obras Sociales'],
          parameters: [
            { in: 'path', name: 'id_obra_social', required: true, schema: { type: 'integer' }, description: 'ID de la obra social' }
          ],
          responses: {
            200: { description: 'Obra social encontrada' },
            404: { description: 'Obra social no encontrada o inactiva' }
          }
        },
        put: {
          summary: 'Modificar una obra social por ID (Solo Admin)',
          tags: ['Obras Sociales'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id_obra_social', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nombre'],
                  properties: { 
                    nombre: { type: 'string', example: 'Swiss Medical' } 
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Obra social actualizada correctamente' },
            404: { description: 'Obra social no encontrada' }
          }
        },
        delete: {
          summary: 'Dar de baja una obra social (Solo Admin)',
          tags: ['Obras Sociales'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id_obra_social', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Obra social dada de baja correctamente' },
            404: { description: 'Obra social no encontrada o ya inactiva' }
          }
        }
      }
    }
  },
  apis: [], 
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };