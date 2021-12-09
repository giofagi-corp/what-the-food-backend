const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/Recipe.model");
const Ingredient = require("../models/Ingredient.model");

//  POST /api/Recipe  -  Creates a new recipe
router.post("/recipies", (req, res, next) => {
  const { title, description } = req.body;

  Recipe.create({ title, description, tasks: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/Recipe -  Retrieves all of the projects
router.get("/recipies", (req, res, next) => {
  Recipe.find()
    // .populate("tasks")
    .then((allRecipies) => res.json(allRecipies))
    .catch((err) => res.json(err));
});

//  GET /api/recipies/:projectId -  Retrieves a specific recipe by id
router.get("/recipies/:recipiesId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipiesId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Project document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Recipe.findById(recipeId)
    // .populate("tasks")
    .then((project) => res.status(200).json(project))
    .catch((error) => res.json(error));
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put("/recipe/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndUpdate(recipeId, req.body, { new: true })
    .then((updatedRecipe) => res.json(updatedRecipe))
    .catch((error) => res.json(error));
});

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete("/projects/:projectId", (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(recipeId)
    .then(() =>
      res.json({
        message: `Project with ${recipeId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
