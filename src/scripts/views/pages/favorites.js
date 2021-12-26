import { createRestoItemTemplate } from "~/views/templates/template-creator";
import FavRestoIdb from "~/data/favresto-idb";

const Favorites = {
  async render() {
    return `
      <section class="container main-section">
        <h2>Your Favorite Restos</h2>

        <article class="resto-list"></article>
      </section>
    `;
  },

  async afterRender() {
    const restos = await FavRestoIdb.getAllResto();
    const restosContainer = document.querySelector(".resto-list");
    restos.forEach((resto) => {
      restosContainer.innerHTML += createRestoItemTemplate(resto);
    });
  },
};

export default Favorites;
