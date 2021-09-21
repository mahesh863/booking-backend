const express = require("express");
const {
  bookSeats,
  editBooking,
  cancelBooking,
  viewAllSeats,
  getProductById,
  bookSeats2,
} = require("../controllers/user");

const router = express.Router();

//Params
router.param("productId", getProductById);

//Routes
router.post("/view/seats/:productId", viewAllSeats);
router.post("/book/seats/:productId", bookSeats);
router.post("/book/seats/2/:productId", bookSeats2);
router.put("/edit/booking/:productId", editBooking);
router.delete("/cancel/booking/:productId", cancelBooking);

module.exports = router;
