(() => {
  //----------------------------------------------------
  // Initial values
  let email = localStorage.getItem("currentUser") || undefined;
  let isAdmin = localStorage.getItem("isAdmin") || false;
  // Navigation data
  // TODO: Update the navigation object with the correct sections
  // navigation = {
  //   home: { title: "Home", url: "Home", section: "Home" },
  //   game: { title: "Game", url: "Game", section: "Game" },
  //   highScore: {
  //     title: "High Score",
  //     url: "high-score",
  //     section: "high-score",
  //   },
  //   admin: { title: "Admin Page", url: "Admin/Users", section: "Manage Users" },
  //   record: {
  //     title: "Admin Page",
  //     url: "Admin/Content",
  //     section: "Manage Content",
  //   },
  //   register: {
  //     title: "Register Page",
  //     url: "Account/Register",
  //     section: "Register",
  //   },
  //   login: { title: "Login Page", url: "Account/Login", section: "Login" },
  // };
  // Navigation utility
  /*
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
	};*/
  //----------------------------------------------------
  // Utility functions
  const hide = (element) => (element.hidden = true);
  const show = (element) => (element.hidden = false);
  const authorize = (isAuthenticated, isAdmin) => {
    const authenticated = document.querySelectorAll("[data-authenticated]");
    const nonAuthenticated = document.querySelector("[data-nonAuthenticated]");
    const adminElement = document.querySelector("[data-admin]");
    if (!isAuthenticated) {
      authenticated.forEach((element) => hide(element));
      hide(adminElement);
      show(nonAuthenticated);
    } else {
      if (isAdmin) {
        authenticated.forEach((element) => hide(element));
        show(adminElement);
        show(document.querySelector("#button-signout"));
      } else {
        authenticated.forEach((element) => show(element));
        hide(adminElement);
      }
      hide(nonAuthenticated);
    }
    // if (isAuthenticated) {
    //   hide(nonAuthenticated);
    //   if (isAdmin) {
    //     authenticated.forEach((element) => hide(element));
    //     show(document.querySelector("[data-admin]"));
    //     show(document.querySelector("#button-signout"));
    //     return;
    //   }
    //   hide(document.querySelector("[data-admin]"));
    //   authenticated.forEach((element) => show(element));
    // } else {
    //   authenticated.forEach((element) => hide(element));
    //   hide(document.querySelector("[data-admin]"));
    //   show(nonAuthenticated);
    // }
  };
  const setActivePage = (section) => {
    console.log(section);
    let menuItems = document.querySelectorAll("a[data-page]");
    menuItems.forEach((menuItem) => {
      if (section === menuItem.textContent) menuItem.classList.add("active");
      else menuItem.classList.remove("active");
    });
  };
  const displaySection = (state) => {
    console.log(state);
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      let name = section.getAttribute("id");
      if (name === state.section) {
        document.title = state.title;
        show(section);
        setActivePage(name);
      } else hide(section);
    });
  };

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
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const getJSONData = async (url) => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //----------------------------------------------------
  // Client-side authentication
  const signup = async (e) => {
    e.preventDefault();
    email = document.querySelector('#Register input[name="email"]').value;
    let password = document.querySelector(
      '#Register input[name="password"]'
    ).value;
    let confirm = document.querySelector("#confirm").value;
    console.log(email, password, confirm);

    if (password && password === confirm) {
      const reply = await postData("/signup", { email, password });
      if (reply.error) {
        console.log(reply.error);
      } else if (reply.success) {
        console.log(reply);
        // Get the state from the server and render the appropriate section
        localStorage.setItem("currentUser", email);
        const state = reply.success.state;
        if (state === "admin") {
          isAdmin = true;
          localStorage.setItem("isAdmin", true);
        }
        authorize(true, isAdmin);
        selectNav(0);
        // displaySection(navigation[state]);
        // document.querySelector(
        //   "[data-authenticated] > span"
        // ).innerHTML = `Welcome ${email}!`;
        //
      }
    } else {
      console.log("Passwords do not match. Re-enter your password");
    }
  };
  const signin = async (e) => {
    e.preventDefault();
    email = document.querySelector('#Login-form input[name="email"]').value;
    console.log(email);
    let password = document.querySelector(
      '#Login-form input[name="password"]'
    ).value;
    const reply = await postData("/signin", { email, password });
    if (reply.error) {
      console.log(reply.error);
    } else if (reply.success) {
      console.log(reply);
      // Get the state from the server and render the appropriate section
      localStorage.setItem("currentUser", email);
      const state = reply.success.state;
      if (state === "admin") {
        isAdmin = true;
        localStorage.setItem("isAdmin", true);
      }
      authorize(true, isAdmin);
      selectNav(0);

      /*
        TODO: Display welcome message or jump to another page
      */
      // document.querySelector(
      //   "[data-authenticated] > span"
      // ).innerHTML = `Welcome ${email}!`;
    }
  };
  const signout = async (e) => {
    e.preventDefault();
    console.log(email);
    const reply = await postData("/signout", { email });
    if (reply.success) {
      console.log("inside signout");
      console.log(reply.success);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAdmin");
      email = undefined;
      isAdmin = false;
      authorize(false);
      selectNav(0);
      // Get the state from the server and render the appropriate section
      // const state = reply.success.state;
      // displaySection(navigation[state]);
    }
    console.log(reply);
  };

  //----------------------------------------------------
  // Admin page
  const userlist = async () => {
    console.log("inside admin");
    email = localStorage.getItem("currentUser");
    const reply = await getJSONData(`/admin/${email}`);
    // Get users data and render the table
    let users = reply.users;
    console.log(users);
    const table = document.querySelector("#users-list");
    table.innerHTML = "";
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");
    let headers = ["#", "Username", "Role", "Manage"];
    headers.forEach((header) => {
      let th = document.createElement("th");
      th.textContent = header;
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    users.forEach((user, index) => {
      let tr = document.createElement("tr");
      let tdIndex = document.createElement("td");
      tdIndex.textContent = index + 1;
      let tdUser = document.createElement("td");
      tdUser.textContent = user.email;
      let tdRole = document.createElement("td");
      tdRole.textContent = user.role;
      let tdManage = document.createElement("td");
      let button = document.createElement("button");
      button.textContent = "Delete";
      button.setAttribute("data-user", user.email);
      if (user.role === "admin") button.disabled = true;
      tdManage.appendChild(button);
      tr.appendChild(tdIndex);
      tr.appendChild(tdUser);
      tr.appendChild(tdRole);
      tr.appendChild(tdManage);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    document.querySelectorAll("[data-user]").forEach((button) => {
      button.addEventListener("click", () =>
        deleteUser(button.getAttribute("data-user"))
      );
    });
  };

  const admin = async () => {
    await userlist();
  };

  const deleteUser = async (user) => {
    let adminEmail = localStorage.getItem("currentUser");
    let userEmail = user;
    const reply = await postData("/admin/delete", { adminEmail, userEmail });
    console.log(reply);
    if (reply.success) {
      admin();
    } else {
      console.log(reply.error);
    }
  };

  //----------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    authorize(email, isAdmin);
    document.querySelector("#signup").onclick = signup;
    document.querySelector("#button-signout").onclick = signout;
    document.querySelector("#signin").onclick = signin;
    document.querySelector("#button-Admin").addEventListener("click", admin);
  });
})();
