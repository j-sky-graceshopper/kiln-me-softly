const { models: { User }} = require("../db");

const requireToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await User.findByToken(token);
        res.user = user;
        return next()
    } catch (err) {
        return next(err);
    }
};

const isAdmin = (req, res, next) => {
    console.log('isAdmin was called');
   if (!res.user.isAdmin) {
        const error = new Error("This function is for admins only!")
        error.status = 401;
        return next(error)
    } else {
        return next()
    }
};

module.exports = {
    requireToken,
    isAdmin
}
