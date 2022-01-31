// routes/movies.routes.js

const express = require("express");
const router = express.Router();

// **** require Movie model in order to use it ****
const User = require("../models/User.model");

// ********* require fileUploader in order to use it *********
// const fileUploader = require("../config/cloudinary.config");

// GET "/api/movies" => Route to list all available movies
// router.get("/movies", (req, res, next) => {
//     User.find()
//     .then((moviesFromDB) => {
//       res.status(200).json(moviesFromDB)
//       console.log(moviesFromDB)
//     })
//     .catch(err => next(err));
// });

// GET "/api/user" => Route to list all available users
router.get("/user/:id", async (req, res) => {
  const id = req.params.id
  try {
      const user = await User.findById(id)
      res.status(200).json(user);
  }catch(err){
      console.log(err);
  }
})




// // POST "/api/upload" => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
// router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
//   // console.log("file is: ", req.file)

//   if (!req.file) {
//     next(new Error("No file uploaded!"));
//     return;
//   }
  
//   // Get the URL of the uploaded file and send it as a response.
//   // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
//   res.json({ secure_url: req.file.path });
// });

// // POST '/api/movies' => for saving a new movie in the database
// router.post('/movies', (req, res, next) => {
//   // console.log('body: ', req.body); ==> here we can see that all
//   // the fields have the same names as the ones in the model so we can simply pass
//   // req.body to the .create() method

//   Movie.create(req.body)
//     .then(createdMovie => {
//       // console.log('Created new movie: ', createdMovie);
//       res.status(200).json(createdMovie);
//     })
//     .catch(err => next(err));
// });

module.exports = router;
