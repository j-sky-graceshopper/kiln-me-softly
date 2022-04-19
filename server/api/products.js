const router = require('express').Router()
const { models: { Product }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // // explicitly select only the id and username fields - even though
      // // users' passwords are encrypted, it won't help if we just
      // // send everything to anyone who asks!
      // attributes: ['id', 'username']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
      res.status(201).send(await Product.create(req.body))
  } catch (err) {
      next(err);
  }
})

module.exports = router
