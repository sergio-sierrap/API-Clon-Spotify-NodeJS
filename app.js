require("dotenv").config({
  path: `./env/${process.env.NODE_ENV}.env`
});

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./src/backend/database/mongo");
const swaggerSpec = require("./src/backend/docs/swagger");
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 9999;
const NODE_ENV = process.env.NODE_ENV

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
  console.log(`Backend App is running at http://localhost:${port} in ${NODE_ENV} mode`)
);
}

dbConnectNoSql();

module.exports = app;