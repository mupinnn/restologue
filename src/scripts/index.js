import "regenerator-runtime"; /* for async await transpile */
import "boxicons";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "~/styles/main.scss";

// Import component here to access from anywhere without import
import "~/views/components/wc-hero";
import "~/views/components/wc-rating";
import "~/views/components/wc-network-indicator";

import App from "~/views/app";
import swRegister from "./utils/sw-register";

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
  swRegister();
});

// Enable HMR for all JS file
if (module.hot) {
  module.hot.accept();
}
