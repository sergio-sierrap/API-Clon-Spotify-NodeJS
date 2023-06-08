// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `${__dirname}/../storage`);
//   },
//   filename: function (req, file, cb) {
//     const ext = file.originalname.split('.').pop()
//     const filename = `file-${Date.now()}.${ext}`
//     cb(null, filename);
//   },
// });

// const upload = multer({ storage });

// module.exports = { upload };

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../../../public`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
