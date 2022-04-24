const router = require('express').Router();
const {
    models: { User },
  } = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        res.json(allUsers);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req,res, next) => {
    try {
        const { username, password, email, isAdmin } = req.body;
        const newUser = await User.create({ username, password, email, isAdmin });
        res.status(201).send(newUser);
    } catch (err) {
        next(err);
    }
});

module.exports = router
