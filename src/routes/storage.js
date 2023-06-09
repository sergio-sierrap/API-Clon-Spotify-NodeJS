// const express = require("express");
// const router = express.Router();
// const { getItem, getItems, createItem, deleteItem } = require("../controllers/storage");
// const { validateId } = require("../backend/validators/storage");
// const { upload } = require("../services/handleStore");
// /**
//  * Upload file storage
//  * @swagger
//  * /storage:
//  *    post:
//  *      tags:
//  *        - storage
//  *      summary: "Post file .mp3"
//  *      description: List all storage with details
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
// router.post("/", upload.single("file"), createItem);
// /**
//  * Get list storages
//  * @swagger
//  * /storage:
//  *    get:
//  *      tags:
//  *        - storage
//  *      summary: "Get list storage"
//  *      description: Obtener la lista de canciones
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
// router.get("/", getItems);
// /**
//  * Detalle track
//  * @swagger
//  * /storage/{id}:
//  *    get:
//  *      tags:
//  *        - storage
//  *      summary: "Detalle track"
//  *      description: Detalle track with detail
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
// router.get("/:id", validateId, getItem);
// /**
//  * Delete storage
//  * @swagger
//  * /storage/{id}:
//  *    delete:
//  *      tags:
//  *        - storage
//  *      summary: "Delete storage"
//  *      description: Delete storage detail
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
// router.delete("/:id", validateId, deleteItem);



// module.exports = router;


const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../services/handleStore");
const { validatorGetItem } = require("../backend/validators/storage")
const { getItems, getItem, updateItem, deleteItem, createItem } = require("../controllers/storage");

/**
 * Get all storages
 * @openapi
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: "Listar archivos"
 *      description: Obten todas las listas de las archivos
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las archivos.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Error de validacion.
 */

router.get("/", getItems);
/**
 * Get detail from storage
 * @openapi
 * /storage/{id}:
 *    get:
 *      tags:
 *        - storage
 *      summary: "Detalle storage"
 *      description: Obten el detalle de una storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de storage a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la storage.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Error de validacion.
 */

router.get("/:id", validatorGetItem, getItem);
/**
 * Delete storage
 * @openapi
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "Eliminar storage"
 *      description: Elimiar el detalle de una storage
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
 *          description: Retorna el objecto de la storage.
 *        '422':
 *          description: Error de validacion.
 */

router.delete("/:id", validatorGetItem, deleteItem);
/**
 * Upload file
 * @openapi
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "Upload file"
 *      description: Subir un archivo
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myfile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */

router.post("/", uploadMiddleware.single("myfile"), createItem);

module.exports = router;
