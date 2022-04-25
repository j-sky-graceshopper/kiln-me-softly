const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/celadonforsite_1000x1500.jpg?v=1624636802",
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.99,
    validate: {
      min: 0.01,
    },
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

Product.beforeCreate(async (product) => {
  if (product.imageUrl === "") {
    product.imageUrl = "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/celadonforsite_1000x1500.jpg?v=1624636802";
  }
});

module.exports = Product;
