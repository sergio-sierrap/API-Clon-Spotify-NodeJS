const { encrypt, compare } = require("../../services/handleJwt");
const {handleHttpError,handleErrorResponse,} = require("../../services/handleError");
const { tokenSign } = require("../../services/handleToken");

const { userModel } = require("../models/users");
const { matchedData } = require("express-validator");

/**
 * Controller for login
 * @param {*} req
 * @param {*} res
 * @returns
 */
const loginCtrl = async (req, res) => {
  try {
    const body = matchedData(req);
    const user = await userModel.findOne({ email: body.email });
    if (!user) {
      handleErrorResponse(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const checkPassword = await compare(body.password, user.password);

    if (!checkPassword) {
      handleErrorResponse(res, "PASSWORD_INVALID", 402);
      return;
    }

    const tokenJwt = await tokenSign(user);

    const data = {
      token: tokenJwt,
      user: user,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/**
 * Controller for register
 * @param {*} req
 * @param {*} res
 * @returns
 */
const registerCtrl = async (req, res) => {
  try {
    const body = matchedData(req);
    const checkIsExist = await userModel.findOne({ email: body.email });
    if (checkIsExist) {
      handleErrorResponse(res, "USER_EXISTS", 401);
      return;
    }
    const password = await encrypt(body.password);
    const bodyInsert = { ...body, password };
    const data = await userModel.create(bodyInsert);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { loginCtrl, registerCtrl };
