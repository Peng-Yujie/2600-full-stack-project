(() => {
  //----------------------------------------------------
  // Initial values
  let email = undefined;

  //----------------------------------------------------
  // Utility functions
  const hide = (element) => (element.style.display = "none");
  const show = (element) => (element.style.display = "block");
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
  const authorize = (isAuthenticated) => {
    const authenticated = document.querySelectorAll("[data-authenticated]");
    const nonAuthenticated = document.querySelector("[data-nonAuthenticated]");
    if (isAuthenticated) {
      authenticated.forEach((element) => show(element));
      hide(nonAuthenticated);
    } else {
      authenticated.forEach((element) => hide(element));
      show(nonAuthenticated);
    }
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
        "X-User-Email": email, // Add the email to the headers for server-side authentication
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
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

    if (password == confirm) {
      const reply = await postData("/signup", { email, password });
      if (reply.error) {
        console.log(reply.error);
      } else if (reply.success) {
        console.log(reply);
        authorize(true);
        /*
          TODO: Display welcome message in proper location
        */
        // document.querySelector(
        //   "[data-authenticated] > span"
        // ).innerHTML = `Welcome ${email}!`;
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
      authorize(true);
      /*
        TODO: Display welcome message or jump to another page
      */
      document.querySelector(
        "[data-authenticated] > span"
      ).innerHTML = `Welcome ${email}!`;
    }
  };
  const signout = async (e) => {
    e.preventDefault();
    console.log(email);
    const reply = await postData("/signout", { email });
    if (reply.success) {
      console.log("inside signout");
      console.log(reply.success);
      authorize(false);
    }
    console.log(reply);
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#signup").onclick = signup;
    document.querySelector("#signout").onclick = signout;
    document.querySelector("#signin").onclick = signin;
  });
})();
