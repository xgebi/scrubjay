/**
 * Main file with code necessary for SPA to work
 * 
 * version 0.0.1
 * author Sarah Gebauer
 */
var notLoggedIn = true;
var spa;

window.addEventListener("load", function() {
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
});