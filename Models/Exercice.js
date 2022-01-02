const mongoose = require("mongoose");
const User = require("./User");

const Exercice = mongoose.model("Exercice", {
    username: String,
    description: String,
    duration: Number,
    date: String,
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User}
});

module.exports = Exercice