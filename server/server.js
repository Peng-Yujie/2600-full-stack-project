/*
  Loading external modules
*/
const express = require("express");
const server = express();

/*
  Loading internal modules
*/
const config = require("./config/config");
const util = require("../models/util.js");
const homeController = require("../controllers/homeController");
const memberController = require("../controllers/memberController");

/*
  Middleware
*/
server.use(express.static(config.ROOT));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(homeController);
server.use(memberController);
server.get("/logs", async (req, res, next) => {
  util.logRequest(req, res, next);
});
server.use((req, res, next) => {
  res.status(404).send("404: Page not found");
});

/*
  Connect to the database
*/
util
  .connectDB()
  .then(() => {
    // Start the server
    server.listen(config.PORT, "localhost", () => {
      console.log(
        `\t|Server listening on ${config.PORT}, http://localhost:${config.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("\t|Wrong connection", err.message);
    process.exit(1);
  });
