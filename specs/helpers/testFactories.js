import FavRestoIdb from "~/data/favresto-idb";
import FavButtonHandler from "~/utils/fav-button-handler";

const createFavButtonWithResto = async (resto) => {
  await FavButtonHandler.init({
    favButtonContainer: document.getElementById("favBtnContainer"),
    favoriteRestos: FavRestoIdb,
    resto,
  });
};

export { createFavButtonWithResto };
