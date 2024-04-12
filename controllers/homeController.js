const util = require("../models/util.js");
const express = require("express");
const path = require("path");
const homeController = express.Router();
homeController.get(
  ["/", "/home", "/index", "/index.html"],
  util.logRequest,
  (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  }
);

module.exports = homeController;
