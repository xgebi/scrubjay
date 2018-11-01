/**
 * Main file with code necessary for SPA to work
 * 
 * version 0.0.1
 * author Sarah Gebauer
 */
var notLoggedIn = true;
var spa;

window.addEventListener("load", function() {
  let spa = document.querySelector("#spa");
  let href = window.location.href.indexOf("#") > -1 ? window.location.href.substr(0, window.location.href.indexOf("#")) : window.location.href;
  window.addEventListener("hashchange", routing);
  routing();

  function routing() {
    if (!notLoggedIn) {
      if (window.location.hash.startsWith("#dashboard")) {
        dashboardScreen();
      } else if (window.location.hash.startsWith("#settings")) {
        settingsScreen();
      }  else if (window.location.hash.startsWith("#dataset")) {
        datasetScreen();
      } else if (window.location.hash.startsWith("#datapoint")) {
        datapointScreen();
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
        case "#login":
          loginScreen();
          break;
        default: window.location.hash = "#login";
      }
    }
  }

  spa = document.querySelector("#spa");
  function loginScreen() {
    cleanSpa(spa);

    let form = document.createElement("form");
    form.classList.add("login-form");
    let div = document.createElement("div");

    let headline = document.createElement("h1");
    headline.textContent = "Scrubjay";
    div.appendChild(headline);

    let loginMessage = document.createElement("p");
    loginMessage.classList.add("login-message");
    div.appendChild(loginMessage);

    let errorMessage = document.createElement("p");
    errorMessage.classList.add("login-error-message");
    div.appendChild(errorMessage);

    let usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for", "username");
    usernameLabel.textContent = "Username:";
    div.appendChild(usernameLabel);

    let username = document.createElement("input");
    username.setAttribute("id", "username");
    username.setAttribute("type", "text");
    div.appendChild(username);

    let passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "password");
    passwordLabel.textContent = "Password:";
    div.appendChild(passwordLabel);

    let password = document.createElement("input");
    password.setAttribute("id", "password");
    password.setAttribute("type", "password");
    div.appendChild(password);

    let loginButton = document.createElement("button");
    loginButton.setAttribute("id", "login-button");
    loginButton.textContent = "Login";
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
        if (result.status >= 200 && result.status < 300) {
          notLoggedIn = false;
          window.location.href = href + "#dashboard";
        }
        if (result.status === 401) {
          notLoggedIn = true;
          let form = document.querySelector("form");
          form.classList.add("login-error");
          errorMessage.textContent = "Invalid credentials";
        }       
      });
    });
    div.appendChild(loginButton);

    let forgottenPassword = document.createElement("a");
    forgottenPassword.href = "#forgotten";
    forgottenPassword.textContent = "Password reminder";
    div.appendChild(forgottenPassword);
    
    if (registrationAllowed || null) {
      let registerLink = document.createElement("a");
      registerLink.href = "#register";
      registerLink.textContent = "register";
      div.appendChild(registerLink);
    }
    form.appendChild(div);
    spa.appendChild(form);
  }

  function forgottenScreen() {
    cleanSpa(spa);

    let form = document.createElement("form");
    form.classList.add("login-form");
    let div = document.createElement("div");

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

    div.appendChild(forgottenMessage);
    div.appendChild(registrationEmail);
    div.appendChild(forgottenButton);
    form.appendChild(div);
    spa.appendChild(form);
  }

  function registerScreen() {
    cleanSpa(spa);

    let form = document.createElement("form");
    form.classList.add("login-form");
    let div = document.createElement("div");
    
    let usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for", "username");
    usernameLabel.textContent = "Username: ";

    let username = document.createElement("input");
    username.setAttribute("type", "text");
    username.setAttribute("id", "username");

    div.appendChild(usernameLabel);
    div.appendChild(username);

    let displayNameLabel = document.createElement("label");
    displayNameLabel.setAttribute("for", "display-name");
    displayNameLabel.textContent = "Display Name: ";

    let displayName = document.createElement("input");
    displayName.setAttribute("type", "text");
    displayName.setAttribute("id", "display-name");

    div.appendChild(displayNameLabel);
    div.appendChild(displayName);

    let passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "password");
    passwordLabel.textContent = "Password";

    let password = document.createElement("input");
    password.setAttribute("type", "password");
    password.setAttribute("id", "password");

    div.appendChild(passwordLabel);
    div.appendChild(password);

    let emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.textContent = "Email: ";

    let email = document.createElement("input");
    email.setAttribute("type", "email");
    email.setAttribute("id", "email");

    div.appendChild(emailLabel);
    div.appendChild(email);

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
        createAdminUser = false;
        window.location.href = href + "#login";      
      });
      
    });
    div.appendChild(registerButton);

    form.appendChild(div);
    spa.appendChild(form);
  }

  function dashboardScreen() {
    cleanSpa(spa);
  }

  function settingsScreen() {

  }

  function errorScreen() {
    let main = document.querySelector("main");
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }

  function cleanSpa(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
});