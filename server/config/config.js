const config = {};
config.PORT = process.env.PORT || 3000;
config.ROOT = "views";
config.LOG_FILE = "server/log/node.js.log";
config.ADMIN = "admin@localhost";
config.ADMIN_PASSWORD = "admin";
module.exports = config;
