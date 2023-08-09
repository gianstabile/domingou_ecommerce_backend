import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = "Carts";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

cartSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model(cartsCollection, cartSchema);

export { cartModel };
