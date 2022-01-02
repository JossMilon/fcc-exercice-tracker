const User = require("../Models/User");

const isExistingUser = async (req, res, next) => {
    console.log("entering middleware...");
    const userId = req.params._id;
    const userFound = await User.findById(userId);
    if (userFound) {
        req.user = userFound;
        next();
    }
    else {
        res.status(200).json({message: "No user corresponding to this ID"});
    }
}

module.exports = isExistingUser;