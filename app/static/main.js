/**
 * Main file with code necessary for SPA to work
 * 
 * version 0.0.1
 * author Sarah Gebauer
 */
var notLoggedIn = true;
var spa;

window.addEventListener("load", function() {
  let href = window.location.href.indexOf("#") > -1 ? window.location.href.substr(0, window.location.href.indexOf("#")) : window.location.href;
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
    let loginFormDiv = document.querySelector(".login-form div");
    while (loginFormDiv.firstChild) {
      loginFormDiv.removeChild(loginFormDiv.firstChild);
    }

    let loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("click", function(event) {
      event.preventDefault();
      
      let username = document.querySelector("#username").value;
      let password = document.querySelector("#password").value;
      let body = {
        username: username,
        password: password
      };

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

      fetch(href + "api/forgotten", {
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
    
    let usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for", "username");
    usernameLabel.textContent = "Username: ";

    let username = document.createElement("input");
    username.setAttribute("type", "text");
    username.setAttribute("id", "username");

    loginFormDiv.appendChild(usernameLabel);
    loginFormDiv.appendChild(username);

    let displayNameLabel = document.createElement("label");
    displayNameLabel.setAttribute("for", "display-name");
    displayNameLabel.textContent = "Display Name: ";

    let displayName = document.createElement("input");
    displayName.setAttribute("type", "text");
    displayName.setAttribute("id", "display-name");

    loginFormDiv.appendChild(displayNameLabel);
    loginFormDiv.appendChild(displayName);

    let passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "password");
    passwordLabel.textContent = "Password";

    let password = document.createElement("input");
    password.setAttribute("type", "password");
    password.setAttribute("id", "password");

    loginFormDiv.appendChild(passwordLabel);
    loginFormDiv.appendChild(password);

    let emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.textContent = "Email: ";

    let email = document.createElement("input");
    email.setAttribute("type", "email");
    email.setAttribute("id", "email");

    loginFormDiv.appendChild(emailLabel);
    loginFormDiv.appendChild(email);

    let registerButton = document.createElement("button");
    registerButton.textContent = "Register";
    registerButton.addEventListener("click", function(event) {
      let requestBody = {
        username: username.value,
        password: password.value,
        email: email.value,
        displayName: displayName.value
      };
      
      fetch(href + "api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(requestBody)
      }).then(result => {
        history.pushState({}, "Login", "#login");
      });
      
    });
    loginFormDiv.appendChild(registerButton);

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