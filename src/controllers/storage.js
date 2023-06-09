const fs = require("fs");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../services/handleError");
const { storageModel } = require("../models/storage");
//const optionsPaginate = require("../backend/database/paginationParams");

const PUBLIC_URL= process.env.PUBLIC_URL || null;
const MEDIA_PATH = `${__dirname}/../../public`;

// /**
//  * Get detail by single row
//  * @param {*} req
//  * @param {*} res
//  */
// const getItem = async (req, res) => {
//   try {
//     req = matchedData(req);
//     const id = req.id;
//     const data = await storageModel.findById(id);
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
//     const [, options] = optionsPaginate(req)
//     const data = await storageModel.paginate({}, options);
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
//     const { file } = req;
//     const body = {
//       url: `${URL_PUBLIC}/${file.filename}`,
//       filename: file.filename,
//     };
//     const response = await storageModel.create(body);
//     res.send({ response });
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// const deleteItem = async (req, res) => {
//   try {
//     req = matchedData(req);
//     const id = req.id;
//     const findMedia = await storageModel.findById(id);
//     const fileName = findMedia.filename;
//     await storageModel.delete({ _id: id });
//     fs.unlinkSync(`${MEDIA_PATH}/${fileName}`);

//     const data = {
//       findMedia: fileName,
//       deleted: true,
//     };

//     res.send({ data });
//   } catch (e) {
//     handleHttpError(res, e);
//   }
// };

// module.exports = { getItems, getItem, createItem, deleteItem };

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_LIST_ITEMS");
  }
};

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_DETAIL_ITEMS");
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_DETAIL_ITEMS");
    console.log(e);
  }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    const deleteResponse = await storageModel.deleteOne({ _id: id });
    // const deleteCount = deleteResponse.matchedCount;
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`; //TODO c:/miproyecto/file-1232.png

    fs.unlinkSync(filePath);
    const data = {
      deleted: deleteResponse.deletedCount,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_DETAIL_ITEMS");
    console.log(e);
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };