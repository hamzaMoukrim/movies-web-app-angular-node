const express = require("express");
const router = express.Router();
const CommentModel = require("../../models/Comment");

router.get("/:id", async (req, res) => {
  try {
    const filmId = req.params.id;

    const comments = await CommentModel.findOne({ id: filmId }).populate(
      "commentaires.user"
    );

    if (!comments) {
      return res.json({
        status: true,
        messages: [" getting comments !!"],
        comments: [],
      });
    }

    return res.json({
      status: true,
      messages: [" getting comments !!"],
      comments: comments.commentaires,
    });
    /********************************************************/
  } catch (e) {
    console.log(`Error in /comments/get, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
