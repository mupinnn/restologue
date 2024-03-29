/* eslint-disable no-restricted-globals */
import "regenerator-runtime";
import CacheHelper from "./utils/cache-helper";

const { assets } = global.serviceWorkerOption;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(CacheHelper.cacheAppShell([...assets, "./"]));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
