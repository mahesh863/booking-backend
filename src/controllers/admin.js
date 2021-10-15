const sequelize = require("../config/database");
const formidable = require("formidable");
const admin = require("firebase-admin");
const { v4: uuid } = require("uuid");

//Create New Product
exports.createProduct = async (req, res) => {
  const Products = sequelize.models.Products;

  const form = new formidable.IncomingForm({
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
        err: "Failed To Upload!",
      });
    }

    if (files.productImage) {
      let path = files.productImage.path;
      console.log(path);
      const options = {
        destination: `products/${uuid()}_${files.productImage.name}`,
        predefinedAcl: "publicRead",
        validation: "crc32c",
      };
      admin
        .storage()
        .bucket()
        .upload(path, options, async (err, file, apiResponse) => {
          if (err || !file) {
            return res.status(400).json({
              err: "Failed To Upload!",
            });
          }

          if (file) {
            const imageUrl = file.publicUrl();
            const {
              productName,
              productAddress,
              totalNumberOfSeats,
              pricePerSeat,
              category,
              isFeatured,
            } = fields;

            try {
              await Products.create({
                productName: productName,
                productAddress: productAddress,
                totalNumberOfSeats: totalNumberOfSeats,
                pricePerSeat: pricePerSeat,
                category: category,
                productImage: imageUrl,
                isFeatured: isFeatured,
              });
              res.status(200).json({
                message: "Product Created Successfully!",
              });
            } catch (err) {
              console.log(err);
              res.status(400).json({
                err: "Product Creation Failed!",
              });
            }
          }
        });
    }
  });
};
//Edit Product
exports.editProduct = async (req, res) => {
  const Products = sequelize.models.Products;
  const {
    productName,
    productAddress,
    totalNumberOfSeats,
    pricePerSeat,
    category,
  } = req.body;

  try {
    await Products.update(
      {
        productName: productName,
        productAddress: productAddress,
        totalNumberOfSeats: totalNumberOfSeats,
        pricePerSeat: pricePerSeat,
        category: category,
      },
      {
        where: {
          productId: productId,
        },
      }
    );

    res.status(200).json({
      message: "Product Updated Successfully!",
    });
  } catch (err) {
    res.status(400).json({
      err: "Product Update Failed!",
    });
  }
};

//Delete Product
exports.deleteProduct = async (req, res) => {
  const Products = sequelize.models.Products;
  const { productId } = req.body;

  try {
    await Products.destroy({
      where: {
        productId: productId,
      },
    });
    res.json({
      message: "Product Deleted Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: "Product Deletion Failed!",
    });
  }
};

//Get All Products
exports.getAllProducts = async (req, res) => {
  const Products = sequelize.models.Products;

  try {
    const products = await Products.findAll({
      attributes: ["productName", "productId"],
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

//Seats
//Create Seats
exports.createSeats = async (req, res) => {
  const Seats = sequelize.models.Seats;
  var { productId, showTime, showDate } = req.body;

  const { pricePerSeat, totalNumberOfSeats } = req.product;

  const check = await Seats.findAll({
    where: {
      productId: productId,
      seatDate: showDate,
    },
  });

  if (check.length !== 0) {
    res.status(400).json({
      err: "Seats Already Exists!",
    });

    return;
  }

  var bulkCreateData = [];

  for (i = 1; i <= totalNumberOfSeats; i++) {
    bulkCreateData.push({
      productId: productId,
      seatDate: showDate,
      seatTime: showTime,
      seatNumber: i,
      seatPrice: pricePerSeat,
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

//Categories
//Create
exports.createCategory = async (req, res) => {
  const Category = sequelize.models.Categories;
  const { categoryName } = req.body;

  try {
    await Category.create({
      categoryName: categoryName,
    });
    res.status(200).json({
      message: "Category Created Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "Category Creation Failed!",
    });
  }
};

//Edit
exports.editCategory = async (req, res) => {
  const Category = sequelize.models.Category;
  const { categoryId, newName } = req.body;

  try {
    await Category.update(
      { categoryName: newName },
      {
        where: {
          categoryId: categoryId,
        },
      }
    );
    res.json({
      message: "Category Edited Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: "Failed To Edit Category!",
    });
  }
};

//Delete
exports.deleteCategory = async (req, res) => {
  const Category = sequelize.models.Categories;
  const { categoryId } = req.body;

  try {
    await Category.destroy({
      where: {
        categoryId: categoryId,
      },
    });
    res.status(200).json({
      message: "Category Delete Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "Category Delete Failed!",
    });
  }
};
