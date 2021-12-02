const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User");
const CommentModel = require("../../models/Comment");

router.post("/", async (req, res) => {
  try {
    var { film, comment } = req.body;

    if (!req.user) {
      return res.json({
        status: false,
        errors: [" You can't add comment !!"],
      });
    }

    const user = await UserModel.findById(req.user._id);

    const commentaire = await CommentModel.findOne({ id: film.id }).populate(
      "commentaires.user"
    );

    let saveComment;

    if (!commentaire) {
      let commentaires = [{ user: user, comment: comment }];
      saveComment = await CommentModel.create({ id: film.id, commentaires });
    } else {
      commentaire.commentaires.push({ user: user, comment: comment });

      saveComment = await commentaire.save();
    }

    /********************************************************/

    if (!saveComment) {
      return res.json({
        status: false,
        errors: ["An unexpected error occurred, please try again later"],
      });
    }

    return res.json({
      status: true,
      messages: [" You added a comment to this movie !!"],
      comments: saveComment.commentaires,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /films/addComment, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
