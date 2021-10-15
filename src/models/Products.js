const { DataTypes, Deferrable } = require("sequelize");
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

      category: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.Categories,
          key: "categoryId",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },

      pricePerSeat: {
        type: DataTypes.INTEGER,
      },

      productImage: {
        type: DataTypes.STRING(1000),
        defaultValue: "",
      },
      totalNumberOfSeats: {
        type: DataTypes.INTEGER,
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );

  Product.belongsTo(sequelize.models.Categories);

  try {
    await Product.sync();
    console.log(">>> Product Sync...");
  } catch (err) {
    console.log(err);
  }
};
