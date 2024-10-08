const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const UserModel = require('./models/user');
const path = require("path");
const tradeRoutes = require('./routes/trades');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3001"
}))

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// Use the trade routes under /api/trades
app.use('/api/trades', tradeRoutes); 

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../super-brokers/dist')));

// Handle React routing, return all requests to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../super-brokers/dist', 'index.html'));
});

app.listen(3001, () => {
    console.log("server is running")
})