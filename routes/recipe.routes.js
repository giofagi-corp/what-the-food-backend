const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const  ObjectId = require('mongodb').ObjectId;

const Recipe = require("../models/Recipe.model");

//CREATE A RECIPE:

router.post("/recipe/create", async (req, res) => {
  try {
    const { name, ingredients, time, description, cuisine } = req.body;

    const newRecipe = await Recipe.create({
      name,
      ingredients,
      time,
      description,
      cuisine,
    });

    res.status(201).json(newRecipe);
  } catch (err) {
    console.log(err);
  }
});

//DELETE A RECIPE

router.delete("/recipe/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const deletedRecipe = await Recipe.findByIdAndRemove(recipeId);
    res.status(200).json(deletedRecipe);
  } catch (err) {
    console.log(err);
  }
});

//EDIT A RECIPE  

router.put("/recipe/:recipeId", async(req,res)=>{
  try{
    const {recipeId} = req.params 
    const editRecipe = await Recipe.findByIdAndUpdate(recipeId,req.body,{new:true})
    res.status(200).json(editRecipe)
  }
  catch(err){
    console.log(err)
  }
})

//SEARCH A RECIPE BY ING

router.get(`/recipe`, async(req,res)=>{
  try{
    const {ingredients} = req.query
    const ArrIngredients = ingredients.split(" ")

    console.log("Queery -->>",ArrIngredients)
    const recipeByIngredient = await Recipe.find({ingredients:{$in:[ObjectId(ingredients)]}})
    res.status(200).json(recipeByIngredient)

  }
  catch(err){
    console.log(err)
  }
})

//SEARCH A RECIPE BY CUISINE

router.get("/recipe/recipeByCuisine/:recipeId", async (req, res) => {
  try {
    const { cuisineId } = req.params;
    const recipeByCuisine = await Recipe.findById(cuisineId);
    res.status(200).json(recipeByCuisine);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
