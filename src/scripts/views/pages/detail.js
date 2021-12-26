import RestoSource from "~/data/resto-source";
import URLParser from "~/routes/url-parser";
import {
  createRestoDetailHeroTemplate,
  createRestoReviewItemTemplate,
} from "../templates/template-creator";

const Detail = {
  async render() {
    return `
      <section class="container main-section resto">
        <article id="desc">
          <h2>Description</h2>
          <p></p>
        </article>
        <article>
          <h2>Foods</h2>
          <ul class="menus" id="foods"></ul>
        </article>
        <article>
          <h2>Drinks</h2>
          <ul class="menus" id="drinks"></ul>
        </article>
        <article>
          <h2>Reviews</h2>
          <article class="reviews"></article>
        </article>
        <article>
          <h2>Add Review</h2>
          <form id="addReview">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" name="name" placeholder="Your name. . ." />
            </div>
            <div class="form-group">
              <label for="name">Review</label>
              <textarea name="review" placeholder="Honest review . . ." rows="6"></textarea>
            </div>
            <button type="submit" class="btn">Add Review</button>
          </form>
        </article>
      </section>
    `;
  },

  async afterRender() {
    const { id } = URLParser.parseActiveURLWithoutCombiner();
    const { restaurant } = await RestoSource.fetchRestoDetail(id);
    const {
      description,
      customerReviews,
      menus: { foods, drinks },
    } = restaurant;

    const main = document.getElementById("main");
    const descEl = document.querySelector("#desc p");
    const foodsEl = document.getElementById("foods");
    const drinksEl = document.getElementById("drinks");
    const reviewsEl = document.querySelector(".reviews");

    main.insertAdjacentHTML(
      "afterbegin",
      createRestoDetailHeroTemplate(restaurant)
    );

    descEl.textContent = description;

    foods.forEach((food) => {
      foodsEl.innerHTML += `<li>${food.name}</li>`;
    });

    drinks.forEach((drink) => {
      drinksEl.innerHTML += `<li>${drink.name}</li>`;
    });

    customerReviews.forEach((review) => {
      reviewsEl.innerHTML += createRestoReviewItemTemplate(review);
    });
  },
};

export default Detail;
