const DrawerHandler = {
  init({ drawer, toggleDrawerButton }) {
    toggleDrawerButton.addEventListener("click", () => {
      this.toggleDrawer(drawer, toggleDrawerButton);
    });

    // Close sidebar after navigate (click link)
    [...drawer.children].forEach((link) => {
      link.addEventListener("click", () => {
        this.closeDrawer(drawer, toggleDrawerButton);
      });
    });
  },

  /* eslint-disable no-param-reassign */
  toggleDrawer(drawer, toggler) {
    drawer.classList.toggle("open");
    document.body.classList.toggle("overflow-hidden");

    if (drawer.classList.contains("open")) {
      toggler.textContent = "Close Menu";
    } else {
      toggler.textContent = "Open Menu";
    }
  },

  closeDrawer(drawer, toggler) {
    drawer.classList.remove("open");
    document.body.classList.remove("overflow-hidden");
    toggler.textContent = "Open Menu";
  },
  /* eslint-enable no-param-reassign */
};

export default DrawerHandler;
