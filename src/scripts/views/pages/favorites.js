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
    //
  },
};

export default Favorites;
