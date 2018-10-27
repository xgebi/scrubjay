/**
 * Main file with code necessary for SPA to work
 * 
 * version 0.0.1
 * author Sarah Gebauer
 */
var notLoggedIn = true;
var spa;

window.addEventListener("load", function() {
  window.addEventListener("popstate", function (event) {
    if (!notLoggedIn) {
      switch(event.target.location.hash) {
        case "#settings":
          settingsScreen();
          break;

        default: errorScreen();
      }
    } else {
      switch(event.target.location.href) {
        case "#register":
          registerScreen();
          break;
        case "forgotten":
          forgottenScreen();
          break;
      }
    }
  });

  spa = document.querySelector("#spa");
  if (notLoggedIn) {
    let loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("click", function(event) {
      event.preventDefault();
      debugger;
      let username = document.querySelector("#username").value;
      let password = document.querySelector("#password").value;
      let body = {
        username: username,
        password: password
      };
      console.log(window.location.href + "login");
      fetch(window.location.href + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body)
      });
    });
  }

  function forgottenScreen() {
    while (spa.firstChild) {
      spa.removeChild(spa.firstChild);
    }
  }

  function registerScreen() {
    while (spa.firstChild) {
      spa.removeChild(spa.firstChild);
    }
  }

  function settingsScreen() {

  }

  function errorScreen() {
    let main = document.querySelector("main");
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }
});