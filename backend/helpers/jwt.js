const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN } = require("../config");
const UserModel = require("../models/User");

module.exports = {
  createToken: async (payload) => {
    try {
      const token = await jwt.sign(payload, ACCESS_TOKEN);
      return token;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  checkToken: async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) {
        req.user = null;
        return next();
      }

      const user = await jwt.verify(token, ACCESS_TOKEN);

      //check DB existence
      const searchUser = await UserModel.findOne({ _id: user._id });
      if (searchUser) {
        req.user = searchUser;
        return next();
      } else {
        req.user = null;
        return next();
      }
    } catch (e) {
      console.log(e);
      return next();
    }
  },
};
