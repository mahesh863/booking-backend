const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");

exports.createProduct = async (req, res) => {
  const Products = sequelize.models.Products;
  const { productName, productAddress } = req.body;

  try {
    await Products.create({
      productName: productName,
      productAddress: productAddress,
    });
    res.json({
      message: "Product Created Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: "Product Creation Failed!",
    });
  }
};

exports.createSeats = async (req, res) => {
  const Seats = sequelize.models.Seats;
  var { creationDate, totalNumberOfSeats, productId } = req.body;

  creationDate = parseInt(creationDate);
  totalNumberOfSeats = parseInt(totalNumberOfSeats);
  productId = parseInt(productId);

  var bulkCreateData = [];

  for (i = 1; i <= totalNumberOfSeats; i++) {
    bulkCreateData.push({
      productId: productId,
      seatDate: creationDate,
      seatNumber: i,
    });
  }

  try {
    await Seats.bulkCreate(bulkCreateData);
    console.log(">>> Seats Created");

    res.status(200).json({
      message: "Seats Creation Successful!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "Failed To Create Seats!",
    });
  }
};

exports.editProduct = (req, res) => {
  //
};

exports.deleteProduct = (req, res) => {
  //
};
