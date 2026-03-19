# backend-medium

API REST construida con Node.js, Express, TypeScript, Sequelize y PostgreSQL para una plataforma de publicaciones tipo Medium.

## Que hace este proyecto

Este backend permite:

- registrar usuarios y autenticarlos con JWT;
- crear publicaciones asociadas al usuario autenticado;
- listar publicaciones y consultar una publicacion por id;
- agregar comentarios a una publicacion;
- dar o quitar like a una publicacion;
- consultar cuantas reacciones tiene una publicacion;
- comprobar el estado del servicio con un endpoint de salud.

## Stack

- Node.js
- Express 5
- TypeScript
- Sequelize
- PostgreSQL
- JWT
- bcrypt

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto con valores como estos:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=backend_medium
DB_USER=postgres
DB_PASS=postgres
JWT_SECRET=super_secreto
```

## Instalacion

```bash
npm install
```

## Como correrlo

1. Crea una base de datos PostgreSQL vacia.
2. Configura el archivo `.env`.
3. Ejecuta las migraciones:

```bash
npx sequelize-cli db:migrate
```

4. Inicia el proyecto en desarrollo:

```bash
npm run dev
```

El servidor queda disponible por defecto en `http://localhost:3000`.

## Ejecucion en produccion

```bash
npm run build
npm start
```

## Endpoints principales

### Salud

```http
GET /health
```

Respuesta esperada:

```json
{ "ok": true }
```

### Autenticacion

```http
POST /api/auth/register
POST /api/auth/login
```

Payload de registro:

```json
{
  "name": "Sergio",
  "email": "sergio@example.com",
  "password": "123456"
}
```

Payload de login:

```json
{
  "email": "sergio@example.com",
  "password": "123456"
}
```

Ambos endpoints responden con un objeto similar a este:

```json
{
  "user": {
    "id": 1,
    "name": "Sergio",
    "email": "sergio@example.com"
  },
  "token": "jwt..."
}
```

### Publicaciones

```http
GET /api/posts
GET /api/posts/:id
POST /api/posts
```

`POST /api/posts` requiere cabecera `Authorization: Bearer <token>`.

Payload de ejemplo:

```json
{
  "title": "Mi primer post",
  "content": "Contenido largo de la publicacion",
  "excerpt": "Resumen corto opcional",
  "image": "https://example.com/post.jpg",
  "tags": ["node", "typescript", "postgres"]
}
```

Si `excerpt` no se envia, el servicio genera uno automaticamente usando los primeros 200 caracteres de `content`.

### Comentarios

```http
GET /api/comments/:postId
POST /api/comments/:postId
```

`POST /api/comments/:postId` requiere autenticacion.

Payload:

```json
{
  "content": "Buen articulo"
}
```

### Likes

```http
POST /api/likes/:postId
GET /api/likes/:postId/count
```

`POST /api/likes/:postId` requiere autenticacion y funciona como toggle:

- si el usuario no habia dado like, lo crea;
- si ya habia dado like, lo elimina.

## Ejemplos de uso con curl

### 1. Registrar usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Sergio\",\"email\":\"sergio@example.com\",\"password\":\"123456\"}"
```

### 2. Iniciar sesion

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"sergio@example.com\",\"password\":\"123456\"}"
```

Guarda el valor de `token` para las rutas protegidas.

### 3. Crear un post

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d "{\"title\":\"Mi primer post\",\"content\":\"Contenido del post\",\"tags\":[\"backend\",\"api\"]}"
```

### 4. Listar publicaciones

```bash
curl http://localhost:3000/api/posts
```

### 5. Consultar un post por id

```bash
curl http://localhost:3000/api/posts/1
```

### 6. Comentar un post

```bash
curl -X POST http://localhost:3000/api/comments/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d "{\"content\":\"Excelente contenido\"}"
```

### 7. Listar comentarios de un post

```bash
curl http://localhost:3000/api/comments/1
```

### 8. Dar o quitar like

```bash
curl -X POST http://localhost:3000/api/likes/1 \
  -H "Authorization: Bearer TU_TOKEN"
```

### 9. Contar likes

```bash
curl http://localhost:3000/api/likes/1/count
```

## Notas

- El proyecto incluye migraciones para `users`, `posts`, `likes` y `comments`.
- El like por usuario y publicacion es unico por la restriccion `unique_user_post_like`.
- No hay tests automatizados implementados actualmente.
