import "regenerator-runtime"; /* for async await transpile */
import "boxicons";
import "../styles/main.scss";
import "./home.js";

// Enable HMR for all JS file
if (module.hot) {
  module.hot.accept();
}

const navToggle = document.querySelector(".navbar-toggle");
const navMenu = document.querySelector(".navbar-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  if (navMenu.classList.contains("open")) {
    navToggle.textContent = "Close Menu";
  } else {
    navToggle.textContent = "Open Menu";
  }
});
