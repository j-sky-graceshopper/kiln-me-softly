const router = require("express").Router();
const {
  models: { User, Order, Item, Product },
} = require("../db");
module.exports = router;

// router.get("/", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     if (user) {
//       res.send(await user.getCart(req.headers.status));
//     }
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/:cartId", async (req, res, next) => {
  try {
    console.log("in route to get order", req.params);
    const order = await Order.findByPk(req.params.cartId);
    console.log("found order", order);
    if (order) {
      res.send(
        await Order.findByPk(req.params.cartId, {
          include: [{ model: Item, include: [Product] }],
        })
      );
    }
  } catch (err) {
    next(err);
  }
});
