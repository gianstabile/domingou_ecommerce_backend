import mongoose from "mongoose";
import config from "./config.js";
import { logger } from "../utils/logger.js";

const { database } = config;
const db = {
  connect: async () => {
    try {
      await mongoose.connect(database.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        logger.info("Connected to MongoDB.");
      });
    } catch (error) {
      logger.error("Error connecting to MongoDB:", error);
    }
  },
};

export default db;
