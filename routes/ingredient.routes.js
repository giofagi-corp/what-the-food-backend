const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Ingredient = require("../models/Ingredient.model");
const Recipe = require("../models/Recipe.model");
let ObjectId = require("mongodb").ObjectId;

/* //SEARCH AN INGREDIENT TO ADD TO A RECIPY ( Create Ingredient if it does not exist)

router.post("/ingredient-create", async (req, res) => {
  console.log("REQ BODY---->",req.body)
  const {ingredient:name } = req.body;
  try {
    const ingredientFound = await Ingredient.find({ name: name });
    console.log("ing FOUND---->", ingredientFound);
    if (ingredientFound.length === 0) {
      const newIngredient = await Ingredient.create({ name:name });
      console.log("ing CREATED----->", newIngredient);
      res.status(201).json(newIngredient);
    } else {
      res.status(200).json(ingredientFound);
    }
  } catch (err) {
    console.log(err);
  }
}); */

//SEARCH AN INGREDIENT TO ADD TO A RECIPY ( Create Ingredient if it does not exist)

router.post("/search-ingredient/:name", async (req, res) => {
  console.log("req.params.name------->", req.params.name)
  const ingredient = req.params.name;
  try {
    const ingredientFound = await Ingredient.find({ name: ingredient });
    console.log("ingredientFound----->",ingredientFound)
    if (ingredientFound.length === 0) {
      const newIngredient = await Ingredient.create({ name: ingredient });
      console.log("ing CREATED----->", newIngredient);
      res.status(201).json(newIngredient);
    } else {
      res.status(200).json(ingredientFound);
    }
  } catch (err) {
    console.log(err);
  }
});

// SEARCH ALL INGREDIENTS 


router.get("/search-all-ing", (req, res, next) => {
  Ingredient.find().sort({name: 1})
    .then((allIngredients) => res.json(allIngredients))
    .catch((err) => res.json(err));
});

//CREATE AN INGREDIENT

router.post("/ingredient/create", async (req, res) => {
  try {
    const { img, name, type } = req.body;
    const newIngredient = await Ingredient.create({ img, name, type });
    res.status(201).json(newIngredient);
  } catch (err) {
    console.log(err);
  }
});


//DELETE AN INGREDIENT

router.delete("/ingredient/:ingredientId", async (req, res) => {
  try {
    const { ingredientId } = req.params;
    await Ingredient.findByIdAndRemove(ingredientId);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});

// EDIT AN INGREDIENT

// router.put("/ingredient/:ingredientId", async (req, res) => {
//   try {
//     const { ingredientId } = req.params;
//     // console.log("---->",ingredientId)
//     const editIngredient = await Ingredient.findByIdAndUpdate(
//       ingredientId,
//       req.body,
//       { new: true }
//     );

//     res.status(200).json(editIngredient);
//   } catch (err) {
//     console.log(err);
//   }
// });

// SEARCH TOP INGREDIENTS

router.get("/top-ingredients", async (req, res) => {
  try {
    const popularIngredients = await Recipe.aggregate([
      { $unwind: "$ingredients" },
      { $sortByCount: "$ingredients" },
      { $limit: 3 },
    ]);
    const topIngredients = await Promise.all(
      popularIngredients.map(async (el) => {
        try {
          const ingredient = await Ingredient.findById(el);
          return { name: ingredient.name, imageUrl: ingredient.img };
        } catch (err) {
          console.log(err);
        }
      })
    );
    res.status(200).json(topIngredients);
  } catch (err) {
    console.log(err);
  }
});

// SEARCH BY INGREDIENTS

router.get("/recipes", async (req, res) => {
  const arrIngredientsID = req.query.ingredients.split(" ");
  try {
    const filteredRecipes = await Recipe.find({
      ingredients: { $in: arrIngredientsID },
    });
    res.status(200).json(filteredRecipes);
  } catch (err) {
    console.log(err);
  }
});


//FIND AN INGREDIENT

router.post("/search/:name", async (req, res) => {
  console.log("req.params.name------->", req.params.name)
  const ingredient = req.params.name;
  try {
    const ingredientFound = await Ingredient.find({ name: ingredient });
    res.status(200).json(ingredientFound)
    
  } catch (err) {
    console.log(err);
  }
})


// SEARCH ALL INGREDIENTS 

module.exports = router;
