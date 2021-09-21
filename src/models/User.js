const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = async () => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },

      phone: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },

      orders: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },

      SeatSeatId: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: true }
  );

  User.hasMany(sequelize.models.Order);

  try {
    await User.sync();
    console.log(">>> User Sync...");
  } catch (err) {
    console.log(err);
  }
};
