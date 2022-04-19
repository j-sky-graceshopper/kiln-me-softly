const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  content: {
    type: Sequelize.TEXT,
    validate: {
      len: {
        args: [10],
        msg: "Review must contain at least 10 characters",
      },
    },
  },
});

module.exports = Review;
