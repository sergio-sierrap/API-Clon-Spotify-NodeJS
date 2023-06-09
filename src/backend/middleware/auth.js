// const { verifyToken } = require("../../services/jwtService");
// const { handleErrorResponse, handleHttpError } = require("../../services/handleError");

// const checkAuth = async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//         handleErrorResponse(res, "NOT_ALLOW", 409);
//       return;
//     }
//     const token = req.headers.authorization.split(" ").pop();
//     const tokenData = await verifyToken(token);
//     if (tokenData._id) {
//       next();
//     } else {
//       handleErrorResponse(res, "NOT_ALLOW", 409);
//     }
//   } catch (e) {
//     console.log(e);
//     handleHttpError(res, e);
//   }
// };

// module.exports = checkAuth;

const { handleHttpError } = require("../../services/handleError");
const { verifyToken } = require("../../services/jwtService")
const {userModel} = require("../../models/users")
// const getProperties = require("../utils/handlePropertiesEngine")
// const propertiesKey = getProperties()

const authMiddleware = async (req, res, next) => {
  try {
    if(!req.headers.authorization){
        handleHttpError(res, "NEED_SESSION", 401);
        return
    }
    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);
    if(!dataToken){
        handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
        return
    }
    // const query = {
    //   [propertiesKey.id]:dataToken[propertiesKey.id]
    // }
    const userId = dataToken._id;
    const user = await userModel.findById(userId)
    req.user = user
    next()
  }catch (e) {
    console.log(e);
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;
