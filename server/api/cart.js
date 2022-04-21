const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try{ 
        const user = await User.findByToken(req.headers.authorization);
        res.send(await user.getCart())
    } catch (err) {
        next(err)
    }
})