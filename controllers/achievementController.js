const express = require("express");
const util = require("../models/util");
const achievementController = express.Router();

// External Web API
const API_URL = "https://emojihub.yurace.pro/api/all/category/activities";

// Medals
achievementController.get("/medals", util.logRequest, async (req, res) => {
  try {
    const reply = await util.getJSONData(API_URL);
    let medals = [];
    const top1 = reply.find((emoji) =>
      emoji.name.includes("first place medal")
    );
    const top2 = reply.find((emoji) =>
      emoji.name.includes("second place medal")
    );
    const top3 = reply.find((emoji) =>
      emoji.name.includes("third place medal")
    );
    const top10 = reply.find((emoji) => emoji.name.includes("sports medal"));
    medals.push(top1, top2, top3, top10);
    // return the medals
    res.status(200).json(medals);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred: " + err.message });
  }
});

module.exports = achievementController;
