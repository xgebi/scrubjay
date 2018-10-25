/**
 * Main file with code necessary for SPA to work
 * 
 * version 0.0.1
 * author Sarah Gebauer
 */

var notLoggedIn = true;
var spa = document.querySelector("#spa");

if (!notLoggedIn) {
  let loginButton = spa.querySelector("#login-button");
  loginButton.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(window.location.href);
    //fetch(window.location.href + );
  });
}