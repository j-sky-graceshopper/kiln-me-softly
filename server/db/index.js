//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Review = require("./models/Review");
const Category = require("./models/Category");

//associations could go here!
Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Review,
    Category,
  },
};
