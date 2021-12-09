const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  imageUrl: { type: String },
  name: { type: String },
  ingredients: [
    { type: Schema.Types.ObjectId, ref: "Ingredient", default: [] },
  ],
  time: { type: Number },
  description: [{ type: String }],
  cuisine: { type: String },
});

module.exports = model("Recipe", recipeSchema);
