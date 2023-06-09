// const { verifyToken } = require("../../services/jwtService");
// const { handleErrorResponse } = require("../../services/handleError");
// const { userModel } = require("../../models/users");

// const checkRoleAuth = (roles) => async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       handleErrorResponse(res, "NOT_ALLOW", 409);
//       return;
//     }
//     const token = req.headers.authorization.split(" ").pop();
//     const tokenData = await verifyToken(token);
//     const userData = await userModel.findById(tokenData._id);

//     if ([].concat(roles).includes(userData.role)) {
//       next();
//     } else {
//       handleErrorResponse(res, "NOT_ROL", 409);
//     }
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// module.exports = checkRoleAuth;

const { handleHttpError } = require("../../services/handleError");
/**
 * Array con los roles permitidos
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log(user);
    const rolesByUser = user.role; //TODO ["user"]
    //TODO: ["admin","manager"]
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    ); //TODO: true, false
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    next();
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = checkRol;