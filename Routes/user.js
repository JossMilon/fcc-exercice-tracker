const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//Importing models
const User = require("../Models/User");
const Exercice = require("../Models/Exercice");

//Importing middleware
const isExistingUser = require("../Middlewares/isExistingUser");

//Create new user route
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

//Get all users route
router.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error) {
        res.status(400).json({error: error.message});
    }
});

//Create new exercice route
router.post("/api/users/:_id/exercises", isExistingUser, async (req, res) => {
    try {
        const userFound = req.user;
        const date = req.fields.date? new Date(req.fields.date): new Date();
        const exercice = new Exercice({
            description: req.fields.description,
            duration: req.fields.duration,
            date: date.toDateString(),
            parsedDate: Date.parse(date),
            user: userFound._id
        })
        await exercice.save();
        res.status(200).json({
            username: userFound.username,
            description: req.fields.description,
            duration: Number(req.fields.duration),
            date: date.toDateString(),
            _id: userFound._id
        });
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
});

//Get all exercises from a user route
router.get("/api/users/:_id/logs", isExistingUser, async (req, res) => {
    try {
        const dateMin = Date.parse(req.query.from);
        const dateMax = Date.parse(req.query.to);
        const limit = Number(req.query.limit);
        const userFound = req.user;
        let logs = [];
        //Building filter system if limit and from / to
        if (dateMin & dateMax) {
            console.log("dateMin & dateMax");
            logs = await Exercice.find({user: userFound._id, parsedDate: { $gte: dateMin, $lte: dateMax } }).select("description duration date");
        }
        else if (dateMax) {
            console.log("Only dateMax");
            logs = await Exercice.find({user: userFound._id, parsedDate: { $lte: dateMax } }).select("description duration date");
        }
        else if (dateMin) {
            console.log("Only dateMin");
            logs = await Exercice.find({user: userFound._id, parsedDate: { $gte: dateMin } }).select("description duration date");
        }
        else {
            console.log("No dateMin & dateMax");
            logs = await Exercice.find({user: userFound._id }).select("description duration date");
        }
        res.status(200).json({
            username: userFound.username,
            count: logs.length,
            _id: userFound._id,
            log: limit? logs.slice(0, limit): logs
        });
    }
    catch(error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;