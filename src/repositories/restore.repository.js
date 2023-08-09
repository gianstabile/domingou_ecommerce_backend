import { restoreDao } from "./../dao/db/restore.dao.js";

class RestoreRepository {
  constructor() {
    this.manager = restoreDao;
  }

  create = async (data) => {
    try {
      return await this.manager.create(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  findByEmail = async (email) => {
    try {
      return await this.manager.findByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  findByToken = async (token) => {
    try {
      return await this.manager.findByToken(token);
    } catch (error) {
      throw new Error(error);
    }
  };

  setRestored = async (id) => {
    try {
      return await this.manager.setRestored(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteById = async (id) => {
    try {
      return await this.manager.deleteById(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const restoreRepository = new RestoreRepository();
