const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
	avatarUrl: { 
    type: String, 
    default: 'https://res.cloudinary.com/dtgwzogvc/image/upload/v1643630783/images/casual-life-3d-avatar-with-man-in-green-shirt-and-orange-hat_q0c4s8.png' 
  },
	name: { 
    type: String, 
    required: true 
  },
	email: { 
    type: String, 
    unique: true, 
    required: true 
  },
	password: { 
    type: String, 
    required: true 
  },
	favouriteRecipies: [
		{ 
      type: Schema.Types.ObjectId, 
      ref: 'Recipe', 
      default: [] 
    },
	],
	myRecipies: [
    { 
    type: Schema.Types.ObjectId, 
    ref: 'Recipe', default: [] 
    }
  ],
	favouriteIngredients: [
		{ 
      type: Schema.Types.ObjectId, 
      ref: 'Ingredients', default: [] 
    },
	],
	restrictions: [
		{ 
      type: Schema.Types.ObjectId, 
      ref: 'Ingredients', 
      default: [] 
    },
	],
})

module.exports = model('User', userSchema)
