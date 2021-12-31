Feature("Favorite a resto");

Before((I) => {
  I.amOnPage("/#/favorites");
});

Scenario("test something", (I) => {
  I.see("Unfortunately, the content is empty.", ".request-status p");
  pause();
});
