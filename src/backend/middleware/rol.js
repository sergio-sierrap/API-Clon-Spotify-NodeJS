const { verifyToken } = require("../../src/services/handleToken");
const { handleErrorResponse } = require("../../src/services/handleError");
const { userModel } = require("../../src/models/users");

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleErrorResponse(res, "NOT_ALLOW", 409);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await userModel.findById(tokenData._id);

    if ([].concat(roles).includes(userData.role)) {
      next();
    } else {
      handleErrorResponse(res, "NOT_ROL", 409);
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = checkRoleAuth;
