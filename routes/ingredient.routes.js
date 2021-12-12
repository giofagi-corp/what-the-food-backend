const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Ingredient = require("../models/Ingredient.model");

//CREATE AN INGREDIENT

router.post("/ingredient/create", async (req, res) => {
  try {
    const { img, name, type } = req.body;
    const newIngredient = await Ingredient.create({ img, name, type })
      .res.status(201)
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
    console.log("---->",ingredientId)
    const editIngredient = await Ingredient.findByIdAndUpdate(ingredientId,req.body,{new:true})
   
    res.status(200).json(editIngredient)
  }
  catch(err){
    console.log(err)
  }
})

// SEARCH TOP INGREDIENTS 





