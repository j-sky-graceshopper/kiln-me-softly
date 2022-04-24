const router = require('express').Router();
const {
    models: { User },
  } = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.findAll()
        res.json(allUsers);
    } catch (err) {
        next(err);
    }
})

module.exports = router
