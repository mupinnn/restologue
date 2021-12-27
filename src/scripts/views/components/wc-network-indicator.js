import { Toast } from "~/utils/swal-mixins";

export default class WCNetworkIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateEl = document.createElement("template");
    this.status = navigator.onLine ? "online" : "offline";
  }

  connectedCallback() {
    window.addEventListener("online", () => {
      this.status = "online";
      this.render();

      Toast.fire({
        icon: "info",
        title: "Your network back to online",
      });
    });

    window.addEventListener("offline", () => {
      this.status = "offline";
      this.render();

      Toast.fire({
        icon: "info",
        title: "You're being offline",
      });
    });

    this.render();
  }

  template() {
    return `
      <style>
        .network-indicator {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #9ede73;

          font-weight: bold;
        }

        .network-indicator.offline {
          color: #fff;
          background-color: #be0000;
        }

        .network-indicator.online {
          display: none;
        }

        p {
          margin: 0
        }
      </style>
      <div class="network-indicator ${this.status}">
        <p>You're ${this.status}</p>
      </div>
    `;
  }

  render() {
    this.templateEl.innerHTML = this.template();
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this.templateEl.content.cloneNode(true));
  }
}

customElements.define("wc-network-indicator", WCNetworkIndicator);
