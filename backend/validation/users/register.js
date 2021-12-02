const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/User");

module.exports = async ({
  name,
  username,
  email,
  password,
  passwordConfirm,
  phoneNumber,
}) => {
  try {
    let errors = [];

    if (!name) errors.push("name is required");
    if (!username) errors.push(" username is required ");
    if (!email) errors.push(" email is required ");
    if (!password) errors.push(" password is required");
    if (!passwordConfirm) errors.push(" password confirmation is required ");
    if (!phoneNumber) errors.push(" phoneNumber is required ");

    //Send any empty errors
    if (errors.length !== 0)
      return {
        status: false,
        errors,
      };

    //Unique
    if (await UserModel.findOne({ email }))
      errors.push(" This email already exist ");
    if (await UserModel.findOne({ username }))
      errors.push(" This username already exist ");
    if (await UserModel.findOne({ phoneNumber }))
      errors.push("  This phone number already exist ");

    //Password
    if (password !== passwordConfirm)
      errors.push(
        " The password field and confirmation field are not identical  "
      );
    if (password.length < 6)
      errors.push(" The password should have at least 6 caracter ");

    //Email
    if (!emailValidator.validate(email))
      errors.push(" This email is not valid");

    if (errors.length === 0) {
      //hash password
      password = await bcrypt.hash(password, 10);

      const user = {
        name,
        username,
        email,
        password,
        phoneNumber,
      };

      return {
        status: true,
        user,
      };
    } else {
      return {
        status: false,
        errors,
      };
    }
  } catch (e) {
    return {
      status: false,
      errors: [e.message],
    };
  }
};
