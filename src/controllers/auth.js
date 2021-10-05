const sequelize = require("../config/database");
const crypto = require("crypto");
const { v4: uuid } = require("uuid");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const securePassword = (password, salt) => {
  const encry_password = crypto
    .createHash("sha256", salt)
    .update(password)
    .digest("hex");

  return encry_password;
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userModel = sequelize.models.User;

  try {
    const user = await userModel.findOne({ where: { email: email } });

    if (user) {
      res.status(400).json({
        err: "Account Already Exists!",
      });

      return;
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const salt = uuid();
    const encry_password = securePassword(password, salt);

    await userModel.create({
      name: name,
      email: email,
      password: encry_password,
      salt: salt,
    });
    console.log(">>> Account Created...");
    res.status(200).json({
      message: "Account Created Successfully!",
    });
  } catch (err) {
    res.json({
      err: "Something Went Wrong!",
    });
  }
};

exports.signin = async (req, res) => {
  const userModel = sequelize.models.User;
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ where: { email: email } });

    if (user) {
      const salt = user.salt;

      const providedPassword = securePassword(password, salt);

      if (providedPassword === user.password) {
        const token = jwt.sign({ _id: user.email }, process.env.SECRET);
        res.cookie("token", token, { expire: new Date() + 60 * 60 * 24 * 10 });

        const { name, email, userId, phone, orders } = user;

        res.status(200).json({
          message: "Signin Success!",
          token: token,
          user: {
            name,
            email,
            userId,
            phone,
            orders,
          },
        });
      } else {
        res.status(406).json({
          err: "Wrong Credentials!",
        });
      }
    } else {
      res.status(404).json({
        err: "Email Not Found!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "SignOut Successful",
  });
};

//Check If Signed In
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

//Check If Authenticated
exports.isAuthenticated = (req, res, next) => {
  const checker =
    req.profile && req.auth && req.profile.useid == req.auth.userId;

  if (!checker) {
    return res.status(401).json({
      err: "Access Denied",
    });
  }

  next();
};

//Get user By ID
exports.getUserById = async (req, res, next, id) => {
  const userModel = sequelize.models.User;

  try {
    const user = await userModel.findByPk(id);
    if (err) {
      req.profile = user;
      next();
    } else {
      res.json({
        err: "User Not Found!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
