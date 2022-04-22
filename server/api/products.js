const router = require("express").Router();
const res = require("express/lib/response");
const {
  models: { Product, Review, Category },
} = require("../db");

// SECURITY MIDDLEWARE, 
// const isAdmin = (req, res, next) => {
//   console.log('isAdmin was called')
// 	if (!req.user.isAdmin) {
// 		return res.status(403).send('You shall not pass!')
// 	} else {
// 		next()
// 	}
// };

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
    // Finish this!
    const { title, price, } = req.body.product 
    const newProduct = await Product.create({ title, price, });
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
