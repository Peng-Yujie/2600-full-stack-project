var Data = [
  {
    name: "Home",
    class: " justify-content-between",
    Cards: [
      {
        id: "Card-1",
        header: "match Cards",
        class: " p-2",
        body: "in this game you will get points for matching cards together",
        footer: "",
      },
    ],
    Dropdowns: [],
  },
  {
    name: "Game",
    Cards: [
      {
        id: "Card-2",
        header:
          'Game<div class="h6">Time: <code id="Timer" class="highlighter-rouge">0:00:0000</code></div>',
        class: "p-2 text-center",
        body: "the Game Feald",
        footer:
          '<button id="button-makeTable" class="btn btn-primary rounded m-2 type=submit" onclick=\'makeTable("Card-2-Card-Body",5,4)\'>Start Game</button> <div id="TableArea" style="margin: auto;"></div> ',
      },
    ],
    Dropdowns: [],
  },
  {
    name: "High-Score",
    class: "row mb-3 justify-content-between",
    Cards: [
      {
        id: "Card-3",
        header: "top 10",
        class: "col-md-6 p-2 text-center",
        body: "the Game Feald",
        footer: "",
      },
      {
        id: "Card-4",
        header: "your top 10",
        class: "col-md-6 p-2 text-center",
        body: "the Game Feald",
        footer: "",
      },
    ],
    Dropdowns: [],
  },
  {
    name: "Setting",
    Cards: [
      {
        id: "Card-5",
        header: "Plots",
        class: "p-2 text-center",
        body: "Select difficulty",
        footer: "",
      },
    ],
    Dropdowns: [
      {
        id: "Setting",
        insideID: "Card-5-Card-Body",
        List: ["easy", "medium", "hard", "custom"],
        muti: false,
      },
    ],
  },
  {
    name: "Login",
    class: "row mb-3 justify-content-between",
    Cards: [
      {
        id: "Card-6",
        header: "Register",
        class: "col-md-6 p-2",
        body: '<div id="Register"><form><input type="email" name="email" placeholder="Email" required /><br /><input type="password" name="password" placeholder="Password" required /><br /><input type="password" id="confirm" placeholder="Confirm Password" required /><br /><button id="signup">Sign Up</button></form></div>',
      },
      {
        id: "Card-7",
        header: "Create acount",
        class: "col-md-6 p-2",
        body: '<div id="Login-form"><form><input type="email" name="email" placeholder="Email" required /><br /><input type="password" name="password" placeholder="Password" required /><br /> <button id="signin">Sign In</button></form></div>',
        footer: '<button id="signout">Sign Out</button>',
      },
    ],
    Dropdowns: [],
  },
];
