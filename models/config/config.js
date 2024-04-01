require("dotenv").config();

const config = {};
config.SERVER = process.env.SERVER || "localhost";
config.USERNAME = process.env.USERNAME || "root";
config.PASSWORD = process.env.PASSWORD || "password";
config.DATABASE = process.env.DATABASE || "database";
module.exports = config;
