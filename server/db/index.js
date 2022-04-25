//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Review = require("./models/Review");
const Category = require("./models/Category");
const { Order, Item } = require("./models/Order");

//associations
Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

Review.belongsTo(User, { foreignKey: { allowNull: false } });
User.hasMany(Review);

//onDelete: Cascade = When a product is deleted, then the reviews are also deleted.
Review.belongsTo(Product, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Product.hasMany(Review);

Item.belongsTo(Order, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Order.hasMany(Item);

Item.belongsTo(Product, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Product.hasMany(Item);

Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Product,
    Review,
    Category,
    Order,
    Item,
  },
};
