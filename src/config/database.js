const { Sequelize } = require("sequelize");

module.exports = new Sequelize("booking", "postgres", "hello", {
  host: "localhost",
  dialect: "postgres",
});
