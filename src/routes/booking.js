const express = require("express");
const {
  viewAllSeats,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getAllCategories,
  searchForSeats,
  getNewAddition,
  searchProductById,
  payments,
  getFeaturedProducts,
} = require("../controllers/booking");

const router = express.Router();

//Params
router.param("productId", getProductById);

//Routes
//Seats
router.post("/view/seats/:productId", viewAllSeats);
router.post("/view/seats", searchForSeats);

//Products
router.post("/search/products", searchProducts);
router.get("/new/addition/products", getNewAddition);
router.post("/search/product/id", searchProductById);
router.get("/featured/products", getFeaturedProducts);
//Categories
router.post("/get/products/category", getProductsByCategory);
router.get("/get/all/categories", getAllCategories);

//Payment
router.post("/payment", payments);

module.exports = router;
