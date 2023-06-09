// const express = require("express");
// const router = express.Router();
// const { getItem, getItems, updateItem, createItem, deleteItem} = require("../controllers/tracks");
// const authMiddleware = require("../backend/middleware/auth");
// const authRolMiddleware = require("../backend/middleware/rol");
// const { validateId, validateObjectDataCreate, validateObjectDataUpdate} = require("../backend/validators/tracks");
// /**
//  * Get all tracks
//  * @swagger
//  * /tracks:
//  *    get:
//  *      tags:
//  *        - tracks
//  *      summary: "List all tracks"
//  *      description: List all tracks with details
//  *      security:
//  *        - bearerAuth: []
//  *      responses:
//  *        '200':
//  *          description: .
//  *        '402':
//  *          description: Not allow because you need more permissions
//  *    responses:
//  *      '201':
//  *        description: retorna el objeto insertado en la coleccion con stado '201'
//  */
// router.get("/", authMiddleware, getItems);
// /**
//  * Get track
//  * @swagger
//  * /tracks/{id}:
//  *    get:
//  *      tags:
//  *        - tracks
//  *      summary: "Get track"
//  *      description: Get track detail
//  *      responses:
//  *        '200':
//  *          description: Retorna el objeto insertado en la coleccion.
//  *        '422':
//  *          description: Error de validacion.
//  *      security:
//  *        - bearerAuth: []
//  *      parameters:
//  *        -  in: "path"
//  *           name: "id"
//  *           description: "ID track"
//  *           required: true
//  *           schema:
//  *              type: string
//  *    responses:
//  *      '201':
//  *        description: retorna el objeto insertado en la coleccion con stado '201'
//  * 
//  */
// router.get("/:id", authMiddleware, validateId, getItem);
// /**
//  * Post new track
//  * @swagger
//  * /tracks:
//  *    post:
//  *      tags:
//  *        - tracks
//  *      summary: "Add track"
//  *      description: Add new track with detail
//  *      responses:
//  *        '200':
//  *          description: Retorna el objeto insertado en la coleccion.
//  *        '422':
//  *          description: Error de validacion.
//  *      security:
//  *        - bearerAuth: []
//  *      parameters:
//  *        -  in: "body"
//  *           name: "body"
//  *           description: "parametros requeridos para insertar comentrario"
//  *           required: true
//  *           schema:
//  *              $ref: "#/definitions/track"
//  *    responses:
//  *      '201':
//  *        description: retorna el objeto insertado en la coleccion con stado '201'
//  */
// router.post(
//   "/",
//   authMiddleware,
//   authRolMiddleware(["admin"]),
//   validateObjectDataCreate,
//   createItem
// );
// /**
//  * Upadte new track
//  * @swagger
//  * /tracks/{id}:
//  *    put:
//  *      tags:
//  *        - tracks
//  *      summary: "Update track"
//  *      description: Update track with detail
//  *      responses:
//  *        '200':
//  *          description: Retorna el objeto insertado en la coleccion.
//  *        '422':
//  *          description: Error de validacion.
//  *      security:
//  *        - bearerAuth: []
//  *      parameters:
//  *        -  in: "body"
//  *           name: "body"
//  *           description: "parametros requeridos para insertar comentrario"
//  *           required: true
//  *           schema:
//  *              $ref: "#/definitions/track"
//  *        -  in: "path"
//  *           name: "id"
//  *           description: "ID track"
//  *           required: true
//  *           schema:
//  *              type: string
//  *    responses:
//  *      '201':
//  *        description: retorna el objeto insertado en la coleccion con stado '201'
//  */
// router.put("/:id", authMiddleware, validateObjectDataUpdate, updateItem);
// /**
//  * Delete track
//  * @swagger
//  * /tracks/{id}:
//  *    delete:
//  *      tags:
//  *        - tracks
//  *      summary: "Delete track"
//  *      description: Delete track detail
//  *      responses:
//  *        '200':
//  *          description: Retorna el objeto insertado en la coleccion.
//  *        '422':
//  *          description: Error de validacion.
//  *      security:
//  *        - bearerAuth: []
//  *      parameters:
//  *        -  in: "path"
//  *           name: "id"
//  *           description: "ID track"
//  *           required: true
//  *           schema:
//  *              type: string
//  *    responses:
//  *      '201':
//  *        description: retorna el objeto insertado en la coleccion con stado '201'
//  * 
//  */
// router.delete("/:id", authMiddleware, validateId, deleteItem);

// module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../backend/middleware/auth");
const checkRol = require("../backend/middleware/rol");
const { validatorCreateItem, validatorGetItem } = require("../backend/validators/tracks");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");

/**
 * Get all tracks
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Listar canciones"
 *      description: Obten todas las listas de las canciones
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las canciones.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error de validacion.
 */

router.get("/", getItems);
/**
 * Get track
 * @openapi
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Detalle cancion"
 *      description: Obten el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error de validacion.
 */

router.get("/:id", validatorGetItem, getItem);
/**
 * Register new track
 * @openapi
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Register track"
 *      description: Registra una cancion y obtener el detalle del registro
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/", authMiddleware, checkRol(["user", "admin"]), validatorCreateItem, createItem);

/**
 * Update track
 * @openapi
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: "Update track"
 *      description: Actualiza una cancion y obtener el detalle del registro
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objeto actualizado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/track'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

/**
 * Delete track
 * @openapi
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: "Eliminar cancion"
 *      description: Elimiar el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *        '422':
 *          description: Error de validacion.
 */

router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);
module.exports = router;