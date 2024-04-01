const express = require("express");
const bcrypt = require("bcrypt");
const config = require("../server/config/config");
const user = require("../models/user");
const util = require("../models/util");
const client = util.getMongoClient();
const authController = express.Router();

// User sign-up
authController.post("/signup", util.logRequest, async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if the email is already in users
    let collection = client.db().collection("users");
    let isUser = await util.findOne(collection, { email: email });
    if (isUser) {
      res
        .status(400)
        .json({ error: `${email} already exists. Choose a different email` });
    } else {
      let hashed = await bcrypt.hash(password, 10);
      let newUser = user(email, hashed);
      await util.insertOne(collection, newUser);
      res.status(200).json({
        success: {
          email: email,
          message: `${email} was added successfuly to users.`,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred: " + err.message });
  } finally {
    // log the request
    util.logRequest(req, res);
  }
});

// User sign-in
authController.post("/signin", util.logRequest, async (req, res) => {
  try {
    const { email, password } = req.body;
    let collection = client.db().collection("users");
    let user = await util.findOne(collection, { email: email });
    if (!user) {
      res.status(400).json({ error: `Email or password is incorrect.` });
    } else {
      let match = await bcrypt.compare(password, user.hashedPassword);
      if (match) {
        res.status(200).json({
          success: {
            email: email,
            message: `${email} signed in successfully.`,
          },
        });
      } else {
        res.status(400).json({ error: `Email or password is incorrect.` });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred: " + err.message });
  } finally {
    // log the request
    util.logRequest(req, res);
  }
});

// User sign-out
authController.post("/signout", util.logRequest, async (req, res) => {
  try {
    const { email } = req.body;
    res.status(200).json({ success: `${email} signed out successfully!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred: " + err.message });
  } finally {
    // log the request
    util.logRequest(req, res);
  }
});

module.exports = authController;
