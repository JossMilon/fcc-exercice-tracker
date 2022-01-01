const mongoose = require("mongoose");

const User = mongoose.model("User", {
    username: String
});

module.exports = User;