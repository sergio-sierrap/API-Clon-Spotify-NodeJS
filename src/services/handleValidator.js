// const { validationResult } = require('express-validator'); //TODO:

// const validateResult = (req, res, next) => {
//     try {
//         validationResult(req).throw()
//         return next()
//     } catch (err) {
//         res.status(403)
//         res.send({ errors: err.array() })
//     }
// }

// module.exports = { validateResult }

const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next(); //TODO Continua hacia el controlador!
  } catch (err) {
    res.status(403);
    res.send({ errors: err.array() });
  }
};

module.exports = validateResults