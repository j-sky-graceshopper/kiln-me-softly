const router = require("express").Router();
const {
  models: { User, Order, Item, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      res.send(await user.getCart(req.headers.status));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/change-status", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.cartId);
    order.status = req.body.status;
    await order.save();
    res.send(await Order.findByPk(req.body.cartId));
  } catch (err) {
    next(err);
  }
});

router.put("/shipping", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.cartId);
    order.update(req.body.address);
    order.status = "Completed";
    await order.save();
    res.send(
      await Order.findByPk(req.body.cartId, {
        include: [{ model: Item, include: [Product] }],
      })
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/remove", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (err) {
    next(err);
  }
});
