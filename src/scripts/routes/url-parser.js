const URLParser = {
  getCurrentURLHash() {
    return window.location.hash.slice(1).toLowerCase();
  },

  parseActiveURLWithCombiner() {
    const splittedURL = this.URLSplitter(this.getCurrentURLHash());
    return this.URLCombiner(splittedURL);
  },

  parseActiveURLWithoutCombiner() {
    return this.URLSplitter(this.getCurrentURLHash());
  },

  URLSplitter(url) {
    const splittedURL = url.split("/");
    return {
      resource: splittedURL[1] || null,
      id: splittedURL[2] || null,
      verb: splittedURL[3] || null,
    };
  },

  URLCombiner(splittedURL) {
    return (
      (splittedURL.resource ? `/${splittedURL.resource}` : "/") +
      (splittedURL.id ? "/:id" : "") +
      (splittedURL.verb ? `/${splittedURL.verb}` : "")
    );
  },
};

export default URLParser;
