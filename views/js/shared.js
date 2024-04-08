/**
 *
 */

const getJSONData = async (url, functionIN) => {
  if (url != "") {
    let b = window
      .fetch(url)
      .then((response) => response.json())
      .then((data) => {
        info = data;
        console.log(data);
        functionIN(data);
      })
      .catch((error) => console.log(error));
  } else {
    alert("no city and country selected");
  }
};

let now = new Date();
class HtmlObjects {
  constructor(mainBodyIn) {
    /** @type {HTMLElement} - the image as the HTMLElement */
    this.mainBody = mainBodyIn;
  }
  makeRGBText(text, R, G, B) {
    let out = '<b style="color: rgb(' + R + "," + G + "," + B + ');">';
    out += text;
    object1 = out += "</b>";
    return out;
  }
  makeButton(name, classes, type, call) {
    let out = "<" + type + " ";
    out += 'id="button-' + name.replace(/\s/g, "");
    out += '" class="btn ';
    out += classes;
    out += ' m-2 type=submit"';
    if (type == "a") {
      out += 'href="';
    } else if ("button") {
      out += 'onclick="';
    }
    out += call;
    out += '">';
    out += name;
    out += "</" + type + ">";
    return out;
  }
  cards(id, title, text, classes, foot = "") {
    let card = document.getElementById(id);
    let out =
      '<div class="card p-0"><div class="card-header card-title bg-info h2 text-center">';
    out += title;
    out +=
      '</div><div id="' +
      id +
      '-Card-Body" class="card-body bg-secondary rounded-bottom"><p class="card-text h4">';
    out += text;
    out += "</div>";
    if (foot != "") {
      out +=
        '<div id="' +
        id +
        '-Card-footer" class="card-footer"><p class="card-text text-muted h4">';
      out += foot;
      out += "</div>";
    }
    out += "</div>";
    card.innerHTML = out;
    card.className += classes;
  }
  makeDropdown(name, inputs, ifmultiple, inID) {
    let out = '<div class="dropdown">';
    out +=
      '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuLink' +
      name +
      '" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
    out += name;
    out += "</button>";
    let i2 = 0;
    if (ifmultiple) {
      out +=
        '<select  id="multiple' +
        name +
        '" class="dropdown-menu" aria-labelledby="dropdownMenuLink' +
        name +
        '" multiple style="max-height: 280px; overflow-x: hidden;">';

      console.log(inputs);
      while (i2 < inputs.length) {
        out +=
          '<option value="' +
          inputs[i2] +
          '"><a class="dropdown-item" href="#"';
        out += ">" + inputs[i2] + "</a></option> ";
        i2++;
      }
      out += "</select>";
    } else {
      out +=
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenuLink' +
        name +
        '" style="max-height: 280px; overflow-x: hidden;">';
      while (i2 < inputs.length) {
        out +=
          '<li><a class="dropdown-item"  onclick=\'document.getElementById("dropdownMenuLink' +
          name +
          '").innerHTML="' +
          inputs[i2] +
          '"\' href="#"';
        out += ">" + inputs[i2] + "</a></li> ";
        i2++;
      }
      out += "</ul>";
    }
    out += "</div>";
    return out;
  }
  makeDiv(id, Class = "") {
    return '<div id="' + id + '" class="' + Class + '"></div>';
  }
  makenav(id, buttons, webOn) {
    const buttonsHtml = buttons
      .map(([name, call], i) => {
        const inClass = i === webOn ? "btn-dark" : "btn-primary";
        return `<li class="nav-item">${this.makeButton(
          name,
          inClass,
          "button",
          call
        )}</li>`;
      })
      .join("");
    const out = `
			<a class="navbar-brand d-flex align-items-center" href="#">
				<h2 class="m-0"><span class="p-1">🃏</span>Memory Game</h2>
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav mr-auto">
					${buttonsHtml}
				</ul>
			</div>`;
    //document.getElementById('button-'+webOn.replace(/\s/g, '')).className = "btn btn-dark type=submit";
    document.getElementById(id).innerHTML = out;
  }
  makeFooter(id) {
    let foot = document.getElementById(id);
    foot.className = "d-flex justify-content-center";
    let out = `<p class="bg-light text-dark rounded p-1 d-inline-flex" >&#169; ${now.getFullYear()} mitchell pokrandt. & yujie peng. all rights reserverd.</p>`;
    foot.innerHTML = out;
  }
  makeLines(idClass) {
    const collection = document.getElementsByClassName(idClass);
    console.log(collection);
    for (let i = 0; i < collection.length; i++) {
      collection[i].className = idClass + " hr hr-blurry bg-light";
    }
  }
  makeHeader(id, title) {
    let out = '<link id="Styles" rel="stylesheet" href="css/united.min.css">';
    out +=
      '<script type="text/javascript" src="js/bootstrap.bundle.js"></script>';
    out += '<meta charset="UTF-8">';
    out += "<title>" + title + "</title>";
    out +=
      '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🃏</text></svg>"/>';
    out +=
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">';
    out += '<script type="text/javascript" src="js/HTML.js"></script>';
    out +=
      '<link rel="shortcut icon" href="img/question.png" type="image/x-icon">';
    document.getElementById(id).innerHTML = out;
  }
  makeColorSelecter(id, name, classes, min, max) {
    let out = '<div class="' + classes + '">';
    out += '<div class="h4">' + name + "</div>";
    out += '<select id="Number-' + name + '" class="form-control">';
    out += "<option selected>" + min + "</option>";
    let i = min + 1;
    while (i < max) {
      out += "<option>" + i++ + "</option>";
    }
    out += "</select>";
    out += "</div>";
    document.getElementById(id).innerHTML += out;
  }
}
function numToHex(num) {
  let out = num.toString(16);
  if (out.length == 1) {
    out = "0" + out;
  }
  return out;
}
/**
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 */
function rgbHex(r, g, b) {
  return "#" + numToHex(r) + numToHex(g) + numToHex(b);
}
let Html = new HtmlObjects(document.getElementById("mainBody"));
const setStyle = (style) => {
  document.getElementById("Styles").href = "css/" + style;
};
const setFavoriteIcon = () => {
  // your code goes here
};
const setnav = () => {};
const setHeader = () => {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  Html.makeHeader("head", page);
};
const setFooter = () => {
  Html.makeFooter("foot");
};
const setCopyrightYear = () => {
  // your code goes here
};
const setLinkActive = () => {
  Data[i]["name"];
  // your code goes here
};
const CreatePages = (inData) => {
  let out = "";
  let i = 0;
  while (i < inData.length) {
    out += Html.makeDiv(inData[i]["name"], inData[i]["class"]);
    i++;
  }
  i = 0;
  Html.mainBody.innerHTML = out;
  while (i < inData.length) {
    let temp = document.getElementById(inData[i]["name"]);
    let i1 = 0;
    temp.innerHTML = "";
    while (i1 < inData[i]["Cards"].length) {
      temp.innerHTML += Html.makeDiv(inData[i]["Cards"][i1]["id"]);
      Html.cards(
        inData[i]["Cards"][i1]["id"],
        inData[i]["Cards"][i1]["header"],
        inData[i]["Cards"][i1]["body"],
        inData[i]["Cards"][i1]["class"],
        inData[i]["Cards"][i1]["footer"]
      );
      i1++;
    }
    i1 = 0;

    while (i1 < inData[i]["Dropdowns"].length) {
      document.getElementById(
        inData[i]["Dropdowns"][i1]["insideID"]
      ).innerHTML += Html.makeDropdown(
        inData[i]["Dropdowns"][i1]["id"],
        inData[i]["Dropdowns"][i1]["List"],
        inData[i]["Dropdowns"][i1]["muti"]
      );
      i1++;
    }
    i++;
  }
};

