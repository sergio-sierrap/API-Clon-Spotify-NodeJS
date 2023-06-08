require("dotenv").config();
const config = require('./src/config/config.' + process.env.NODE_ENV + '.js');
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./src/backend/database/mongo");
const swaggerSpec = require("./src/backend/docs/swagger");
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = config.port;


/**
 * API - Documentation
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * API Rest
 */
app.use("/api", require("./src/routes"));

if (NODE_ENV !== 'test'){
  app.listen(port, () =>
  console.log(`Backend App is running at http://localhost:${port} in ${NODE_ENV.toUpperCase} mode`)
);
}

dbConnectNoSql();

module.exports = app;