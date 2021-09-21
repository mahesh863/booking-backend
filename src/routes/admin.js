const express = require("express");
const {
  createProduct,
  editProduct,
  deleteProduct,
  createSeats,
} = require("../controllers/admin");

const router = express.Router();

router.post("/create", createProduct);
router.post("/create/seats", createSeats);
router.put("/edit", editProduct);
router.delete("/delete", deleteProduct);

module.exports = router;
