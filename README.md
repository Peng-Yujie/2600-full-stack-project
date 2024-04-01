# CPSC2600 Full Stack Web Development Project

This is a full stack web development project for CPSC2600, authored by [Mitchell]() and [Yujie](). The project is an online memory matching game, built using HTML, CSS, JavaScript, and Node.js.

## Overview

The game is a simple memory matching game where the player is presented with cards in a grid. The player's goal is to find all the matching pairs of cards. This game provides different levels of difficulty, including easy, medium, and hard. Hope you enjoy it!

## Tech Stack

- HTML/CSS
- JavaScript
- Node.js
- Bootstrap
- MongoDB

## Main Features

- User Registration and Authentication:
  - Create new accounts, Login and Logout
  - Password-based authentication
- Game Logic:
  - Reusable
  - Game timer and counter
  - Game difficulty levels
- Art:
  - Animation
  - Cards front (from API)
  - Cards back
- Rankings:
  - Recorded high scores
  - Displays top 10
  - Dynamic rankings
- Admin Management:
  - Manage user accounts
- Database Utilization:
  - Implementation of MongoDB for data storage

## Structure

```

2600-full-stack-project/
├── controllers/ # Contains controller files
│ ├── authController.js
│ ├── homeController.js
│ ├── memberController.js
├── models/ # Contains model files
│ ├── config/
│ │ ├── config.js
│ ├── post.js
│ ├── util.js
├── server/
│ ├── config/
│ │ ├── config.js
│ ├── modules.js
│ ├── server.js
├── views/
│ ├── css/
│ ├── img/
│ ├── js/
│ ├── index.html

```

## Installation

1. Clone the repository

```bash
git clone https://github.com/Peng-Yujie/2600-full-stack-project.git
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## References
