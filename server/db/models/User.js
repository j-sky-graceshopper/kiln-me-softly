const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Order, Item } = require("./Order");
const Product = require("./Product");
const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.prototype.getCart = async function (status) {
  let [cart, created] = await Order.findOrCreate({
    where: { userId: this.id, status },
  });
  return await Order.findByPk(cart.id, {
    include: [{ model: Item, include: [Product] }],
  });
};

User.prototype.removeFromCart = async function (product) {
  const cart = await this.getCart("Created");
  const item = cart.items.find((item) => item.productId === product.id);
  item.quantity--;
  if (item.quantity) {
    await item.save();
  } else {
    await item.destroy();
  }
  return this.getCart("Created");
};

User.prototype.addToCart = async function (product) {
  const cart = await this.getCart("Created");
  let item = cart.items.find((item) => item.productId === product.id);
  if (item) {
    item.quantity++;
    await item.save();
  } else {
    await Item.create({ productId: product.id, orderId: cart.id });
  }
  return this.getCart("Created");
};

User.prototype.updateCartItem = async function (updatedItem) {
  const cart = await this.getCart("Created");
  let item = cart.items.find((item) => item.productId === updatedItem.productId);
  if (item) {
    item.quantity = updatedItem.quantity
    await item.save()
  }
  return await this.getCart("Created")
}


User.prototype.checkout = async function () {
  const cart = await this.getCart("Created");
  cart.status = "Processing";
  await cart.save();
  return Order.findByPk(cart.id, {
    include: [{ model: Item, include: [Product] }],
  });
};

User.prototype.complete = async function () {
  let cart = await Order.findOne({
    where: { userId: this.id, status: "Processing" },
  });
  cart.status = "Completed";
  await cart.save();
  return Order.findByPk(cart.id, {
    include: [{ model: Item, include: [Product] }],
  });
};

User.prototype.cancel = async function () {
  let cart = await Order.findOne({
    where: { userId: this.id, status: "Processing" },
  });
  cart.status = "Cancelled";
  await cart.save();
  return Order.findByPk(cart.id, {
    include: [{ model: Item, include: [Product] }],
  });
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
