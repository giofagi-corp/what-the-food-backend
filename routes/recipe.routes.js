const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

const Recipe = require("../models/Recipe.model");

//CREATE A RECIPE:

router.post("/recipe/create", async (req, res) => {
    console.log("req body ------> ",req.body);
    try {
        const { imageUrl, name, ingredients, time, description, cuisine } = req.body;
        
        const newRecipe = await Recipe.create({
            imageUrl,
            name,
            ingredients,
            time,
            description,
            cuisine
        })

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

// router.get(`/recipe`, async (req, res) => {
//     try {
//         const { ingredients } = req.query;
//         const ArrIngredients = ingredients.split(" ");

//         //console.log("Queery -->>", ArrIngredients);
//         const recipeByIngredient = await Recipe.find({
//             ingredients: { $in: [ObjectId(ingredients)] },
//         });
//         res.status(200).json(recipeByIngredient);
//     } catch (err) {
//         console.log(err);
//     }
// });

// TYPES OF CUISINE

router.get("/cuisine", async (req, res) => {
    try {
        const recipe = await Recipe.find()
        let cuisines = await Promise.all(
            recipe.map(async (e)=>{
                try{
                    return e.cuisine
                }catch(err){
                    console.log(err);
                }
            })
        )
        const typesOfCuisine = [...new Set(cuisines)];
        res.status(200).json(typesOfCuisine)    

    }catch(err) {
        console.log(err)
    }
})

//SEARCH A RECIPE BY CUISINE

router.get("/recipe/recipeByCuisine", async (req, res) => {
    try {
        console.log("req.query----->",req.query);
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
            {$sortByCount: "$cuisine"},{"$limit": 3}
          ])
               
          let topCuisine = await Promise.all(
            recipeByCuisine.map(async (el)=>{
                try{
                    const recipe = await Recipe.find({ cuisine: el._id }).limit(1)
                    return {name: el._id, count: el.count, imageUrl: recipe[0].imageUrl}
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

// SEARCH A RECIPE

router.get("/recipe/:id", async (req, res) => {
    const id = req.params.id
    try {
        const recipe = await Recipe.findById(id).populate("ingredients")
        res.status(200).json(recipe);
    }catch(err){
        console.log(err);
    }

})

// SEARCH A RECIPE BY NAME

router.post("/recipe/:name", async (req, res) => {
    console.log("recipe req.params.name------->", req.params.name)
    const recipeName = req.params.name;
    try {
      const RecipeNameFound = await Recipe.find({ name: recipeName });
      console.log("RecipeNameFound----->",RecipeNameFound)
        res.status(200).json(RecipeNameFound);
      
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router;
