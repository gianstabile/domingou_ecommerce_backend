import mongoose from "mongoose";

const restoreCollection = "users_passwords_restores";
const restoreSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
  restored: {
    type: Boolean,
    default: false,
    required: false,
    enum: [true, false],
  },
  created_at: {
    type: Date,
    required: true,
  },
  expired_at: {
    type: Date,
    required: true,
  },
});

const restoreModel = mongoose.model(restoreCollection, restoreSchema);

export { restoreModel };
