const renderRatingColor = (rating) => {
  const root = document.documentElement;

  let style = "background-color: ";

  if (rating > 3.8) {
    style += getComputedStyle(root).getPropertyValue("--clr-green");
  } else if (rating > 2.5 && rating <= 3.8) {
    style += getComputedStyle(root).getPropertyValue("--clr-yellow");
  } else {
    style += getComputedStyle(root).getPropertyValue("--clr-red");
  }

  return style;
};

export { renderRatingColor };
