const router = require("express").Router();
const {
  models: { Order, Item, Product },
} = require("../db");
module.exports = router;

router.get("/:cartId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.cartId);
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
