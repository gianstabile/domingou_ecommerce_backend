import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  address: String,
  password: {
    type: String,
  },
  profilePicture: String,
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Documents",
    },
  ],
  last_connection: {
    type: Date,
    default: null,
  },
  hasUploadedDocuments: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
