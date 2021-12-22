import { createRestoItemTemplate } from "~/views/templates/template-creator";
import RestoSource from "~/data/resto-source";
import "~/views/components/wc-hero";

const Home = {
  async render() {
    return `
      <wc-hero>
        <h1>Find a place to bring happines for your tummy ;)</h1>
      </wc-hero>

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
