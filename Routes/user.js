const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//Importing models
const User = require("../Models/User");
const Exercice = require("../Models/Exercice");

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
        const userId = req.params._id;
        console.log(req.fields.date);
        const userFound = await User.findById(userId);
        if (userFound) {
            const date = req.fields.date? new Date(req.fields.date): new Date();
            const exercice = new Exercice({
                description: req.fields.description,
                duration: req.fields.duration,
                date: date.toDateString(),
                user: userId
            })
            await exercice.save();
            res.status(200).json({
                username: userFound.username,
                description: req.fields.description,
                duration: req.fields.duration,
                date: date.toDateString(),
                _id: userFound._id
            });
        }
        else {
            res.status(200).json({message: "No user corresponding to this ID"});
        }
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
});

module.exports = router;