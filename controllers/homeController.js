const util = require("../models/util.js");
const express = require("express");
const homeController = express.Router();
homeController.get("/", util.logRequest, (req, res) => {
  res.sendFile("index.html");
});
homeController.get("/index", util.logRequest, (req, res) => {
  res.sendFile("index.html");
});
homeController.get("/about", util.logRequest, (req, res) => {
  res.sendFile("about.html");
});
module.exports = homeController;
