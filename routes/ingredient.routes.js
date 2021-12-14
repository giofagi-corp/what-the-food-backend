const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Ingredient = require("../models/Ingredient.model");
const Recipe = require("../models/Recipe.model");
let ObjectId = require('mongodb').ObjectId;

//CREATE AN INGREDIENT

router.post("/ingredient/create", async (req, res) => {
  try {
    const { img, name, type } = req.body;
    const newIngredient = await Ingredient.create({ img, name, type })
      res.status(201)
      .json(newIngredient);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

//DELETE AN INGREDIENT 

router.delete("/ingredient/:ingredientId", async(req,res)=>{
    try{
        const{ingredientId} = req.params 
        await Ingredient.findByIdAndRemove(ingredientId)
        res.status(200)
    }
    catch(err){
        console.log(err)
    }
})

// EDIT AN INGREDIENT 

router.put("/ingredient/:ingredientId",async(req,res)=>{
  try{
    const{ingredientId} = req.params 
    // console.log("---->",ingredientId)
    const editIngredient = await Ingredient.findByIdAndUpdate(ingredientId,req.body,{new:true})
   
    res.status(200).json(editIngredient)
  }
  catch(err){
    console.log(err)
  }
})

// SEARCH TOP INGREDIENTS 

router.get("/top-ingredients", async (req, res) => {
  try {
      const popularIngredients = await Recipe.aggregate([
          { $unwind: "$ingredients" },  { $sortByCount: "$ingredients" }, { "$limit": 3 }
        ])
        const topIngredients = await Promise.all(
          popularIngredients.map(async (el)=>{
              try{
                  const ingredient = await Ingredient.findById(el)
                  return {name: ingredient.name, imageUrl: ingredient.img}
              }catch(err){
                  console.log(err);
              }
          }))
      res.status(200).json(topIngredients);
  } catch (err) {
      console.log(err);
  }
});


// SEARCH by INGREDIENTS 

router.get("/recipes", async (req, res) => {
  const arrIngredientsID  = req.query.ingredients.split(" ")
  try {
    const filteredRecipes = await Recipe.find({ingredients: { $in: arrIngredientsID}  })
    res.status(200).json(filteredRecipes);
  } catch (err) {
    console.log(err);
  }
});