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
    const newProduct = await Product.create(req.body.product);
    const category = await Category.findOne({
      where: {
        name: req.body.categories,
      },
    });
    await newProduct.addCategory(category.id);
    res.status(201).send(newProduct);
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

router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.send(await product.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
