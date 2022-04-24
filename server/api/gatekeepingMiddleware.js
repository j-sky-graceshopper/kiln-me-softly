const { models: { User }} = require("../db")


const requireToken = async (req, res, next) => {
    try {
        console.log('went into requireToken', req.headers)
        const token = req.headers.authorization;
        const user = await User.findByToken(token);
        req.user = user;
        next()
    } catch (err) {
        next(err);
    }
}

const isAdmin = (req, res, next) => {
   if (!req.user.isAdmin) {
        return res.status(403).send("This function is for admins only!")
    } else {
        next()
    }
}

module.exports = {
    requireToken,
    isAdmin
}
