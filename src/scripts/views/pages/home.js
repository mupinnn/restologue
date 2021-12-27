import {
  createRestoItemTemplate,
  createLoadingTemplate,
  createErrorTemplate,
} from "~/views/templates/template-creator";
import RestoSource from "~/data/resto-source";

const Home = {
  async render() {
    return `
      <wc-hero>
        <h1>Find a place to bring happines for your tummy ;)</h1>
      </wc-hero>

      <section class="container main-section">
        <h2>Explore</h2>

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
      const { restaurants } = await RestoSource.fetchAllResto();
      reqStatusContainer.innerHTML = "";
      restaurants.forEach((resto) => {
        restosContainer.innerHTML += createRestoItemTemplate(resto);
      });
    } catch (e) {
      reqStatusContainer.innerHTML = createErrorTemplate();
    }
  },
};

export default Home;
