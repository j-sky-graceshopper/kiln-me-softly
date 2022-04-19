const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  content: {
    type: Sequelize.TEXT,
  },
});

module.exports = Review;
