const express = require("express");
const {
  createProduct,
  editProduct,
  deleteProduct,
  createSeats,
  createCategory,
  editCategory,
  deleteCategory,
  getAllProducts,
} = require("../controllers/admin");
const { getProductById } = require("../controllers/booking");

const router = express.Router();

router.param("productId", getProductById);

router.post("/create", createProduct);
router.put("/edit", editProduct);
router.delete("/delete", deleteProduct);
router.get("/get/all/products", getAllProducts);

//Seats
router.post("/create/seats/:productId", createSeats);

//Categories
router.post("/create/category", createCategory);
router.put("/edit/category", editCategory);
router.delete("/delete/category", deleteCategory);

module.exports = router;