const selectNav = (id) => {
  let i = 0;
  while (i < Data.length) {
    if (i == id) {
      document.getElementById(Data[i]["name"]).hidden = false;
      document.getElementById("button-" + Data[i]["name"]).className =
        "btn btn-dark  hr hr-blurry m-2 type=submit";
    } else {
      document.getElementById(Data[i]["name"]).hidden = true;
      document.getElementById("button-" + Data[i]["name"]).className =
        "btn btn-primary  hr hr-blurry m-2 type=submit";
    }
    i++;
  }
  i = 0;
};
let buttons;
const makeNav = (inData) => {
  buttons = [];
  let i = 0;
  while (i < Data.length) {
    buttons.push([inData[i]["name"], "selectNav(" + i + ")"]);
    i++;
  }
  Html.makenav("topNav", buttons, 0);
};

const SetData = (inData) => {
  Data = inData;
  CreatePages(inData);
  makeNav(inData);
  selectNav(0);
};
const SetUniversities = (inData) => {
  UniversitiesNames = inData;
};

setFooter();
setHeader();
setStyle("quartz.min.css");
SetData(Data);
SetUniversities(UniversitiesNames);
//getJSONData("data/WebPageData.json", SetData);
//getJSONData("data/all-universities.json", SetUniversities);
//getJSONData("data/ISO-3166-Countries-names.json",setNames );
