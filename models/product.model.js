const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Ensures the title is mandatory
    },
    price: {
      type: String,
      required: true, // Ensures the price is mandatory
    },
    description: {
      type: String,
      required: true, // Ensures the description is mandatory
    },
    image: {
      type: String, // Stores the image filename or URL
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
