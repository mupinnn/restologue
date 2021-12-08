import { restaurants } from "../DATA.json";

const footerYear = document.getElementById("year");
const restoList = document.querySelector(".resto-list");
const root = document.documentElement;

function renderRatingColor(rating) {
  let style = "background-color: ";

  if (rating > 3.8) {
    style += getComputedStyle(root).getPropertyValue("--clr-green");
  } else if (rating > 2.5 && rating <= 3.8) {
    style += getComputedStyle(root).getPropertyValue("--clr-yellow");
  } else {
    style += getComputedStyle(root).getPropertyValue("--clr-red");
  }

  return style;
}

function renderResto() {
  restaurants.forEach((resto) => {
    const { city, description, id, name, pictureId, rating } = resto;
    restoList.insertAdjacentHTML(
      "beforeend",
      `
      <a href="#" data-id="${id}">
        <article class="resto-list-item card">
          <figure class="card-img">
            <img src="${pictureId}" alt="" />
            <div class="overlay-text">
              <div class="rating" style="${renderRatingColor(rating)}">
                <span>${rating}</span>
                <box-icon
                  class="icon"
                  name="star"
                  type="solid"
                  color="white"
                  size="cssSize"
                ></box-icon>
              </div>
              <p>${city}</p>
            </div>
          </figure>
          <div class="card-body">
            <h3>${name}</h3>
            <p>
              ${
                description.length > 100
                  ? description.substring(0, 99) + "&hellip;"
                  : description
              }
            </p>
          </div>
        </article>
      </a>
      `
    );
  });
}

window.addEventListener("load", () => {
  // Prevent transition jump/flash by removing transition using .preload class
  // that applied to body and remove the class after page fully loaded to bring
  // back the transition ability to all element.
  document.body.classList.remove("preload");
  footerYear.innerText = new Date().getFullYear();

  renderResto();
});
