Feature("Favorite a resto");

Before((I) => {
  I.amOnPage("/#/favorites");
});

Scenario("showing empty favorite restos", (I) => {
  I.see("Unfortunately, the content is empty.", ".request-status p");
});
