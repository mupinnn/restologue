import FavRestoIdb from "~/data/favresto-idb";
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from "~/views/templates/template-creator";

const FavButtonHandler = {
  async init({ favButtonContainer, resto }) {
    this.favButtonContainer = favButtonContainer;
    this.resto = resto;

    await this.renderButton();
  },

  async renderButton() {
    const { id } = this.resto;

    if (await this.isRestoExist(id)) {
      this.renderLiked();
    } else {
      this.renderLike();
    }
  },

  async isRestoExist(id) {
    const resto = await FavRestoIdb.getResto(id);
    return !!resto;
  },

  async renderLike() {
    this.favButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.getElementById("likeButton");
    likeButton.addEventListener("click", async () => {
      await FavRestoIdb.putResto(this.resto);
      this.renderButton();
    });
  },

  async renderLiked() {
    this.favButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.getElementById("likeButton");
    likeButton.addEventListener("click", async () => {
      await FavRestoIdb.deleteResto(this.resto.id);
      this.renderButton();
    });
  },
};

export default FavButtonHandler;
