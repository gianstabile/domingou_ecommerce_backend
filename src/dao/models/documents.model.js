import mongoose from "mongoose";

const documentsCollection = "Documents";

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  docReference: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const documentsModel = mongoose.model(documentsCollection, documentSchema);

export default documentsModel;
