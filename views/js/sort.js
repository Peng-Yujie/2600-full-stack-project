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
	
