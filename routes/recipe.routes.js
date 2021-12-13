const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

const Recipe = require("../models/Recipe.model");

//CREATE A RECIPE:

router.post("/recipe/create", async (req, res) => {

    try {
        const { name, ingredients, time, description, cuisine, diet, rating } = req.body;

        const newRecipe = await Recipe.create({
            name,
            ingredients,
            time,
            description,
            cuisine,
            diet,
            rating,
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


//EDIT-UPDATE A RECIPE  

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


// SEARCH TOP RECIPIES 

router.get("/top-recipies", async(req,res)=>{
  try{
    const topRecipies = await Recipe.find().sort({rating:-1}).limit(3)
    res.status(200).json(topRecipies)
  }
  catch(err){
    console.log(err)
  }
})

//SEARCH A RECIPE BY ING

router.get(`/recipe`, async (req, res) => {
    try {
        const { ingredients } = req.query;
        const ArrIngredients = ingredients.split(" ");

        //console.log("Queery -->>", ArrIngredients);
        const recipeByIngredient = await Recipe.find({
            ingredients: { $in: [ObjectId(ingredients)] },
        });
        res.status(200).json(recipeByIngredient);
    } catch (err) {
        console.log(err);
    }
});

//SEARCH A RECIPE BY CUISINE

router.get("/recipe/recipeByCuisine", async (req, res) => {
    try {
        const { cuisine } = req.query;
        const recipeByCuisine = await Recipe.find({ cuisine: cuisine });
        res.status(200).json(recipeByCuisine);
    } catch (err) {
        console.log(err);
    }
});

// TOP CUISINE

router.get("/recipe/topCuisine", async (req, res) => {
    try {
        const recipeByCuisine = await Recipe.aggregate([
            {
              $sortByCount: "$cuisine"
            },
            {
              "$limit": 3
            }
          ])
               
          let topCuisine = await Promise.all(
            recipeByCuisine.map(async (el)=>{
                try{
                    const recipe = await Recipe.find({ cuisine: el._id }).limit(1)
                    return {cuisine: el._id, count: el.count, imageUrl: recipe[0].imageUrl}
                }catch(err){
                    console.log(err);
                }
            }))

        res.status(200).json(topCuisine);
    } catch (err) {
        console.log(err);
    }
});

// ALL RECIPES

router.get("/recipe/listAllRecipes", async (req, res) => {
    try {
        const listAllRecipes = await Recipe.find()
        res.status(200).json(listAllRecipes);
    }catch(err){
        console.log(err);
    }

})

module.exports = router;
