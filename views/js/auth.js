(() => {
  let email = undefined;

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
        console.log(reply, reply);
        document.querySelector(
          "[data-authenticated] > span"
        ).innerHTML = `Welcome ${email}!`;
      }
    } else {
      console.log("Passwords do not match. Re-enter your password");
    }
  };
  const signin = async (e) => {
    e.preventDefault();
    email = document.querySelector('#Login input[name="email"]').value;
    console.log(email);
    let password = document.querySelector(
      '#Login input[name="password"]'
    ).value;
    const reply = await postData("/signin", { email, password });
    if (reply.error) {
      console.log(reply.error);
    } else if (reply.success) {
      console.log(reply, reply);
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
      console.log(reply, reply);
    } else {
      console.log(reply);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#signup").onclick = signup;
    document.querySelector("#signout").onclick = signout;
    document.querySelector("#signin").onclick = signin;
  });
})();
