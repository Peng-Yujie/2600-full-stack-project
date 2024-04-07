const express = require("express");
const bcrypt = require("bcrypt");
const config = require("../server/config/config");
const user = require("../models/user");
const util = require("../models/util");
const Post = require("../models/post");
const client = util.getMongoClient();
const memberController = express.Router();

// User sign-up
memberController.post("/signup", util.logRequest, async (req, res) => {
  try {
    const { email, password } = req.body;
    // connect to the database
    await client.connect();
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
    client.close();
    // log the request
    util.logRequest(req, res);
  }
});

// User sign-in
memberController.post("/signin", util.logRequest, async (req, res) => {
  try {
    const { email, password } = req.body;
    // connect to the database
    await client.connect();
    // search for the user by email
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
    client.close();
    // log the request
    util.logRequest(req, res);
  }
});

// User sign-out
memberController.post("/signout", util.logRequest, async (req, res) => {
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

// Member routes
memberController.get("/member", util.logRequest, async (req, res, next) => {
  console.info("Inside member.html");
  let collection = client.db().collection("Posts");
  let post = Post("Security", "AAA is a key concept in security", "Pentester");
  util.insertOne(collection, post);
  res.sendFile("member.html", { root: config.ROOT });
});

memberController.get("/posts", util.logRequest, async (req, res, next) => {
  let collection = client.db().collection("Posts");
  let posts = await util.find(collection, {});
  //Utils.saveJson(__dirname + '/../data/topics.json', JSON.stringify(topics))
  res.status(200).json(posts);
});

memberController.get(
  "/postMessage",
  util.logRequest,
  async (req, res, next) => {
    res.sendFile("postMessage.html", { root: config.ROOT });
  }
);

memberController.post("/addPost", util.logRequest, async (req, res, next) => {
  let collection = client.db().collection("Posts");
  let topic = req.body.topic;
  let message = req.body.message;
  let user = req.body.by;
  let post = Post(topic, message, user);
  util.insertOne(collection, post);
  res.redirect("/posts.html");
});

// This route is used to test the connection between the server and the database
memberController.post("/test", util.logRequest, async (req, res, next) => {
  let collection = client.db().collection("Posts");
  let post = Post(req.body.topic, req.body.message, req.body.by);
  util.insertOne(collection, post);
});

module.exports = memberController;