
let dsd = document.getElementById("dropdownMenuLinkdifficultySetting")
let Xvar = 5;
let Yvar = 4;
let difficulty = "medium"
dsd.innerHTML = difficulty
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
}