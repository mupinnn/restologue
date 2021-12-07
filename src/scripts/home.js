window.addEventListener("load", () => {
  // Prevent transition jump/flash by removing transition using .preload class
  // that applied to body and remove the class after page fully loaded to bring
  // back the transition ability to all element.
  document.body.classList.remove("preload");
});
