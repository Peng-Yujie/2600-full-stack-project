var Data =[
	{
		"name": "Home",
		"class":"row mb-3 justify-content-between",
		"Cards": [
			{
				"id": "Card-1",
				"header": "Node.JS",
				"class": "col-md-6 p-2",
				"body": "as an asynchronisos event-drivrn javaScript runtimenode.js is designed to build scalable networkapplications. This is in contrast to today's morecommon concurrency model, in which OS threads areemployed. thread-based networking is relativelyinefficent and very difficult to use. Futhermore usersof node.js are Free from worries of dead-locking theprocess, since there are no locks",
				"footer": "<figcaption class=\"mt-2 mb-0 blockquote-footer\">-node.js</figcaption>"
			},
			{
				"id": "Card-2",
				"header": "Web APIs",
				"class": "col-md-6 p-2",
				"body": "application Programming Interfaces (APIs) areconstructs made available in programming languagesto allow developers to create complex code awaymore easily. Thay abstract more complaex code awayfrom you, providing some easier syntax to use in its placeweb APIs are typically used with JavaScript althoughthis doesn't always have to be the case",
				"footer": "<figcaption class=\"mt-2 mb-0 blockquote-footer\">Mozilla Developer Network (MDN)</figcaption>"
			}
		],
		"Dropdowns": [
		]
	},
	{
		"name": "Game",
		"Cards": [
			{
				"id": "Card-3",
				"header": "Games",
				"class": "p-2 text-center",
				"body": "Select a Country",
				"footer": "<button id=\"button-DisplayUniversities\" class=\"btn btn-primary rounded m-2 type=submit\" onclick='makeTable(\"TableArea\")'>Show Universities</button> <div id=\"TableArea\" style=\"margin: auto;\"></div> "
			}
		],
		"Dropdowns": [

		]
	},
	{
		"name": "Setting",
		"Cards": [
			{
				"id": "Card-4",
				"header": "Plots",
				"class": "p-2 text-center",
				"body": "Select a multiple Country",
				"footer": "<button id=\"button-DisplayPlots\" class=\"btn btn-primary rounded m-2 type=submit\" onclick=\"createPloty()\">create Plots</button> <div id=\"Plotty\" style=\"width:600px;height:250px;margin: auto;\"></div>"
			}
		],
		"Dropdowns": [
			{
				"id": "Setting",
				"insideID": "Card-4-Card-Body",
				"List": ["easy", "medium", "hard", "custom"],
				"muti": false
			}
		]
	},
	{
		"name": "Login",
		"class":"row mb-3 justify-content-between",
		"Cards": [
			{
				"id": "Card-5",
				"header": "Register",
				"class": "col-md-6 p-2",
				"body": "<div id=\"Register\"><form><input type=\"email\" name=\"email\" placeholder=\"Email\" required /><br /><input type=\"password\" name=\"password\" placeholder=\"Password\" required /><br /><input type=\"password\" id=\"confirm\" placeholder=\"Confirm Password\" required /><br /><button id=\"signup\">Sign Up</button></form></div>",
			},
			{
				"id": "Card-6",
				"header": "Create acount",
				"class": "col-md-6 p-2",
				"body": "<div id=\"Login\"><form><input type=\"email\" name=\"email\" placeholder=\"Email\" required /><br /><input type=\"password\" name=\"password\" placeholder=\"Password\" required /><br /> <button id=\"signin\">Sign In</button></form></div>",
				"footer": "<button id=\"signout\">Sign Out</button>"
			}
		],
		"Dropdowns": [
		]
	}
]

