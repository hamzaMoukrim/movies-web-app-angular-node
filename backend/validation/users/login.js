const bcrypt = require("bcrypt");
const UserModel = require("../../models/User");

module.exports = async ({ username, password }) => {
  try {
    let errors = [];

    //Required
    if (!username) errors.push("you should enter your username");
    if (!password) errors.push("you should enter your password ");

    //Send if any is empty
    if (errors.length !== 0) {
      return {
        status: false,
        errors,
      };
    }

    //DB Check
    let userSearch = await UserModel.findOne({ username: username });
    userSearch = userSearch && userSearch.toObject();

    if (!userSearch) {
      errors.push(
        " The user name you entered does not correspond to a registered user."
      );
    }

    if (errors.length !== 0) {
      return {
        status: false,
        errors,
      };
    }

    if (!(await bcrypt.compare(password, userSearch.password))) {
      errors.push(
        " The user name and password combination you entered does not correspond to a registered user."
      );
    }

    if (errors.length !== 0) {
      return {
        status: false,
        errors,
      };
    }
    //delete the password from user object
    delete userSearch.password;

    return {
      status: true,
      user: userSearch,
    };
  } catch (e) {
    return {
      status: false,
      errors: [e.message],
    };
  }
};
