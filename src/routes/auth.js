const express = require("express");
const router = express.Router();
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const { validateRegister, validateLogin } = require("../backend/validators/auth");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register for new users.
 *     description: It registers a new user with given data.
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name.
 *               age:
 *                 type: number
 *                 description: User's age (It has to be between 12 to 99).
 *               email:
 *                 type: string
 *                 description: User's email.
 *               password:
 *                 type: string
 *                 description: User's password (It has to be between 8 to 15 characters).
 *     responses:
 *       200:
 *         description: Successful registration.
 *       400:
 *         description: Validation error of registration data.
 *       500:
 *         description: Server error
 */
router.post("/register", validateRegister, registerCtrl);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     description: Login user with email and password given.
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: Succesfull login.
 *       400:
 *         description: Error of validation in the data for login.
 *       401:
 *         description: Invalid credentials.
 */
router.post("/login", validateLogin, loginCtrl);

module.exports = router;
