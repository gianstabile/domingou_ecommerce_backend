import { restoreModel } from "../models/restore.model.js";

class Restore {
  constructor() {
    this.model = restoreModel;
  }

  create = async (data) => {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  findByEmail = async (email) => {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  };

  findByToken = async (token) => {
    try {
      return await this.model.findOne({ token });
    } catch (error) {
      throw new Error(error);
    }
  };

  setRestored = async (id) => {
    try {
      return await this.model.findByIdAndUpdate(id, { restored: true }, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteById = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const restoreDao = new Restore();
