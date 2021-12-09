const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
  name: { type: String },
  quantity: { type: Number },
  description: [{ type: String }],
});

module.exports = model("Ingredient", ingredientSchema);
