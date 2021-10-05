const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//Routes
const adminRoute = require("./src/routes/admin");
const bookRoute = require("./src/routes/booking");
const authRoute = require("./src/routes/auth");

//Database
const sequelize = require("./src/config/database");

//Models
const User = require("./src/models/User");
const Orders = require("./src/models/Orders");
const Seats = require("./src/models/Seats");
const Products = require("./src/models/Products");
const Category = require("./src/models/Category");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", adminRoute);
app.use("/api", bookRoute);
app.use("/api", authRoute);

const models = async () => {
  await Category();
  await Products();
  await Seats();
  await Orders();
  await User();
};

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Has Been Established!");
  })
  .catch((err) => {
    console.log("Error");
  });

models();

const port = 8000;
app.listen(port, () => {
  console.log(">>> App is running!");
});
