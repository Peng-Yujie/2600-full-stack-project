require("dotenv").config();

const config = {};
config.SERVER = process.env.SERVER || "cpsc2600.ormjv9a.mongodb.net";
config.USERNAME = process.env.USERNAME || "cpsc2600";
config.PASSWORD = process.env.PASSWORD || "cpsc2600";
config.DATABASE = process.env.DATABASE || "database";
module.exports = config;
