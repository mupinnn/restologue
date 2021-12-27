import CONFIG from "~/globals/config";

const CacheHelper = {
  async cacheAppShell(requests) {
    const cache = await this.openCache();
    cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .forEach((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(request) {
    const cache = await caches.match(request);

    if (cache) {
      this.fetchRequest();
      return cache;
    }

    return this.fetchRequest(request);
  },

  async fetchRequest(request) {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      return response;
    }

    await this.addCache(request);
    return response;
  },

  async openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async addCache(request) {
    const cache = await this.openCache();
    cache.add(request);
  },
};

export default CacheHelper;
