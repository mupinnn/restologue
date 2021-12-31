/* eslint-disable consistent-return */
import { openDB } from "idb";
import CONFIG from "~/globals/config";

const { DB_NAME, DB_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const FavRestoIdb = {
  async getResto(id) {
    if (!id) {
      return;
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllResto() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async putResto(resto) {
    if (!resto.hasOwnProperty("id")) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, resto);
  },

  async deleteResto(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavRestoIdb;
