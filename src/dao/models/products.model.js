import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "Products";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [30, "Too long!"],
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      maxLength: [10, "Not valid!"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Tabacos rubios", "Blends", "Tabacos negros", "Packs", "Otros"],
      default: "Otros",
    },
    stock: {
      type: Number,
      maxLength: [5, "Too long!"],
      required: true,
    },
    status: String,
    code: {
      type: Number,
      maxLength: [8, "Characters limit"],
      required: true,
      unique: true,
    },
    thumbnails: {
      type: Array,
      default: [],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productsCollection, productSchema);

export { productModel };
