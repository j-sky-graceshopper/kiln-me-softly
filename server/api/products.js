const router = require("express").Router();
// const res = require("express/lib/response");
const {
  models: { Product, Review, Category, User },
} = require("../db");
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')


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
    const { title, description, imageUrl, price, inventory } = req.body.product;
    console.log('what is req.user', req.user)
    const newProduct = await Product.create({ title, description, imageUrl, price, inventory });
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
      include: [{ model: Review, include: [User] }],
    });

    res.send(productInfo);
  } catch (error) {
    next(error);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    const { title, description, imageUrl, price, inventory } = req.body
    res.send(await product.update({ title, description, imageUrl, price, inventory }));
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', async ( req,res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      },
    })
    await product.destroy()
    res.json(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
