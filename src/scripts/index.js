import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import "./home.js";

// Enable HMR for all JS file
if (module.hot) {
  module.hot.accept();
}
