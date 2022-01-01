const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//Importing models
const User = require("../Models/User");

router.post("/api/users", async (req, res) => {
    try {
        console.log(req.fields);
        const user = new User({
            username: req.fields.username
        });
        await user.save();
        res.status(200).json(user);
    }
    catch(error) {
        res.status(400).json({error: error.message});
    }
});

router.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error) {
        res.status(400).json({error: error.message});
    }
});

router.post("/api/users/:_id/exercises", async (req, res) => {
    try {

    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
});

module.exports = router;