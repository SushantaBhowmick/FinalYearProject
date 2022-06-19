const express = require("express");
const cors = require("cors");

const v1 = require("./routes");

const app = express();

const HOSTNAME = "0.0.0.0";
const PORT = 8080;

const handleRoutes = (app) => {
  app.use(v1);
};

async function main() {
  app.use(express.json());
  app.use(cors());
  if (process.env.NODE_ENV === "development")
    app.use((req, res, next) => {
      console.log(
        "request body",
        typeof req.body === "object"
          ? JSON.stringify(req.body, null, 2)
          : req.body
      );
      console.log(
        "request headers",
        typeof req.headers === "object"
          ? JSON.stringify(req.headers, null, 2)
          : req.headers
      );
      console.log(
        "request query",
        typeof req.query === "object"
          ? JSON.stringify(req.query, null, 2)
          : req.query
      );
      return next();
    });

  handleRoutes(app);

  app
    .listen(PORT, HOSTNAME, () => {
      console.log(
        "Successfully listening on port",
        `http://${HOSTNAME}:${PORT}`
      );
    })
    .on("error", console.error);
}

main().catch((err) => {
  console.error(err);
  process.abort();
});
