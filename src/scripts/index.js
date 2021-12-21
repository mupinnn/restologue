import "regenerator-runtime"; /* for async await transpile */
import "boxicons";
import "~/styles/main.scss";
import App from "~/views/app";

const footerYear = document.getElementById("year");
const main = document.getElementById("main");
const drawer = document.querySelector(".navbar-menu");
const toggleDrawerButton = document.querySelector(".navbar-toggle");

const app = new App({
  content: main,
  drawer,
  toggleDrawerButton,
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
  footerYear.innerText = new Date().getFullYear();

  app.renderPage();
});

// Enable HMR for all JS file
if (module.hot) {
  module.hot.accept();
}
