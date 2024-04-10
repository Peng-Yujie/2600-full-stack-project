const express = require("express");
const bcrypt = require("bcrypt");
const config = require("../server/config/config");
const User = require("../models/user");
const util = require("../models/util");
const Post = require("../models/post");
const { getDB } = require("../models/util"); // get access to the database
const memberController = express.Router();

// User sign-up
memberController.post("/signup", util.logRequest, async (req, res) => {
  try {
    const { email, password } = req.body;
    // get the database connection
    let db = await getDB();
    // check if the email is already in users
    let collection = db.collection("users");
    let isUser = await util.findOne(collection, { email: email });
    if (isUser) {
      res
        .status(400)
        .json({ error: `${email} already exists. Choose a different email` });
    } else {
      // admin registration
      // console.log("\t|", email, password, config.ADMIN, config.ADMIN_PASSWORD);
      let role =
        email === config.ADMIN && password === config.ADMIN_PASSWORD
          ? "admin"
          : "member";
      let hashed = await bcrypt.hash(password, 10);
      let newUser = User(email, hashed, role);
      await util.insertOne(collection, newUser);
      // add user to authenticated users collection
      let authUsers = db.collection("authUsers");
      let isAuth = await util.findOne(authUsers, { email: email });
      if (!isAuth) {
        await util.insertOne(authUsers, { email: email });
      }
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
memberController.post("/signin", util.logRequest, async (req, res) => {
  try {
    const { email, password } = req.body;
    // get the database connection
    let db = await getDB();
    // search for the user by email
    let collection = db.collection("users");
    let user = await util.findOne(collection, { email: email });
    if (!user) {
      res.status(400).json({ error: `Email or password is incorrect.` });
    } else {
      let match = await bcrypt.compare(password, user.hashedPassword);
      if (match) {
        // check if the user is admin
        let isAdmin = user.isAdmin;
        if (isAdmin) {
          res.status(200).json({
            success: {
              email: email,
              message: `${email} signed in successfully as an admin.`,
            },
          });
          return;
        }
        // add user to authenticated users collection
        let authUsers = db.collection("authUsers");
        let isAuth = await util.findOne(authUsers, { email: email });
        if (!isAuth) {
          await util.insertOne(authUsers, { email: email });
        }
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
memberController.post("/signout", util.logRequest, async (req, res) => {
  try {
    const { email } = req.body;
    // remove user from authenticated users collection
    let db = await getDB();
    let collection = db.collection("authUsers");
    await util.deleteOne(collection, { email: email });
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
  // let collection = client.db().collection("Posts");
  let db = await getDB();
  let collection = db.collection("Posts");
  let post = Post("Security", "AAA is a key concept in security", "Pentester");
  util.insertOne(collection, post);
  res.sendFile("member.html", { root: config.ROOT });
});

memberController.get("/posts", util.logRequest, async (req, res, next) => {
  // let collection = client.db().collection("Posts");
  let db = await getDB();
  let collection = db.collection("Posts");
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
  // let collection = client.db().collection("Posts");
  let db = await getDB();
  let collection = db.collection("Posts");
  let topic = req.body.topic;
  let message = req.body.message;
  let user = req.body.by;
  let post = Post(topic, message, user);
  util.insertOne(collection, post);
  res.redirect("/posts.html");
});

// Admin routes
memberController.get("/admin", util.logRequest, async (req, res, next) => {
  console.info("Inside admin.html");
  const email = req.headers["X-User-Email"];
  // check if the current user is an admin
  let db = await getDB();
  let collection = db.collection("users");
  let user = await util.findOne(collection, { email: email });
  // if the user is not an admin, send an error message and return
  if (!user.isAdmin) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }
  // otherwise, send the admin page
  res.sendFile("admin.html", { root: config.ROOT });
});

module.exports = memberController;
