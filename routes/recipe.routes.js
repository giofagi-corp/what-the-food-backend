const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Recipe = require("../models/Recipe.model");
const Ingredient = require("../models/Ingredient.model");


//Route to create New recipies: 

router.post("/recipe/create",async(req,res)=>{
  try{
    const { name,ingredients,time, description, cuisine} = req.body

   const newRecipe = await Recipe.create({ name,ingredients,time, description, cuisine})

  res.status(201).json(newRecipe)
  
  }
  catch(err){
    console.log(err)
  }
})


module.exports = router; 



