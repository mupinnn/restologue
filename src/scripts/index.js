import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";

console.log("Hello :)");

// Enable HMR for all JS file
if (module.hot) {
  module.hot.accept();
}
