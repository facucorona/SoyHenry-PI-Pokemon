const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://pokemon-pi-facucorona.vercel.app"
  );
  // res.header('Access-Control-Allow-Origin', 'https://pokemon-pi-facucorona.vercel.app');

  // update to match the domain you will make the request from
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Las rutas se montan dos veces a propósito:
//   "/"    -> como en Vercel, que saca el prefijo /api antes de llamar a la app.
//   "/api" -> para correr en local, donde el dev server de CRA hace proxy de
//             /api/* a este proceso y le llega el prefijo intacto.
server.use("/", routes);
server.use("/api", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
