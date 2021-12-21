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
    this.content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
