
let dsd = document.getElementById("dropdownMenuLinkdifficultySetting")
let XRT = document.getElementById('X-Range-Title')
let YRT = document.getElementById('Y-Range-Title')
let XRS = document.getElementById('X-Range-slider')
let YRS = document.getElementById('Y-Range-slider')
let Xvar = 5;
let Yvar = 4;
let difficulty = "medium"
dsd.innerHTML = difficulty

XRS.addEventListener("input", function () {Xslider();},false);
YRS.addEventListener("input", function () {Yslider();},false);

function Xslider()
{
	
	Xvar = XRS.value 
	XRT.innerHTML = `X size: ${Xvar}`
	dsd.innerHTML = "custom"
}
function Yslider()
{
	Yvar = YRS.value 
	YRT.innerHTML = `Y size: ${Yvar}`
	dsd.innerHTML = "custom"
}


function applySettings()
{
	difficulty = dsd.innerHTML
	switch (difficulty) {
		case "easy":
			Xvar = 4;
			Yvar = 3;
			break;
		case "medium":
			Xvar = 5;
			Yvar = 4;
			break;
		case "hard":
			Xvar = 8;
			Yvar = 6;
			break;
		default:
	}
	XRT.innerHTML = `X size: ${Xvar}`
	YRT.innerHTML = `Y size: ${Yvar}`
	XRS.value = Xvar;
	YRS.value = Yvar;
}