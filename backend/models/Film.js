const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const FilmSchema = new mongoose.Schema({
  id: Number,
  title: {
    type: String,
    required: true,
  },
  overview: String,
  original_title: String,
  vote_average: Number,
  vote_count: Number,
  adult: Boolean,
  backdrop_path: String,
  budget: Number,
  popularity: Number,
  poster_path: String,
  release_date: String,
  revenue: Number,
  genres: [
    {
      id: Number,
      name: String,
    },
  ],
  homepage: String,
  imdb_id: String,
  original_language: String,

  createDate: {
    type: Date,
    default: Date.now(),
  },
});

FilmSchema.plugin(autoIncreament.plugin, { model: "Film", startAt: 1 });

module.exports = mongoose.model("Film", FilmSchema, "films");
