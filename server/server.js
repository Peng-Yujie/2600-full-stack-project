/*
 Loading built-in modules
*/
const fs = require("fs");
const path = require("path");
/*
  Loading external modules
*/
const express = require("express");
const server = express();
const MongoClient = require("mongodb").MongoClient;

/*
  Loading internal modules
*/
const config = require("./config/config");
const util = require("../models/util.js");
const homeController = require("../controllers/homeController");
const memberController = require("../controllers/memberController");
const authController = require("../controllers/authController");

/*
  Middleware
*/
server.use(express.static(config.ROOT));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(homeController);
server.use(memberController);
server.use(authController);
server.get("/logs", async (req, res, next) => {
  util.logRequest(req, res, next);
});
server.use((req, res, next) => {
  res.status(404).sendFile("404.html", { root: config.ROOT });
});
server.listen(config.PORT, "localhost", () => {
  console.log(
    `\t|Server listening on ${config.PORT}, http://localhost:${config.PORT}`
  );
});
