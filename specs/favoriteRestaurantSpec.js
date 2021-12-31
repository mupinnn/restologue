import FavRestoIdb from "~/data/favresto-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Favoriting a restaurant", () => {
  const addFavButtonContainer = () => {
    document.body.innerHTML = `<div id="favBtnContainer"></div>`;
  };

  beforeEach(() => {
    addFavButtonContainer();
  });

  it("should show the favorite button when the restaurant has not been favorited", async () => {
    await TestFactories.createFavButtonWithResto({ id: 1 });

    expect(
      document.querySelector(
        `[aria-label="add this resto to your favorite list"]`
      )
    ).toBeTruthy();
  });

  it("should not show the unfavorite button when the restaurant has not been favorited", async () => {
    await TestFactories.createFavButtonWithResto({ id: 1 });

    expect(
      document.querySelector(
        `[aria-label="remove this resto from your favorite list"]`
      )
    ).toBeFalsy();
  });

  it("should be able to favorite the restaurant", async () => {
    await TestFactories.createFavButtonWithResto({ id: 1 });

    document.getElementById("favButton").dispatchEvent(new Event("click"));
    const resto = await FavRestoIdb.getResto(1);

    expect(resto).toEqual({ id: 1 });

    FavRestoIdb.deleteResto(1);
  });

  it("should not add a restaurant again when it's already favorited", async () => {
    await TestFactories.createFavButtonWithResto({ id: 1 });

    // simulate favorite a restaurant
    await FavRestoIdb.putResto({ id: 1 });

    // simulate user clicking favorite button
    document.getElementById("favButton").dispatchEvent(new Event("click"));

    // expect there's no duplicate like {id: 1}, {id: 1}
    expect(await FavRestoIdb.getAllResto()).toEqual([{ id: 1 }]);

    FavRestoIdb.deleteResto(1);
  });

  it("should not add a restaurant when it has no id", async () => {
    await TestFactories.createFavButtonWithResto({});

    document.getElementById("favButton").dispatchEvent(new Event("click"));
    expect(await FavRestoIdb.getAllResto()).toEqual([]);
  });
});
