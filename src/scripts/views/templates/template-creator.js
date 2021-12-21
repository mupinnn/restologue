import { renderRatingColor } from "./utils";
import CONFIG from "~/globals/config";

const createRestoItemTemplate = (resto) => `
  <a
    href="#/detail/${resto.id}"
    data-id="${resto.id}"
    title="See detail of ${resto.name}"
  >
    <article class="resto-list-item card">
      <figure class="card-img">
        <img
          src="${CONFIG.API_IMG_BASE_URL}medium/${resto.pictureId}"
          alt="${resto.name}"
        />
        <div class="overlay-text">
          <div class="rating" style="${renderRatingColor(resto.rating)}">
            <span title="${resto.name} has ${resto.rating} out of 5 rating">
              ${resto.rating}
            </span>
            <box-icon
              class="icon"
              name="star"
              type="solid"
              color="white"
              size="cssSize"
            ></box-icon>
          </div>
          <p>${resto.city}</p>
        </div>
      </figure>
      <div class="card-body">
        <h3>${resto.name}</h3>
        <p>
          ${
            resto.description.length > 100
              ? `${resto.description.substring(0, 99)}&hellip;`
              : resto.description
          }
        </p>
      </div>
    </article>
  </a>
`;

export { createRestoItemTemplate };
