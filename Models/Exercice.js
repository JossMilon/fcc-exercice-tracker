const mongoose = require("mongoose");
const User = require("./User");

const Exercice = mongoose.model("Exercice", {
    description: String,
    duration: Number,
    parsedDate: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User}
});

module.exports = Exercice