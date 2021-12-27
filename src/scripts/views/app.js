import URLParser from "~/routes/url-parser";
import routes from "~/routes/routes";
import DrawerHandler from "~/utils/drawer-handler";

class App {
  constructor({ content, toggleDrawerButton, drawer }) {
    this.content = content;
    this.drawer = drawer;
    this.toggleDrawerButton = toggleDrawerButton;

    this.initAppShell();
  }

  initAppShell() {
    DrawerHandler.init({
      drawer: this.drawer,
      toggleDrawerButton: this.toggleDrawerButton,
    });
  }

  async renderPage() {
    const url = URLParser.parseActiveURLWithCombiner();
    const page = routes[url];

    const skipLinkEL = document.querySelector(".skip-to-content");
    skipLinkEL.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("main").focus();
    });

    this.content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
