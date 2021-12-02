const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,

  phoneNumber: {
    type: String,
    default: 0,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  favMovies: {
    type: [Number],
    required: false,
    defautlt: [],
    ref: "Film",
  },

  createDate: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.plugin(autoIncreament.plugin, { model: "User", startAt: 1 });

module.exports = mongoose.model("User", UserSchema, "users");
