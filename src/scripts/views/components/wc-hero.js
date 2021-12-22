export default class WCHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateEl = document.createElement("template");
  }

  connectedCallback() {
    this.img = this.getAttribute("img") || "./images/heros/hero-image_2.jpg";

    // top-left, center-left, bottom-left
    // top-right, center-right, bottom-right
    // center
    this["text-pos"] = this.getAttribute("text-pos") || "center-left";
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ["img", "text-pos"];
  }

  renderTextPosition() {
    const [pos, lr] = this["text-pos"].split("-");
    let justifyContent = "normal";
    let alignItems = "normal";

    if (lr === "left") {
      alignItems = "flex-start";
    } else if (lr === "right") {
      alignItems = "flex-end";
    } else {
      justifyContent = "center";
      alignItems = "center";
    }

    switch (pos) {
      case "top":
        justifyContent = "flex-start";
        break;
      case "center":
        justifyContent = "center";
        break;
      case "bottom":
        justifyContent = "flex-end";
        break;
      default:
        break;
    }

    return `
      justify-content: ${justifyContent};
      align-items: ${alignItems};
    `;
  }

  template() {
    return `
      <style>
        .hero-container {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          ${this.renderTextPosition()}
          min-height: 320px;
          padding: 24px;
          color: #fff;
          background: linear-gradient(
              rgba(17, 24, 39, 0.85),
              rgba(17, 24, 39, 0.85)
            ),
            url(${this.img}) center no-repeat;
          background-size: cover;
        }

        ::slotted(h1) {
          margin: 0 !important;
          max-width: 400px;
        }

        ::slotted(p) {
          margin-top: 1rem !important;
          font-size: 1.125rem;
        }

        @media screen and (min-width: 620px) {
          padding: 24px 48px;
        }

        @media screen and (min-width: 1024px) {
          padding: 24px 64px;
        }

        @media screen and (min-width: 1200px) {
          .hero-container {
            max-width: 1000px;
            padding: 48px;
            margin: 0 auto;
            margin-top: 32px;
            border-radius: 30px;
          }
        }
      </style>

      <section class="hero-container">
        <slot></slot>
      </section>
    `;
  }

  render() {
    this.templateEl.innerHTML = this.template();
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this.templateEl.content.cloneNode(true));
  }
}

customElements.define("wc-hero", WCHero);
