import Swal from "sweetalert2";
import RestoSource from "~/data/resto-source";
import URLParser from "~/routes/url-parser";
import {
  createRestoDetailHeroTemplate,
  createRestoReviewItemTemplate,
} from "../templates/template-creator";
import FavButtonHandler from "~/utils/fav-button-handler";

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

  /* eslint-disable no-param-reassign */
  renderCustomerReviews(reviews, el) {
    el.innerHTML = "";
    reviews.reverse().forEach((review) => {
      el.innerHTML += createRestoReviewItemTemplate(review);
    });
  },
  /* eslint-enable no-param-reassign */

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
    const reviewFormEl = document.getElementById("addReview");

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

    this.renderCustomerReviews(customerReviews, reviewsEl);

    FavButtonHandler.init({
      favButtonContainer: document.getElementById("favBtnContainer"),
      resto: {
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        city: restaurant.city,
        pictureId: restaurant.pictureId,
        description,
      },
    });

    reviewFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      formData.set("id", id);
      const reviewData = Object.fromEntries(formData);

      try {
        const reviews = await RestoSource.addRestoReview(reviewData);
        Swal.fire(
          "Review successfully added!",
          "Thanks for your honest review!",
          "success"
        ).then(() => {
          this.renderCustomerReviews(reviews.customerReviews, reviewsEl);
          event.target.reset();
        });
      } catch (error) {
        Swal.fire(
          "Failed to add review :(",
          "Something went wrong. . .",
          "error"
        ).then(() => {
          event.target.reset();
        });
      }
    });
  },
};

export default Detail;
