const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User");
const FilmModel = require("../../models/Film");

router.get("/:id", async (req, res) => {
  try {
    if (!req.user) {
      return res.json({
        status: false,
        errors: [" You can't get Favorite movies !!"],
      });
    }

    const currentPage = req.params.id;

    const user = await UserModel.findById(req.user._id).populate("favMovies");

    if (!user) {
      return res.json({
        status: false,
        errors: [" You can't get Favorite movies !!"],
      });
    }

    const total_results = user.favMovies.length;

    const total_pages = Math.ceil(total_results / 20);
    let fav = [];
    if (currentPage <= total_pages) {
      for (
        let i = (currentPage - 1) * 20;
        i < 20 * currentPage && total_results > i;
        i++
      ) {
        fav.push(user.favMovies[i]);
      }

      return res.json({
        status: true,
        fav: fav,
        allFav: user.favMovies,
        total_results,
        total_pages,
      });
    } else {
      return res.json({
        status: false,
        errors: [" No Favorite movies to show !!"],
      });
    }

    /********************************************************/
  } catch (e) {
    console.log(`Error in /favMovies/get, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
