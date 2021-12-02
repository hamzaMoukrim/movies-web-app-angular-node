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
        errors: [" You can't remove fro Favorite movies !!"],
      });
    }

    const user = await UserModel.findById(req.user._id);

    const movie = await FilmModel.findOne({ id: film.id });

    const index = user.favMovies.indexOf(movie._id);
    if (index > -1) {
      user.favMovies.splice(index, 1);
    } else {
      return res.json({
        status: false,
        errors: ["The movie is not in the favorite list"],
      });
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
      messages: [" Remove from the favorite succeed !!"],
      user: saveUser,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /films/removeFav, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
