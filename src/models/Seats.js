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
        type: DataTypes.DATEONLY,
      },
      seatTime: {
        type: DataTypes.TIME,
      },
      seatNumber: {
        type: DataTypes.INTEGER,
      },
      seatPrice: {
        type: DataTypes.INTEGER,
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
