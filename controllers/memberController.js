const express = require("express");
const bcrypt = require("bcrypt");
const config = require("../server/config/config");
const User = require("../models/user");
const util = require("../models/util");
const Score = require("../models/score");
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
          // redirect state based on role
          state: role === "admin" ? "admin" : "home",
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
              // redirect to admin page
              state: "admin",
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
            // redirect to game page
            state: "game",
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
    res.status(200).json({
      success: `${email} signed out successfully!`,
      // redirect to home page
      state: "home",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred: " + err.message });
  } finally {
    // log the request
    util.logRequest(req, res);
  }
});

// User score
memberController.post("/score", util.logRequest, async (req, res, next) => {
  let db = await getDB();
  let collection = db.collection("scores");
  let user = req.body.name;
  let time = req.body.time;
  let difficulty = req.body.difficulty;
  let score = Score(user, time, difficulty);
  util.insertOne(collection, score);
  res.status(200).json({ success: "Score added successfully" });
});

// Member routes
memberController.get("/highscores", util.logRequest, async (req, res, next) => {
  try {
    let db = await getDB();
    let collection = db.collection("scores");
    let user = req.body.name;
    let scores = await util.find(collection, {});
    let topScores = scores.sort((a, b) => a.time - b.time).slice(0, 10);
    let userTopScores = scores
      .filter((score) => score.user === user)
      .sort((a, b) => a.time - b.time)
      .slice(0, 10);
    res.status(200).json({
      success: "High scores retrieved successfully",
      topScores,
      userTopScores,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving high scores" });
  }
});

// Admin routes
memberController.get(
  "/admin/:email",
  util.logRequest,
  async (req, res, next) => {
    try {
      console.info("Inside admin.html");
      const email = req.params.email;
      console.log(email);
      // check if the current user is an admin
      let db = await getDB();
      let collection = db.collection("users");
      let user = await util.findOne(collection, { email: email });
      console.log(user);
      // if the user is not an admin, send an error message and return
      if (!user.isAdmin) {
        res.status(401).json({ error: "Unauthorized access" });
        return;
      }
      // get all users
      let users = await util.find(collection, {});
      // route to admin page
      res.status(200).json({
        success: "Welcome to the admin page",
        users: users,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving users" });
    }
  }
);
// Admin user management
memberController.post(
  "/admin/delete",
  util.logRequest,
  async (req, res, next) => {
    try {
      console.info("\t|Deleting user");
      const { adminEmail, userEmail } = req.body;
      let db = await getDB();
      let collection = db.collection("users");
      // admin verification
      let admin = await util.findOne(collection, { email: adminEmail });
      if (!admin.isAdmin) {
        res.status(401).json({ error: "Unauthorized access" });
        return;
      }
      // delete the user
      let userToDelete = await util.findOne(collection, { email: userEmail });
      if (!userToDelete) {
        res.status(400).json({ error: "User not found" });
        return;
      }
      await util.deleteOne(collection, { email: userEmail });
      console.log(`\t|User ${userEmail} deleted successfully`);
      res.status(200).json({ success: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user" });
    }
  }
);

module.exports = memberController;
