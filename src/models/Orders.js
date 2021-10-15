const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = async () => {
  const Order = sequelize.define(
    "Order",
    {
      orderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      productDetails: {
        type: DataTypes.INTEGER,
      },
      seats: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      date: { type: DataTypes.DATE },

      time: {
        type: DataTypes.TIME,
      },
      orderDateAndTime: {
        type: DataTypes.DATE,
      },
    },
    { timestamps: true }
  );

  try {
    await Order.sync({ force: true });
    console.log(">>> Order  Sync...");
  } catch (err) {
    console.log(err);
  }
};
