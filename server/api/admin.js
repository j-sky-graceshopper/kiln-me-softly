const router = require('express').Router();
const Product = require('../db/product');

router.post('/', async (req, res, next) => {
    try {
        res.status(201).send(await Product.create(req.body))
    } catch (err) {
        next(err);
    }
})

module.exports = router
