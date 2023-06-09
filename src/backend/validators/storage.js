// const { check } = require("express-validator");
// const { validateResult } = require("../../services/handleValidator");
// const validateId = [
//   check("id").exists().isMongoId(),
//   (req, res, next) => {
//     validateResult(req, res, next);
//   },
// ];

// module.exports = { validateId };

const { check } = require("express-validator");
const validateResults = require("../../services/handleValidator")


const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


module.exports = { validatorGetItem };
