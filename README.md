# Programación 3 - 2026 - TFI - Recuperatorio
Trabajo Final Integrador de Programación 3 en 2026, de la Tecnicatura Universitaria en Desarrollo Web de la FCAD-UNER.

**GRUPO R**  
Federico Almaraz, Facundo Di Braida, Micaela Celeste Ballejo, Juan Ignacio Peretto, Joaquín Priotti

---

# API Turnos Médicos

## Requisitos previos

- Node.js v18 o superior
- MySQL (XAMPP o similar)

## Instalación

```bash
npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PUERTO=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=prog3_turnos
JWT_SECRET=clave_secreta_larga_2026
```

## Ejecutar proyecto

```bash
npm run dev
```

## Roles

| Rol | Valor | Descripción |
|-----|-------|-------------|
| Médico | 1 | Puede ver y marcar sus propios turnos |
| Paciente | 2 | Puede crear y ver sus turnos, listar médicos y especialidades |
| Administrador | 3 | Acceso completo |

## Endpoints

Todos los endpoints (excepto login) requieren el header:
```
Authorization: Bearer <token>
```

### Auth
| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| POST | /api/v1/auth/login | Iniciar sesión | Público |

### Especialidades
| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | /api/v1/especialidades | Obtener todas | 2, 3 |
| GET | /api/v1/especialidades/:id_especialidad | Obtener por id | 2, 3 |
| POST | /api/v1/especialidades | Crear | 3 |
| PUT | /api/v1/especialidades/:id_especialidad | Modificar | 3 |
| DELETE | /api/v1/especialidades/:id_especialidad | Eliminar (soft delete) | 3 |

### Obras Sociales
| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | /api/v1/obras-sociales | Obtener todas | 3 |
| GET | /api/v1/obras-sociales/:id_obra_social | Obtener por id | 3 |
| POST | /api/v1/obras-sociales | Crear | 3 |
| PUT | /api/v1/obras-sociales/:id_obra_social | Modificar | 3 |
| DELETE | /api/v1/obras-sociales/:id_obra_social | Eliminar (soft delete) | 3 |

### Médicos
| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | /api/v1/medicos | Obtener todos | 2, 3 |
| GET | /api/v1/medicos/:id_medico | Obtener por id | 2, 3 |
| POST | /api/v1/medicos | Crear | 3 |
| PUT | /api/v1/medicos/:id_medico | Modificar | 3 |
| DELETE | /api/v1/medicos/:id_medico | Eliminar (soft delete) | 3 |
| POST | /api/v1/medicos/:id_medico/obras-sociales | Asociar obras sociales | 3 |

### Pacientes
| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | /api/v1/pacientes | Obtener todos | 3 |
| GET | /api/v1/pacientes/:id_paciente | Obtener por id | 3 |
| POST | /api/v1/pacientes | Crear | 3 |
| PUT | /api/v1/pacientes/:id_paciente | Modificar | 3 |
| DELETE | /api/v1/pacientes/:id_paciente | Eliminar (soft delete) | 3 |

### Turnos y Reservas
| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| POST | /api/v1/turnos-reservas | Crear turno | 2, 3 |

### Usuarios
| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| PUT | /api/v1/usuarios/:id_usuario/foto | Subir foto de perfil | Propio usuario |

### Estadísticas
| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | /api/v1/estadisticas/turnos | Estadísticas de turnos | 3 |
| GET | /api/v1/estadisticas/pdf | Informe en PDF | 3 |

## Documentación interactiva

Con el servidor corriendo, accedé a:
```
http://localhost:3000/api-docs
```

## Tecnologías

- Node.js
- Express
- MySQL + Transacciones
- Passport + JWT (autenticación y autorización por roles)
- Multer (carga de archivos)
- Morgan (registro de solicitudes)
- CORS
- PDFKit (generación de PDFs)
- express-validator (validaciones)
- Swagger (documentación)
