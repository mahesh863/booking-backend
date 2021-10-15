const sequelize = require("../config/database");
const { Transaction } = require("sequelize");

var Secret_Key = "STRIPE_KEY";

const stripe = require("stripe")(Secret_Key);

//Seats
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

//View Seats
exports.viewAllSeats = async (req, res) => {
  const Seats = sequelize.models.Seats;
  var { date, productId } = req.body;
  date = parseInt(date);

  try {
    const seats = await Seats.findAll({
      where: {
        [Op.and]: [{ productId: productId }, { seatDate: date }],
      },
      order: [["seatNumber", "ASC"]],
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

//Payments and Booking
exports.payments = async (req, res) => {
  const { stripeToken, amount, seats, userId, productId, seatDate, seatTime } =
    req.body;

  console.log(req.body);

  const Order = sequelize.models.Order;
  const User = sequelize.models.User;
  const Seat = sequelize.models.Seats;

  const t = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
  });

  try {
    seats.map(async (seat) => {
      const selectedSeats = await Seat.findOne({
        where: { seatId: seat },
        lock: true,
        transaction: t,
      });

      if (selectedSeats.booked == true) {
        t.rollback();
        res.status(400).json({
          err: "One or more of The Seats Has Already Been Booked!",
        });
        return;
      }
      await Seat.update(
        { booked: true },
        { where: { seatId: seat }, transaction: t }
      );
    });

    stripe.customers
      .create({
        source: stripeToken,
      })
      .then((customer) => {
        return stripe.paymentIntents.create({
          amount: amount,
          currency: "inr",
          payment_method_types: ["card"],
        });
      })
      .then(async (charge) => {
        t.commit();

        try {
          let order = await Order.create({
            seats: seats,
            productDetails: productId,
            date: seatDate,
            time: seatTime,
          });
          console.log(">>>", order);
        } catch (err) {
          console.log(err);
        }

        res.status(200).send({
          message: "Booking Success!",
        });
      })
      .catch((err) => {
        console.log(err);
        t.rollback();
        res.status(400).json({
          err: "Payment Failed!",
        });
      });
  } catch (err) {
    t.rollback();
    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

//Products
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
        "productImage",
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

exports.getFeaturedProducts = async (req, res) => {
  const Products = sequelize.models.Products;

  try {
    const featuredProducts = await Products.findAll({
      limit: 5,
      attributes: [
        "productName",
        "productAddress",
        "productId",
        "pricePerSeat",
        "productImage",
      ],
      where: {
        isFeatured: true,
      },
    });
    res.status(200).json({
      data: featuredProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

//Category
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

//Get Products By Category
exports.getProductsByCategory = async (req, res) => {
  const Products = sequelize.models.Products;
  var { categoryId } = req.body;

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
      attributes: [
        "productId",
        "pricePerSeat",
        "totalNumberOfSeats",
        "productImage",
      ],
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
