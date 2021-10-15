const sequelize = require("../config/database");

//Middleware
exports.getUserById = async (req, res, next, id) => {
  const User = sequelize.model.User;

  try {
    const user = await User.findOne({
      userId: id,
    });

    if (user) {
      req.user = user;
      next();
    }

    res.status(404).json({
      err: "User Not Found",
    });
  } catch (err) {
    res.status(400).json({
      err: "Something Went Wrong!",
    });
    console.log(err);
  }
};
