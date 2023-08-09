import mongoose from "mongoose";

const messagesCollection = "Messages";

const messagesSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);

export default messagesModel;
