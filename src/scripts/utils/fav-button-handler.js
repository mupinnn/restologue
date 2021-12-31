import FavRestoIdb from "~/data/favresto-idb";
import {
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate,
} from "~/views/templates/template-creator";
import { Toast } from "./swal-mixins";

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
    this.favButtonContainer.innerHTML = createFavoriteButtonTemplate();

    const favButton = document.getElementById("favButton");
    favButton.addEventListener("click", async () => {
      await FavRestoIdb.putResto(this.resto);
      this.renderButton();

      Toast.fire({
        icon: "info",
        title: "Resto added to favorite list",
      });
    });
  },

  async renderLiked() {
    this.favButtonContainer.innerHTML = createFavoritedButtonTemplate();

    const favButton = document.getElementById("favButton");
    favButton.addEventListener("click", async () => {
      await FavRestoIdb.deleteResto(this.resto.id);
      this.renderButton();

      Toast.fire({
        icon: "info",
        title: "Resto removed from favorite list",
      });
    });
  },
};

export default FavButtonHandler;
