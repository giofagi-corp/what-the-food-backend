const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  imageUrl: {
    type: String,
    default:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/aacb8d54981539.59714c1193ea5.png",
  },
  name: { type: String, required: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient", default: [] },],
  time: { type: Number },
  description: [{ type: String }],
  cuisine: { type: String },

  diet: { type: String, enum: ["vegan", "vegetarian", "gluten free",""] },


  rating: { type: Number },
});

module.exports = model("Recipe", recipeSchema);
