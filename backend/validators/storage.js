const { check } = require("express-validator");
const { validateResult } = require("../../services/handleValidator");
const validateId = [
  check("id").exists().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateId };
