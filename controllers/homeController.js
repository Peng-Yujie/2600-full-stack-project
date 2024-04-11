const util = require("../models/util.js");
const express = require("express");
const homeController = express.Router();
homeController.get(
  ["/", "/home", "/index", "/index.html"],
  util.logRequest,
  (req, res) => {
    res.sendFile("index.html");
  }
);

module.exports = homeController;
