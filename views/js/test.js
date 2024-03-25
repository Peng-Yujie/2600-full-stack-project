// This file is used to test the connection between the server and the database

(() => {
  const getJsonData = async (url) => {
    try {
      console.info("getJsonData", url);
      const response = await fetch(url);
      console.info(response);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  // test if i can insert data into the database
  const insertData = async () => {
    const response = await fetch("/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: "Security",
        message: "AAA is a key concept in security",
        by: "Pentester",
      }),
    });
    const data = await response.json();
    console.info(data);
  };
  window.onload = () => {
    document.querySelector("#insert").addEventListener("click", insertData);
  };
})();
