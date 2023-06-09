require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const morganBody = require("morgan-body");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./config/mongo");
const swaggerSpec = require("./docs/swagger");
const { loggerSlack } = require("./utils/handleLoger");
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));


const port = process.env.PORT || 3000;

morganBody(app, {
  skip: function (req, res) {
    return (
      [403, 404, 409, 401].includes(res.statusCode) || res.statusCode < 400
    );
  },
  stream: loggerSlack,
});

/**
 * API - Documentation
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * API Rest
 */
app.use("/api", require("./routes"));

app.listen(port, () =>
  console.log(`Backend App is running at http://localhost:${port} in development mode`)
);


dbConnectNoSql();
