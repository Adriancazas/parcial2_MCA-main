# Parcial 2 — Agenda y boletaje de eventos culturales

Estructura (cambia `amc` por tus iniciales si tu orden es distinto):

```
parcial2_amc/
├── setup.sql          ← usuario y base de datos
├── be_p2_amc/         ← backend NestJS + TypeORM + Swagger
└── fe_p2_amc/         ← frontend Vue 3 + Vite
```

## 1. Base de datos (una sola vez)

En una terminal con acceso a PostgreSQL:

```bash
psql -U postgres -f setup.sql
```

Crea el usuario `usrparcial2` (contraseña `P4rc14L2-2026`) y la base `parcial2_amc`.
Las tablas **no** se crean a mano: TypeORM las genera al arrancar el backend (`synchronize: true`).

## 2. Backend

```bash
cd be_p2_amc
npm install
npm run start:dev
```

- API: http://localhost:3000
- **Swagger: http://localhost:3000/api**

## 3. Frontend

```bash
cd fe_p2_amc
npm install
npm run dev
```

- App: http://localhost:5173
- Crea primero un **recinto** y luego un **evento** (el evento necesita un recinto).

---

## Cómo explicarlo (orden recomendado para la defensa)

### Flujo completo de una petición
`Frontend (Vue)` → `api.js (fetch)` → `Controller` → `Service` → `Repository (TypeORM)` → `PostgreSQL`

### Backend, archivo por archivo

| Archivo | Qué decir |
|---|---|
| `entities/*.entity.ts` | "Cada clase es una tabla. Los decoradores `@Column` definen tipo y longitud. Es la convención POO: la tabla nace de una clase." |
| `dto/create-*.dto.ts` | "Valida lo que entra por la API con `class-validator`. Si falta un campo obligatorio, responde 400 antes de tocar la BD." |
| `dto/update-*.dto.ts` | "`PartialType` copia el DTO de crear pero con todos los campos opcionales, porque PATCH actualiza solo lo que se envía." |
| `*.service.ts` | "Aquí está la lógica del CRUD usando el Repository de TypeORM." |
| `*.controller.ts` | "Define las rutas: POST crea, GET lista/trae uno, PATCH actualiza, DELETE elimina." |
| `*.module.ts` | "Agrupa controlador + servicio + entidad de cada recurso." |
| `app.module.ts` | "Configura la conexión a PostgreSQL e importa los módulos." |
| `main.ts` | "Arranca la app, activa CORS, validación global y Swagger." |

### Puntos clave que el docente puede preguntar

- **Llave foránea:** en `EventoCultural`, `@ManyToOne` + `@JoinColumn({ name: 'id_recinto' })`. La inversa es `@OneToMany` en `Recinto`.
- **Fechas de auditoría:** `@CreateDateColumn`, `@UpdateDateColumn` y `@DeleteDateColumn` llenan `fecha_creacion`, `fecha_modificacion` y `fecha_eliminacion` automáticamente.
- **DELETE es lógico (soft delete):** `softDelete()` solo llena `fecha_eliminacion`; la fila sigue en la tabla pero TypeORM ya no la devuelve en consultas.
- **findAll ordenado:** en `eventos-culturales.service.ts`, `order: { recinto: { nombre: 'ASC' } }` (equivale a "ordenar por nivel académico" del examen anterior).
- **Estado (enum):** `EstadoEvento` en la entidad; en el DTO `@IsEnum`; en el frontend es un `<select>` con los mismos tres valores.
- **aforo_maximo opcional:** `nullable: true` en la entidad y `@IsOptional()` en el DTO.
- **Precio decimal:** PostgreSQL devuelve `decimal` como texto; el `transformer` lo convierte a número.

### Cambios típicos que te pueden pedir en vivo

| Pedido | Dónde tocar |
|---|---|
| Agregar un campo nuevo (ej. `descripcion`) | Entidad → DTO create → formulario y tabla en `EventosView.vue` |
| Cambiar el largo de un campo | `length` en la entidad + `@MaxLength` en el DTO + `maxlength` en el input |
| Agregar un estado al enum | `EstadoEvento` (entidad) + array `ESTADOS` en `EventosView.vue` |
| Cambiar el orden del listado | `order` en el `findAll` del servicio |
| Hacer un campo opcional/obligatorio | `nullable` en la entidad + `@IsOptional()` en el DTO |

> Si cambias la entidad, `synchronize: true` actualiza la tabla al reiniciar el backend.

---

## Subir a GitHub

El `.gitignore` ya excluye `node_modules/`. Desde la carpeta `parcial2_amc`:

```bash
git init
git add .
git commit -m "Parcial 2"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/parcial2_amc.git
git push -u origin main
```

El repositorio debe ser **público**. Entrega el enlace en Classroom antes de las **17:50**.
