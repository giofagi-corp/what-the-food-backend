const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
  img: { type: String, default:"https://static5.depositphotos.https://cdn.shopify.com/s/files/1/1061/1924/products/Hungry_Face_Emoji_large.png?v=1571606037/1001911/490/v/950/depositphotos_4901724-stock-illustration-hungry-emoticon.jpg" },
  name: { type: String, required:true},
  type: { type: String, default:""},
});

module.exports = model("Ingredient", ingredientSchema);
