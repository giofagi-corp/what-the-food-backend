const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  imageUrl: { type: String, default:"https://st3.depositphotos.com/1859105/i/600/depositphotos_164009844-stock-photo-top-view-empty-dish-on.jpg" },
  name: { type: String, required:true},
  ingredients: [
    { type: Schema.Types.ObjectId, ref: "Ingredient", default: [] },
  ],
  time: { type: Number },
  description: [{ type: String }],
  cuisine: { type: String },
});

module.exports = model("Recipe", recipeSchema);
