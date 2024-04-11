const config = {};
config.PORT = process.env.PORT || 3000;
config.ROOT = "views";
config.LOG_FILE = "server/log/node.js.log";
config.ADMIN = "admin@localhost";
config.ADMIN_PASSWORD = "admin";
config.NAVIGATION = {
  home: { title: "Home", url: "Home", section: "Home" },
  game: { title: "Game", url: "About", section: "About" },
  highScore: {
    title: "High Score",
    url: "high-score",
    section: "high-score",
  },
  users: { title: "Admin Page", url: "Admin/Users", section: "Manage Users" },
  record: {
    title: "Admin Page",
    url: "Admin/Content",
    section: "Manage Content",
  },
  register: {
    title: "Register Page",
    url: "Account/Register",
    section: "Register",
  },
  login: { title: "Login Page", url: "Account/Login", section: "Login" },
};

module.exports = config;
