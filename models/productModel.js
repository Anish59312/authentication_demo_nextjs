import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide the company or brand"],
  },
  modelNo: {
    type: String,
    required: [true, "Please provide the model number"],
  },
  type: {
    type: String,
    required: [true, "Please provide the product type"],
    // values should come from constants
  },
  isArchieve: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default /** @type {import("mongoose").Model<import("mongoose").Document>} */ (
  Product
);
