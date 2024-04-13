var Data = [
  {
    name: "Home",
    authenticated: 0,
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
    authenticated: 1,
    Cards: [
      {
        id: "Card-2",
        header:
          'Game<div class="h6">Time: <code id="Timer" class="highlighter-rouge">0:00:0000</code></div>',
        class: "p-2 text-center",
        body: "the Game Feald",
        footer:
          '<button id="button-makeTable" class="btn btn-primary rounded m-2 type=submit" onclick=\'makeTable("Card-2-Card-Body",Xvar,Yvar)\'>Start Game</button> <div id="TableArea" style="margin: auto;"></div> ',
      },
    ],
    Dropdowns: [],
  },
  {
    name: "High-Score",
    authenticated: 1,
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
    authenticated: 1,
    Cards: [
      {
        id: "Card-5",
        header: "Setting",
        class: "p-2 text-center",
        body: '<table style="width:100%" ><tr><td class="text-center" '+
        'id="Card-5-Settings-d">Select difficulty</td><td><p id="X-Range-Title">X size: 5</p><input id="X-Range-slider" type="range" min="1" max="10" value="5">'+
        '<p id="Y-Range-Title">Y size: 4</p><input id="Y-Range-slider" type="range" min="1" max="10" value="4"></td></tr></table>',
        footer: ''
      },
    ],
    Dropdowns: [
      {
        id: "difficultySetting",
        insideID: "Card-5-Settings-d",
        List: ["easy", "medium", "hard"],
        muti: false,
        functions:'document.getElementById("dropdownMenuLinkdifficultySetting").innerHTML=this.innerHTML;applySettings();'
      },
    ],
  },
  {
    name: "Login",
    authenticated: 2,
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
        header: "Login",
        class: "col-md-6 p-2",
        body: '<div id="Login-form"><form><input type="email" name="email" placeholder="Email" required /><br /><input type="password" name="password" placeholder="Password" required /><br /> <button id="signin">Sign In</button></form></div>',
        footer: "",
      },
    ],
    Dropdowns: [],
  },
  {
    name: "Admin",
    authenticated: 3,
    class: "row mb-3 justify-content-between",
    Cards: [
      {
        id: "Card-8",
        header: "Users",
        class: " p-2",
        // body: users list table
        body: '<table id="users-list" class="table table-striped table-secondary"></table>',
        footer: "",
      },
    ],
    Dropdowns: [],
  },
];
