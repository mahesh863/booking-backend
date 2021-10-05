const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = async () => {
  const Category = sequelize.define(
    "Categories",
    {
      categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      categoryName: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );

  try {
    await Category.sync();
    console.log(">>> Category  Sync...");
  } catch (err) {
    console.log(err);
  }
};
