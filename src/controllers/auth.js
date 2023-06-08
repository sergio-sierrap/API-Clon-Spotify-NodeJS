const { encrypt, compare } = require("../services/hashingService");
const {handleHttpError} = require("../services/handleError");
const { tokenSign } = require("../services/jwtService");
const { userModel } = require("../models/users");
const { matchedData } = require("express-validator");

// /**
//  * Controller for login
//  * @param {*} req
//  * @param {*} res
//  * @returns
//  */
// const loginCtrl = async (req, res) => {
//   try {
//     const body = matchedData(req);
//     const user = await userModel.findOne({ email: body.email });
//     if (!user) {
//       handleErrorResponse(res, "USER_NOT_EXISTS", 404);
//       return;
//     }
//     const checkPassword = await compare(body.password, user.password);

//     if (!checkPassword) {
//       handleErrorResponse(res, "PASSWORD_INVALID", 402);
//       return;
//     }

//     const tokenJwt = await tokenSign(user);

//     const data = {
//       token: tokenJwt,
//       user: user,
//     };

//     res.send({ data });
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// /**
//  * Controller for register
//  * @param {*} req
//  * @param {*} res
//  * @returns
//  */
// const registerCtrl = async (req, res) => {
//   try {
//     const body = matchedData(req);
//     const checkIsExist = await userModel.findOne({ email: body.email });
//     if (checkIsExist) {
//       handleErrorResponse(res, "USER_EXISTS", 401);
//       return;
//     }
//     const password = await encrypt(body.password);
//     const bodyInsert = { ...body, password };
//     const data = await userModel.create(bodyInsert);
//     res.send({ data });
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// module.exports = { loginCtrl, registerCtrl };


/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
  try{
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await userModel.create(body);
    dataUser.set("password", undefined, { strict: false });
  
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.status(201)
    res.send({ data });
  }catch(e){
    console.log(e)
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
};

/**
 * Este controlador es el encargado de logear a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
  try{
    req = matchedData(req);
    const user = await userModel.findOne({email:req.email})

    if(!user){
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return
    }

    const hashPassword = user.get('password');

    const check = await compare(req.password, hashPassword)

    if(!check){
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return
    }

    user.set('password', undefined, {strict:false})
    const data = {
      token: await tokenSign(user),
      user
    }

    res.send({data})

  }catch(e){
    console.log(e)
    handleHttpError(res, "ERROR_LOGIN_USER")
  }
}

module.exports = { registerCtrl, loginCtrl };