const router = require('express').Router()
module.exports = router

<<<<<<< HEAD
router.use('/users', require('./users'));
router.use('/admin', require('./admin'));
=======
router.use('/products', require('./products'))
>>>>>>> 715595c17fbe2bb5f789dc517ad2de80a2fae4d5

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
