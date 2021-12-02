const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const CommentSchema = new mongoose.Schema({
  id: Number,
  commentaires: [
    {
      user: {
        type: Number,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createDate: {
    type: Date,
    default: Date.now(),
  },
});

CommentSchema.plugin(autoIncreament.plugin, { model: "Comment", startAt: 1 });

module.exports = mongoose.model("Comment", CommentSchema, "comments");
