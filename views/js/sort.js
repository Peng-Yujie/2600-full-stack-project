/*
	let CountriesNames = [];
	let i1 = 0;
	while(i1 < UniversitiesNames.length)
	{
		CountriesNames.push(UniversitiesNames[i1]["country"])
		i1++
	}
	console.log("Done");
	i1 = 0
	CountriesNames.sort();
	let out = '['
	let CountriesNamesdone = [CountriesNames[0]];
	while(i1 < UniversitiesNames.length)
	{
		if (CountriesNamesdone[CountriesNamesdone.length-1] != CountriesNames[i1])
		{
			CountriesNamesdone.push(CountriesNames[i1])
			out += '"'+CountriesNames[i1] + '",'
		}
		i1++
	}
	out += ']'
	*/

(() => {
  // Show high scores
  const getJSONData = async (url) => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getHighScores = async () => {
    try {
      // Fetch high scores
      const userEmail = localStorage.getItem("currentUser");
      let data = await getJSONData(`/highscores/${userEmail}`);
      let topScores = data.topScores;
      let userTopScores = data.userTopScores;
      console.log(topScores, userTopScores);
      // Create two tables
      let topTable = document.createElement("table");
      let userTable = document.createElement("table");

      const createTable = (table, scores) => {
        table.className = "table table-striped table-secondary";
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        // Add headers to the table
        let headers = ["Rank", "User", "Score", "Difficulty"];
        let tr = document.createElement("tr");
        headers.forEach((header) => {
          let th = document.createElement("th");
          th.textContent = header;
          tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);

        // Add data to the table
        scores.forEach((score, index) => {
          let tr = document.createElement("tr");
          let tdRank = document.createElement("td");
          tdRank.textContent = index + 1;
          let tdUser = document.createElement("td");
          tdUser.textContent = score.User;
          let tdScore = document.createElement("td");
          tdScore.textContent = score.Time;
          let tdDifficulty = document.createElement("td");
          tdDifficulty.textContent = score.Difficulty;
          tr.appendChild(tdRank);
          tr.appendChild(tdUser);
          tr.appendChild(tdScore);
          tr.appendChild(tdDifficulty);
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
      };

      // Create tables
      createTable(topTable, topScores);
      createTable(userTable, userTopScores);

      // Append tables to the body or other container
      document.querySelector("#Card-3-Card-Body").innerHTML = "";
      document.querySelector("#Card-3-Card-Body").appendChild(topTable);
      document.querySelector("#Card-4-Card-Body").innerHTML = "";
      document.querySelector("#Card-4-Card-Body").appendChild(userTable);
    } catch (error) {
      console.error(error);
    }
  };

  // Show high scores
  document.querySelector("#button-High-Score").addEventListener("click", () => {
    console.log("Button clicked");
    getHighScores();
  });
})();
