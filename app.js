require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./backend/database/mongo");
const swaggerSpec = require("./backend/docs/swagger");
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 3000;

/**
 * API Rest
 */
app.use("/api", require("./src/routes"));

/**
 * API - Documentation
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () =>
  console.log(`Backend App is running at http://localhost:${port} in development mode`)
);

dbConnectNoSql();