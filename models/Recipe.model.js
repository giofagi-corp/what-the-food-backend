const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  imageUrl: {
    type: String
  },
  name: { type: String, required: true, },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient", default: [] },],
  time: { type: Number },
  description: [{ type: String }],
  cuisine: { type: String },

  //diet: { type: String, enum: ["vegan", "vegetarian", "gluten free",""] },


  rating: { type: Number },
});

module.exports = model("Recipe", recipeSchema);
