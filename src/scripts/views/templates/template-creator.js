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
          <wc-rating rating="${resto.rating}" name="${resto.name}"></wc-rating>
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

const createLikeButtonTemplate = () => `
  <button aria-label="add this resto to your favorite list" id="likeButton" class="like">
    <box-icon
      name="bookmark-heart"
      type="regular"
      size="md"
      color="#fff"
    >
    </box-icon>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="remove this resto from your favorite list" id="likeButton" class="like">
    <box-icon
      name="bookmark-heart"
      type="solid"
      size="md"
      color="#fff"
    >
    </box-icon>
  </button>
`;

const createRestoDetailHeroTemplate = (resto) => {
  const { name, city, address, rating, categories, pictureId } = resto;

  const renderCategories = () =>
    categories.map((category) => category.name).join(", ");

  return `
    <wc-hero
      text-pos="bottom-left"
      img="https://restaurant-api.dicoding.dev/images/medium/${pictureId}"
      class="resto-hero"
    >
      <div id="favBtnContainer"></div>
      <wc-rating rating="${rating}" name="${name}"></wc-rating>
      <h1>${name}</h1>
      <span>-${renderCategories()}-</span>
      <p>${city}, ${address}</p>
    </wc-hero>
  `;
};

const createRestoReviewItemTemplate = (review) => `
  <article class="card">
    <div class="card-body">
      <p class="name">${review.name}</p>
      <span class="date">${review.date}</span>
      <p class="content">${review.review}</p>
    </div>
  </article>
`;

const createLoadingTemplate = () => `
  <p>Fetching content for you, please wait.</p>
  <img src="./images/loading.svg" alt="" />
`;

const createErrorTemplate = () => `
  <p>Unfortunately, the content is empty.</p>
  <img src="./images/error.svg" alt="" />
`;

export {
  createRestoItemTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createRestoDetailHeroTemplate,
  createRestoReviewItemTemplate,
  createLoadingTemplate,
  createErrorTemplate,
};
