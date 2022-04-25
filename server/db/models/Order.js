const Sequelize = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0,
    },
  },
});

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("Created", "Processing", "Cancelled", "Completed"),
    defaultValue: "Created",
    allowNull: false,
  },
  name: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  street: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING },
  zip: { type: Sequelize.STRING },
});

module.exports = { Order, Item };
