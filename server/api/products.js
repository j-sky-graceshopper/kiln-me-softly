const router = require("express").Router();
const {
  models: { Product, Review },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // // explicitly select only the id and username fields - even though
      // // users' passwords are encrypted, it won't help if we just
      // // send everything to anyone who asks!
      // attributes: ['id', 'username']
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const productInfo = await Product.findOne({
      where: { id: req.params.productId },
      include: [{ model: Review }],
    });

    res.send(productInfo);
  } catch (error) {
    next(error);
  }
});
