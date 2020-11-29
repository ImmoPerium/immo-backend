const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

server.get("/", function rootHandler(req, res) {
  res.send(
    `Welcome to the ${process.env.DEPLOYMENT} environment API of Immoperium!`
  );
});

const UsersRouter = require("./api/users/user-router.js");
const AdvertisementsRouter = require("./api/advertisements/advertisements-router.js");

server.use("/v1/users", UsersRouter);
server.use("/v1/realestate", AdvertisementsRouter);

module.exports = server;
