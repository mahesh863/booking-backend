const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

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
  const t = await sequelize.transaction({isolationLevel: });  // Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE

  const Seat = sequelize.models.Seats;
  const { seatId } = req.body;

  try {
    // seatId.map(async (seat) => {
    const seatBooking = await Seat.update(
      { booked: true },
      { where: { seatId: seatId } },
      { lock: (await t).LOCK.KEY_SHARE }
    );

    // });
    setTimeout(async () => {
      await t.commit();
    }, 10000);

    console.log(seatBooking);

    res.json({
      message: "Booked Successfully!",
    });
  } catch (err) {
    t.rollback();
    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

exports.bookSeats2 = async (req, res) => {
  const t = await sequelize.transaction();

  const Seat = sequelize.models.Seats;
  const { seatId } = req.body;

  try {
    const seatBooking = await Seat.update(
      { booked: true },
      { where: { seatId: seatId } },
      { lock: (await t).LOCK.KEY_SHARE }
    );

    await t.commit();
    console.log(seatBooking);

    res.json({
      message: "Booked Successfully!",
    });
  } catch (err) {
    t.rollback();
    res.status(400).json({
      err: "Something Went Wrong!",
    });
  }
};

exports.editBooking = (req, res) => {};
exports.cancelBooking = (req, res) => {};

//Middlewares
exports.getProductById = async (req, res, next, id) => {
  const Products = sequelize.models.Products;

  try {
    const data = await Products.findOne({ where: { productId: id } });

    if (data !== null) {
      req.productId = id;
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
