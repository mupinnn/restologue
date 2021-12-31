import FavRestoIdb from "~/data/favresto-idb";
import { itActAsFavoriteRestoModel } from "./contract/favoriteRestoContract";

describe("FavRestoIdb contract test", () => {
  afterEach(async () => {
    (await FavRestoIdb.getAllResto()).forEach(async (resto) => {
      await FavRestoIdb.deleteResto(resto.id);
    });
  });

  itActAsFavoriteRestoModel(FavRestoIdb);
});
