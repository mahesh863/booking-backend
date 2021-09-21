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
        references: {
          model: "Products",
          key: "productId",
        },
      },

      orderDateAndTime: {
        type: DataTypes.DATE,
      },
    },
    { timestamps: true }
  );
  // Order.hasMany(sequelize.models.Products);

  try {
    await Order.sync();
    console.log(">>> Order  Sync...");
  } catch (err) {
    console.log(err);
  }
};
