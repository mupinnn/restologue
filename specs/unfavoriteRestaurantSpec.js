import FavRestoIdb from "~/data/favresto-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Un-favorite a restaurant", () => {
  const addFavButtonContainer = () => {
    document.body.innerHTML = `<div id="favBtnContainer"></div>`;
  };

  beforeEach(async () => {
    addFavButtonContainer();
    await FavRestoIdb.putResto({ id: 1 });
  });

  afterEach(async () => {
    await FavRestoIdb.deleteResto(1);
  });

  it("should show the unfavorite button when the restaurant has been liked", async () => {
    await TestFactories.createFavButtonWithResto({ id: 1 });

    expect(
      document.querySelector(
        `[aria-label="remove this resto from your favorite list"]`
      )
    ).toBeTruthy();
  });

  it("should not show the favorite button when the restaurant has been liked", async () => {
    await TestFactories.createFavButtonWithResto({ id: 1 });

    expect(
      document.querySelector(
        `[aria-label="add this resto to your favorite list"]`
      )
    ).toBeFalsy();
  });

  it("should be able to remove the favorited restaurant from the list", async () => {
    await TestFactories.createFavButtonWithResto({ id: 1 });

    document.getElementById("favButton").dispatchEvent(new Event("click"));
    expect(await FavRestoIdb.getAllResto()).toEqual([]);
  });

  it("should not throw an error if the unfavorited restaurant is not on the list", async () => {
    await TestFactories.createFavButtonWithResto({ id: 1 });

    // remove resto first
    await FavRestoIdb.deleteResto(1);

    // unfav the resto
    document.getElementById("favButton").dispatchEvent(new Event("click"));

    // should equal to [] and not throwing error
    expect(await FavRestoIdb.getAllResto()).toEqual([]);
  });
});
