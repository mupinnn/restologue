export default class WCRating extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateEl = document.createElement("template");
  }

  connectedCallback() {
    this.rating = this.getAttribute("rating") || 0;
    this.name = this.getAttribute("name") || "Resto Name";
    this.render();
  }

  static get observedAttributes() {
    return ["rating", "name"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  static renderRatingColor(rating) {
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
  }

  template() {
    return `
      <style>
        .rating {
          --bg-clr: #{$color-green};
          display: flex;
          align-items: center;
          width: fit-content;
          padding: 6px 10px;
          margin-bottom: 1rem;
          background-color: var(--bg-clr);
          font-weight: bold;
          border-radius: 5px;
        }

        .rating span {
          line-height: 16px;
          vertical-align: baseline;
        }
      
        .rating .icon {
          width: 18px;
          height: 18px;
          margin-left: 6px;
        }
      </style>
      <div class="rating" style="${WCRating.renderRatingColor(this.rating)}">
        <span title="${this.name} has ${this.rating} out of 5 rating">
          ${this.rating}
        </span>
        <box-icon
          class="icon"
          name="star"
          type="solid"
          color="white"
          size="cssSize"
        ></box-icon>
      </div>
    `;
  }

  render() {
    this.templateEl.innerHTML = this.template();
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this.templateEl.content.cloneNode(true));
  }
}

customElements.define("wc-rating", WCRating);
