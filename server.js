const express = require('express')
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config()
const mongoCon = process.env.MONGODB_URI || "mongodb://localhost:27017/exercice-tracker"

// Connecting to DB

mongoose.connect(mongoCon);

// Initialize server and add middlewares

const app = express()
app.use(cors())
app.use(formidable());
app.use(express.static('public'))

// Create home route and serve static files

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Importing other routes

const userRoutes = require("./Routes/user");
app.use(userRoutes);


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
