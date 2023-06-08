const mongoose = require("mongoose");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../services/handleError");
const { tracksModel } = require("../models/tracks");
//const optionsPaginate = require("../backend/database/paginationParams");

// /**
//  * Get detail by single row
//  * @param {*} req
//  * @param {*} res
//  */
// const getItem = async (req, res) => {
//   try {
//     req = matchedData(req);
//     const id = req.id;
//     const [data] = await tracksModel.aggregate([
//       {
//         $lookup: {
//           from: "storages",
//           localField: "mediaId",
//           foreignField: "_id",
//           as: "audio",
//         },
//       },
//       { $unwind: "$audio" },
//       {
//         $match: {
//           _id: mongoose.Types.ObjectId(id),
//         },
//       },
//     ]);

//     res.send({ data });
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// /**
//  *
//  * @param {*} req
//  * @param {*} res
//  */
// const getItems = async (req, res) => {
//   try {
//     const [, options] = optionsPaginate(req);
//     const data = await tracksModel.paginate({}, options);
//     res.send({ data });
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// /**
//  * Upload and create record with public source
//  * @param {*} req
//  * @param {*} res
//  */
// const createItem = async (req, res) => {
//   try {
//     req = matchedData(req);
//     console.log(req);
//     const data = await tracksModel.create(req);
//     res.send({ data });
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// /**
//  * update detail row
//  * @param {*} req
//  * @param {*} res
//  */
// const updateItem = async (req, res) => {
//   try {
//     req = matchedData(req);
//     const { id, ...body } = req;

//     const data = await tracksModel.findOneAndUpdate(id, body, {
//       new: true,
//     });
//     res.send({ data });
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// /**
//  * delete row
//  * @param {*} req
//  * @param {*} res
//  */
// const deleteItem = async (req, res) => {
//   try {
//     req = matchedData(req);
//     const id = req.id;
//     const findData = await tracksModel.delete({ _id: id });
//     const data = {
//       findData: findData,
//       deleted: true,
//     };

//     res.send({ data });
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await tracksModel.findAllData({});
    res.send({ data,  user });
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try{
    req = matchedData(req);
    const {id} = req;
    const data = await tracksModel.findOneData(id);
    res.send({ data });
  }catch(e){
    handleHttpError(res,"ERROR_GET_ITEM")
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

/**
 *  Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const {id, ...body} = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(
      id, body
    );
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try{
    req = matchedData(req);
    const {id} = req;
    const deleteResponse = await tracksModel.delete({_id:id});
    const data = {
      deleted: deleteResponse.matchedCount
    }
    
    res.send({data});
  }catch(e){
    console.log(e)
    handleHttpError(res,"ERROR_DELETE_ITEM")
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };