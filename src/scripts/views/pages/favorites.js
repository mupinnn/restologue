import {
  createRestoItemTemplate,
  createLoadingTemplate,
  createErrorTemplate,
} from "~/views/templates/template-creator";
import FavRestoIdb from "~/data/favresto-idb";

const Favorites = {
  async render() {
    return `
      <section class="container main-section">
        <h2>Your Favorite Restos</h2>

        <div class="request-status"></div>

        <article class="resto-list"></article>
      </section>
    `;
  },

  async afterRender() {
    const restosContainer = document.querySelector(".resto-list");
    const reqStatusContainer = document.querySelector(".request-status");
    reqStatusContainer.innerHTML = createLoadingTemplate();

    try {
      const restos = await FavRestoIdb.getAllResto();

      if (restos.length === 0) {
        reqStatusContainer.innerHTML = createErrorTemplate();
      }

      restos.forEach((resto) => {
        restosContainer.innerHTML += createRestoItemTemplate(resto);
      });
    } catch (e) {
      reqStatusContainer.innerHTML = createErrorTemplate();
    }
  },
};

export default Favorites;
