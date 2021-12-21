import API_ENDPOINT from "~/globals/api-endpoint";

class RestoSource {
  static async fetchAllResto() {
    const response = await fetch(API_ENDPOINT.LIST);
    const results = await response.json();
    return results;
  }

  static async fetchRestoDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const results = await response.json();
    return results;
  }

  static async searchRestos(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    const results = await response.json();
    return results;
  }

  static async addRestoReview(reviewData) {
    const body = JSON.stringify(reviewData);
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const results = await response.json();

    return results;
  }
}

export default RestoSource;
