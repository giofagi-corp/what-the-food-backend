const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
  img: { type: String },
  name: { type: String },
  type: { type: String },
});

module.exports = model("Ingredient", ingredientSchema);
