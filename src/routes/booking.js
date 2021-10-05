const express = require("express");
const {
  bookSeats,
  editBooking,
  cancelBooking,
  viewAllSeats,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getAllCategories,
  searchForSeats,
  getNewAddition,
  searchProductById,
} = require("../controllers/booking");

const router = express.Router();

//Params
router.param("productId", getProductById);

//Routes

//Seats
router.post("/view/seats/:productId", viewAllSeats);
router.post("/book/seats/:productId", bookSeats);
router.put("/edit/booking/:productId", editBooking);
router.delete("/cancel/booking/:productId", cancelBooking);
router.post("/view/seats", searchForSeats);

//Products
router.post("/search/products", searchProducts);
router.get("/new/addition/products", getNewAddition);
router.post("/search/product/id", searchProductById);
//Categories
router.post("/get/products/category", getProductsByCategory);
router.get("/get/all/categories", getAllCategories);

module.exports = router;
