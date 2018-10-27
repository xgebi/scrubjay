/**
 * Main file with code necessary for SPA to work
 * 
 * version 0.0.1
 * author Sarah Gebauer
 */
var notLoggedIn = true;
var spa;

window.addEventListener("load", function() {
  window.addEventListener("popstate", routing);
  routing();

  function routing() {
    if (!notLoggedIn) {
      switch (window.location.hash) {
        case "#settings":
          settingsScreen();
          break;

        default: errorScreen();
      }
    } else {
      switch (window.location.hash) {
        case "#register":
          registerScreen();
          break;
        case "#forgotten":
          forgottenScreen();
          break;
        case "#password-reset":
          break;
        default: loginScreen();        
      }
    }
  }

  spa = document.querySelector("#spa");
  function loginScreen() {
    let loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("click", function(event) {
      event.preventDefault();
      
      let username = document.querySelector("#username").value;
      let password = document.querySelector("#password").value;
      let body = {
        username: username,
        password: password
      };
      let href = window.location.href.substr(0, window.location.href.indexOf("#"));
      fetch(href + "api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body)
      }).then((result) => {
        console.log(result);
      });
    });
  }

  function forgottenScreen() {
    let loginFormDiv = document.querySelector(".login-form div");
    while (loginFormDiv.firstChild) {
      loginFormDiv.removeChild(loginFormDiv.firstChild);
    }
    let forgottenMessage = document.createElement("p");
    forgottenMessage.setAttribute("class", "login-message");
    forgottenMessage.textContent = "Please, enter your email which you used during registration";

    let registrationEmail = document.createElement("input");
    registrationEmail.setAttribute("type", "email");
    registrationEmail.setAttribute("id", "registration-email");

    let forgottenButton = document.createElement("button");
    forgottenButton.textContent = "Reset password";
    forgottenButton.addEventListener('click', function() {
      let href = window.location.href.substr(0, window.location.href.indexOf('#'));
      
      fetch(href + "api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
      }).then(result => {
        console.log(result);
      });
    });

    loginFormDiv.appendChild(forgottenMessage);
    loginFormDiv.appendChild(registrationEmail);
    loginFormDiv.appendChild(forgottenButton);
  }

  function registerScreen() {
    let loginFormDiv = document.querySelector(".login-form div");
    while (loginFormDiv.firstChild) {
      loginFormDiv.removeChild(loginFormDiv.firstChild);
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