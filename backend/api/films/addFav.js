const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User");
const FilmModel = require("../../models/Film");

router.post("/", async (req, res) => {
  try {
    var { film } = req.body;

    if (!req.user) {
      return res.json({
        status: false,
        errors: [" You can't add to Favorite movies !!"],
      });
    }

    const user = await UserModel.findById(req.user._id);

    const movie = await FilmModel.findOne({ id: film.id });

    if (!movie) {
      const saveMovie = await FilmModel.create(film);
      user.favMovies.push(saveMovie._id);
    } else {
      //check if user already liked the movie
      exist = false;
      user.favMovies.map((f) => {
        if (f == movie._id) {
          exist = true;
        }
      });

      if (exist) {
        return res.json({
          status: false,
          errors: [" you already added this movie to the Favorite movies !!"],
        });
      }

      user.favMovies.push(movie._id);
    }

    const saveUser = await user.save();

    /********************************************************/

    if (!saveUser) {
      return res.json({
        status: false,
        errors: ["An unexpected error occurred, please try again later"],
      });
    }

    return res.json({
      status: true,
      messages: [" You added this movie to favorite movies !!"],
      user: saveUser,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /films/addFav, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
