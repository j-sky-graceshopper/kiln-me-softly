const router = require("express").Router();
const {
  models: { User, Order },
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

router.put("/checkout", async (req, res, next) => {
  try {
    // console.log("TOKEN:", req.headers);
    // const user = await User.findByToken(req.headers.authorization);
    // res.send(await user.checkout());
    console.log("BODY", req.body);
    const order = await Order.findOne({
      where: { id: req.body.cartId, status: "Created" },
    });
    if (order) {
      order.status = "Processing";
      await order.save();
      res.send(await Order.findByPk(req.body.cartId));
    }
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
