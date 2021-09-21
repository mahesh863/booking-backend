const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = async () => {
  const Product = sequelize.define(
    "Products",
    {
      productId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      productName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      productAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  try {
    await Product.sync();
    console.log(">>> Product Sync...");
  } catch (err) {
    console.log(err);
  }
};
