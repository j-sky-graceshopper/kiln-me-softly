const router = require("express").Router();

router.use("/categories", require("./categories"));
router.use("/products", require("./products"));
router.use("/cart", require("./cart"));
router.use("/currentOrder", require("./currentOrder"));
router.use("/reviews", require("./reviews"));
router.use("/admin", require("./admin"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
