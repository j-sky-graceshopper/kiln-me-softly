const router = require("express").Router();
const {
  models: { Product, Review, Category },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
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

module.exports = router;
