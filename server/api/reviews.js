const router = require("express").Router();
const {models: { Review },} = require("../db")

//get all the reviews by productId

router.delete("/:id", async (req, res, next) => {
    try { 
        const review = await Review.findOne({
            where: {
                id: req.params.id
            }
        })
        await review.destroy()
        res.send(review)
    } catch(err) {
        next (err)
    }
    
})

module.exports = router