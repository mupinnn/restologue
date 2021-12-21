import { createRestoItemTemplate } from "~/views/templates/template-creator";
import RestoSource from "~/data/resto-source";

const Home = {
  async render() {
    return `
      <section class="hero">
        <h1>Find a place to bring happines for your tummy ;)</h1>
      </section>

      <section class="container main-section">
        <h2>Explore</h2>

        <article class="resto-list"></article>
      </section>
    `;
  },

  async afterRender() {
    const { restaurants } = await RestoSource.fetchAllResto();
    const restosContainer = document.querySelector(".resto-list");
    restaurants.forEach((resto) => {
      restosContainer.innerHTML += createRestoItemTemplate(resto);
    });
  },
};

export default Home;
