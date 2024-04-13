(() => {
	const noticeDialog = document.getElementById("Terms-and-Conditions")
	document.getElementById("noticeButton").onclick = (event) => {
		event.preventDefault()
		if (document.getElementById("agree").checked)
			noticeDialog.hidden = "true"
	}
})();