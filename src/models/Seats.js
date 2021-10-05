const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = async () => {
  const Seats = sequelize.define(
    "Seats",
    {
      seatId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "productId",
        },
      },
      seatDate: {
        type: DataTypes.STRING,
      },
      seatTime: {
        type: DataTypes.STRING,
      },
      seatNumber: {
        type: DataTypes.INTEGER,
      },
      seatPrice: {
        type: DataTypes.INTEGER,
      },
      bookedBy: {
        type: DataTypes.STRING,
      },
      booked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );

  Seats.belongsTo(sequelize.models.Products);
  try {
    await Seats.sync();
    console.log(">>> Seats Sync...");
  } catch (err) {
    console.log(err);
  }
};
