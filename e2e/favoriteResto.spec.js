const assert = require("assert");

Feature("Favorite a resto");

Before((I) => {
  I.amOnPage("/#/favorites");
});

Scenario("showing empty favorite restos", (I) => {
  I.see("Unfortunately, the content is empty.", ".request-status p");
});

Scenario("favoriting one restaurant", async (I) => {
  I.see("Unfortunately, the content is empty.", ".request-status p");

  I.amOnPage("/");
  I.seeElement("a .resto-list-item h3");

  const firstResto = locate("a .resto-list-item h3").first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement("#favButton");
  I.click("#favButton");

  I.amOnPage("/#/favorites");
  I.see("Your Favorite Restos", ".main-section > h2");
  I.seeElement(".resto-list-item h3");

  const favedRestoName = await I.grabTextFrom(".resto-list-item h3");
  assert.strictEqual(firstRestoName, favedRestoName);
});
