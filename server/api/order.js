const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");

module.exports = router;

router.get("/:id", async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: {
                userId: req.params.id
            }
        })
        res.send(orders)
    } catch (err) {
      next(err);
    }
  });
