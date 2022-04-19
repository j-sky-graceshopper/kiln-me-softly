//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Review = require("./models/Review");
const Category = require("./models/Category");

//associations
Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);

module.exports = {
  db,
  models: {
    User,
    Product,
    Review,
    Category,
  },
};
