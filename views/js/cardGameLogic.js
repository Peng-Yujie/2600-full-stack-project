var timeLimit = 180000;
var timeLeft = 0;
let objs = [];
let needToMatch = 2;
let AnimashonTime = 500;
var cards;
var cardsCliked;
let Flipt = [];
let NumberofMatches = 0;
let NumberofMatchesNeed = 0;
// Get the current user from localStorage
let currentUser = localStorage.getItem("currentUser") || undefined;

//----------------------------------------------------
// Fetch utility
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-User-Email": currentUser, // Add the email to the headers for server-side authentication
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
};

function makeTable(id) {
  NumberofMatches = 0;
  let xSize = Xvar;
  let ySize = Yvar;
  let out = '<table style="margin: 0 auto;" >';
  let ix = 0;
  let iy = 0;
  while (iy < ySize) {
    out += "<tr>";
    while (ix < xSize) {
      out +=
        '<td class="text-center"><img src="images/cards.png" id=' +
        ix +
        "-" +
        iy +
        ' class="bg-light rounded" style="height:150px; width:100px; margin: 0 auto;background-size: " onclick="clickCard(' +
        ix +
        "," +
        iy +
        ');"alt="CardBack"></div></td>';
      ix++;
    }
    out += "</tr>";
    ix = 0;
    iy++;
  }
  out += "</table>";
  document.getElementById(id).innerHTML = out;
  makerandom(xSize, ySize);
}
function StartTimer() {
  Timer = document.getElementById("Timer");
  timeLeft = timeLimit;
}
function makerandom(xSize, ySize) {
  cards = [...Array(xSize)].map((e) => Array(ySize).fill(0));
  cardsCliked = [...Array(xSize)].map((e) => Array(ySize).fill(false));
  NumberofMatchesNeed = xSize * ySize - ((xSize * ySize) % needToMatch);
  //console.log(cards);
  //console.log(NumberofMatchesNeed);
  let nums = NumberofMatchesNeed / needToMatch;
  //console.log(nums);
  let i = 0;
  while (i < nums + 1) {
    let i2 = 0;
    while (i2 < needToMatch) {
      let x = Math.floor(Math.random() * xSize);
      let y = Math.floor(Math.random() * ySize);
      if (cards[x][y] != 0) {
        continue;
      } else {
        cards[x][y] = i;
      }
      i2++;
    }
    i++;
  }
  //console.log(cards);
  StartTimer();
}
function clickCard(Xpos, Ypos) {
  if (objs.length + Flipt.length < needToMatch) {
    CardFlip(Xpos, Ypos);
    cardsCliked[Xpos][Ypos] = true;
  }
}
function CardFlip(Xpos, Ypos) {
  if (!cardsCliked[Xpos][Ypos]) {
    let object = document.getElementById(Xpos + "-" + Ypos);

    let Same = false;
    if (objs.length + Flipt.length < needToMatch) {
      objs.forEach((obj) => {
        if (obj.X == Xpos && obj.Y == Ypos) {
          Same = true;
        }
      });
    } else {
      Same = true;
    }
    if (!Same) {
      objs.push({
        ob: object,
        X: Xpos,
        Y: Ypos,
        time: 0,
        side: false,
        half: false,
      });
    }
    console.log("X: " + Xpos + " Y: " + Ypos);
  }
}
var lastUpdate = Date.now();
var myInterval = setInterval(tick, 0);
var dt;

function thesame(obj) {
  Flipt.push(obj);
  if (Flipt.length >= needToMatch) {
    let a = cards[Flipt[0].X][Flipt[0].Y];
    let match = true;

    Flipt.forEach((card) => {
      //console.log(cards[card.X][card.Y]);
      if (a != cards[card.X][card.Y]) {
        match = false;
      }
    });
    if (match) {
      //console.log("same")
      Flipt.forEach((card) => {
        let temp = document.getElementById(card.X + "-" + card.Y);
        //console.log(card)
        temp.onclick = "";
        temp.className = "bg-success rounded";
        NumberofMatches++;
        Score();
      });
    } else {
      //console.log("test");
      Flipt.forEach((card) => {
        cardsCliked[card.X][card.Y] = false;
        setTimeout(() => CardFlip(card.X, card.Y), 250);
      });
    }
    Flipt = [];
  }
}

const Score = async () => {
  console.log(NumberofMatchesNeed + "<=" + NumberofMatches);
  console.log(NumberofMatchesNeed <= NumberofMatches);
  console.log(NumberofMatchesNeed + "==" + NumberofMatches);
  console.log(NumberofMatchesNeed <= NumberofMatches);
  if (NumberofMatchesNeed <= NumberofMatches) {
    let out = { name: currentUser, time: timeLimit, difficulty: difficulty };
    // post the score to the server
    // you can edit the passing message to the server
    const reply = await postData("/score", out);
    if (reply.error) {
      console.log(reply.error);
    } else if (reply.success) {
      console.log(reply);
    }
    console.log(out);
  }
};

function tick() {
  var now = Date.now();
  dt = now - lastUpdate;
  lastUpdate = now;
  let i = 0;

  if (timeLeft > 0) {
    size = objs.length;
    while (i < size) {
      objs[i].time += dt / AnimashonTime;
      objs[i].ob.style.width =
        100 * (1 - Math.sin(Math.PI * objs[i].time)) + "px";
      if (objs[i].time > 1) {
        if (objs[i].ob.alt != "CardBack") {
          thesame(objs[i]);
        }
        objs[i].width = 100 + "px";
        objs.splice(i, 1);
      } else if (objs[i].time > 0.5 && !objs[i].half) {
        objs[i].side = !objs[i].side;
        objs[i].half = true;
        //console.log(objs[i].ob.src)
        if (objs[i].ob.alt == "CardBack") {
          objs[i].ob.src = "";
          objs[i].ob.alt = "" + cards[objs[i].X][objs[i].Y];
        } else {
          objs[i].ob.src = "images/cards.png";
          objs[i].ob.alt = "CardBack";
        }
      }
      i++;
    }
    let Ns = timeLeft;
    let s = Math.floor(timeLeft / 1000);
    let m = Math.floor(s / 60);
    Timer.innerHTML = (m % 60) + ":" + (s % 60) + ":" + (Ns % 1000);
    timeLeft -= dt;
  }
}
