// const { check } = require("express-validator");
// const { validateResult } = require("../../services/handleValidator");
// const validateLogin = [
//   check("email").exists().notEmpty(),
//   check("password").exists().notEmpty(),
//   (req, res, next) => {
//     validateResult(req, res, next);
//   },
// ];

// const validateRegister = [
//   check("name").exists().notEmpty(),
//   check("age").exists().notEmpty().isNumeric({ min: 12, max: 99 }),
//   check("email").exists().notEmpty().isEmail(),
//   check("password").exists().notEmpty().isLength({min:8, max:15}),
//   (req, res, next) => {
//     validateResult(req, res, next);
//   },
// ];

// module.exports = { validateLogin, validateRegister };

const { check } = require("express-validator");
const validateResults = require("../../services/handleValidator")

const validatorRegister = [
    check("name")
    .exists()
    .notEmpty()
    .isLength({min:3, max:99}),
    check("age")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("password")
    .exists()
    .notEmpty()
    .isLength({min:3, max:15}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorLogin = [
    check("password")
    .exists()
    .notEmpty()
    .isLength({min:3, max:15}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorRegister, validatorLogin};
