require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");


const app = express();
require("./config")(app);


// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const recipeRouter = require("./routes/recipe.routes");
app.use("/api", recipeRouter);

const ingredientRouter = require("./routes/ingredient.routes");
app.use("/api", ingredientRouter);

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const profileRouter = require("./routes/auth.routes");
app.use("/api", profileRouter);

require("./error-handling")(app);

module.exports = app;
