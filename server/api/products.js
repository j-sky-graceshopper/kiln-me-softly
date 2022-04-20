const router = require('express').Router()
const {
  models: { Product, Review },
} = require("../db");

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
})

router.post('/', async (req, res, next) => {
  try {
      res.status(201).send(await Product.create(req.body))
  } catch (err) {
      next(err);
  }
})

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

router.put("/:productID", async ( req, res,next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(await product.update(req.body))
  } catch (err) {
    next(err)
  }
})

module.exports = router


