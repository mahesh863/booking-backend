const sequelize = require("../config/database");

//Serch Seats
exports.searchForSeats = async (req, res) => {
  const Seats = sequelize.models.Seats;

  const { productId, seatDate } = req.body;

  try {
    const seats = await Seats.findAll({
      where: {
        productId: productId,
        seatDate: seatDate,
      },
      attributes: [
        "seatId",
        "seatNumber",
        "booked",
        "seatTime",
        "seatDate",
        "seatNumber",
        "seatPrice",
      ],
    });

    res.status(200).json({
      data: seats,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

exports.viewAllSeats = async (req, res) => {
  const Seats = sequelize.models.Seats;
  var { date } = req.body;
  date = parseInt(date);

  try {
    const seats = await Seats.findAll({
      attributes: ["seatId", "seatNumber", "booked"],
      where: {
        [Op.and]: [{ productId: req.productId }, { seatDate: date }],
      },
    });

    if (seats !== null) {
      res.status(200).json({
        seats,
      });
    } else {
      res.status(404).json({
        err: "No Seats Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

exports.bookSeats = async (req, res) => {
  const Seat = sequelize.models.Seats;
  const { seatId } = req.body;

  try {
    seatId.map(async (seat) => {
      await Seat.update({ booked: true }, { where: { seatId: seat } });
    });

    res.json({
      message: "Booked Successfully!",
    });
  } catch (err) {
    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

//Edit Booking
exports.editBooking = (req, res) => {};

//Cancel Booking
exports.cancelBooking = (req, res) => {};

//Search For Product
exports.searchProducts = async (req, res) => {
  const Products = sequelize.models.Products;

  const { productName } = req.body;

  try {
    const results = await Products.findAll({
      where: {
        productName: productName,
      },
    });

    res.status(200).json({
      data: results,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

//Search Product By Id
exports.searchProductById = async (req, res) => {
  const Products = sequelize.models.Products;

  const { productId } = req.body;

  try {
    const results = await Products.findAll({
      where: {
        productId: productId,
      },
    });

    res.status(200).json({
      data: results,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

//Get Products By Category
exports.getProductsByCategory = async (req, res) => {
  const Products = sequelize.models.Products;
  var { categoryId } = req.body;
  // categoryId = parseInt(categoryId);
  console.log(categoryId);

  try {
    const results = await Products.findAll({
      where: {
        category: categoryId,
      },
    });
    res.status(200).json({
      data: results,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

//Middlewares
exports.getProductById = async (req, res, next, id) => {
  const Products = sequelize.models.Products;

  try {
    const data = await Products.findOne({
      where: { productId: id },
      attributes: ["productId", "pricePerSeat", "totalNumberOfSeats"],
    });

    if (data !== null) {
      req.product = data.dataValues;
      next();
    } else {
      res.status(404).json({
        err: "Product Not Found!",
      });
    }
  } catch (err) {
    res.status(400).json({
      err: "Something went Wrong!",
    });
  }
};

//Get All Categories
exports.getAllCategories = async (req, res) => {
  const Category = sequelize.models.Categories;

  try {
    const categories = await Category.findAll({
      attributes: ["categoryId", "categoryName"],
    });
    res.status(200).json({
      data: categories,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "Failed To Get Categories!",
    });
  }
};

//Get New Addition
exports.getNewAddition = async (req, res) => {
  const Products = sequelize.models.Products;

  try {
    const products = await Products.findAll({
      limit: 6,
      attributes: [
        "productName",
        "productAddress",
        "productId",
        "pricePerSeat",
      ],
    });

    res.status(200).json({
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "Failed To Get All Products!",
    });
  }
};
