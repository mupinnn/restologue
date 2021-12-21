import { restaurants } from "../../../DATA.json";
import { createRestoItemTemplate } from "~/views/templates/template-creator";

const Home = {
  async render() {
    return `
      <section class="hero">
        <h1>Find a place to bring happines for your tummy ;)</h1>
      </section>

      <section class="container explore">
        <h2>Explore</h2>

        <article class="resto-list"></article>
      </section>
    `;
  },

  async afterRender() {
    const restosContainer = document.querySelector(".resto-list");
    restaurants.forEach((resto) => {
      restosContainer.innerHTML += createRestoItemTemplate(resto);
    });
  },
};

export default Home;
