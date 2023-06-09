// const express = require("express");
// const router = express.Router();
// const { registerCtrl, loginCtrl } = require("../controllers/auth");
// const { validateRegister, validateLogin } = require("../backend/validators/auth");

// /**
//  * @swagger
//  * /auth/register:
//  *   post:
//  *     summary: Register for new users.
//  *     description: It registers a new user with given data.
//  *     tags:
//  *       - auth
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 description: User's name.
//  *               age:
//  *                 type: number
//  *                 description: User's age (It has to be between 12 to 99).
//  *               email:
//  *                 type: string
//  *                 description: User's email.
//  *               password:
//  *                 type: string
//  *                 description: User's password (It has to be between 8 to 15 characters).
//  *     responses:
//  *       200:
//  *         description: Successful registration.
//  *       400:
//  *         description: Validation error of registration data.
//  *       500:
//  *         description: Server error
//  */
// router.post("/register", validateRegister, registerCtrl);

// /**
//  * @swagger
//  * /auth/login:
//  *   post:
//  *     summary: Login User
//  *     description: Login user with email and password given.
//  *     tags:
//  *       - auth
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 description: User's email.
//  *               password:
//  *                 type: string
//  *                 description: User's password.
//  *     responses:
//  *       200:
//  *         description: Succesfull login.
//  *       400:
//  *         description: Error of validation in the data for login.
//  *       401:
//  *         description: Invalid credentials.
//  */
// router.post("/login", validateLogin, loginCtrl);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { loginCtrl, registerCtrl } = require("../controllers/auth")
const { validatorRegister, validatorLogin } = require("../backend/validators/auth");

/**
 * http://localhost:3001/api
 * 
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register nuevo usario"
 *          description: "Esta ruta es para registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: El usuario se registra de manera correcta
 *                  '403':
 *                      description: Error por validacion
 */

router.post("/register", validatorRegister, registerCtrl);
/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: Iniciar session a un nuevo usuario y obtener el token de sesión
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */

router.post("/login", validatorLogin, loginCtrl);

module.exports = router;